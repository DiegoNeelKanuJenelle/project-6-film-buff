import React, { Component } from "react";
import "./App.css";
import axios from "axios";
import firebase from "./firebase";
import Modal from "./Modal/ModalForeign";
import ReadMoreReact from "read-more-react";
import isoLangs from "./languageCodes";

class ForeignRelatedComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      foreignArray: [],
      isShowing: false,
      selectedForeignMovie: [],
      arrayFromDb: [],
      renderedForeignMovies: [],
      foreignMovieUniqueLangCodes: [],
      arraylanguagesName: []
    };
  }
  componentDidMount() {
    const narrowedGenreString = this.props.location.state.englishMovie[2].join();

    this.makeApiCall(1, narrowedGenreString);
  }
  makeApiCall = (num, narrowedGenreString) => {
    axios({
      url: `https://api.themoviedb.org/3/discover/movie`,
      params: {
        api_key: "30b374e19d4f3c86f96dd1c12adb7cb0",
        with_genres: narrowedGenreString,
        page: num
      }
    }).then(response => {
      const movies = response.data["results"];

      const filteredMovies = movies.filter(movie => {
        return movie.original_language !== "en";
      });

      const newarray = [...this.state.foreignArray];
      filteredMovies.forEach(movie => {
        newarray.push(movie);
      });
      this.setState(
        {
          foreignArray: newarray
        },
        () => {
          if (num < 20 && this.state.foreignArray.length < 20) {
            num++;
            this.makeApiCall(num, narrowedGenreString);
          } else {
            // creating a duplicate of the array which contains all the foreign movies
            const shuffleArray = [...this.state.foreignArray];

            // foreignMovieLangCodes is an array which contains all the language codes for each foreign movie i.e; en or fr - BUT THERE ARE DUPLICATES HERE
            const foreignMovieLangCodes = [];
            shuffleArray.forEach(element => {
              foreignMovieLangCodes.push(element.original_language);
            });

            // uniqueLangCodes array contains unique language codes from the search results . This array was extracted from foreignMovieLangCodes
            const uniqueLangCodes = [...new Set(foreignMovieLangCodes)];
            // The Set object lets you store unique values of any datatype..

            this.setState({
              foreignMovieUniqueLangCodes: uniqueLangCodes
            });
            ////the above foreignMovieUniqueLangCodes has en, fr, hi for languages only

            this.shuffle(shuffleArray);

            this.setState({
              renderedForeignMovies: shuffleArray
            });
            ////this renderedForeignMovies has the shuffled movies we got from the makeapi call and shuffled and saved
          }
        }
      );
    });
  };

  openModalHandler = movie => {
    this.setState({
      selectedForeignMovie: movie,
      isShowing: true
    });
  };

  closeModalHandler = () => {
    this.setState({
      isShowing: false
    });
  };

  saveToDb = () => {
    const dbRef = firebase.database().ref();

    dbRef.push([
      [
        this.props.location.state.englishMovie[0],
        this.props.location.state.englishMovie[4],
        this.props.location.state.englishMovie[5],
        this.props.location.state.englishMovie[3],
        this.props.location.state.englishMovie[1],
        this.props.location.state.englishMovie[6],
        this.props.location.state.englishMovie[7]
      ],
      [
        this.state.selectedForeignMovie.title,
        this.state.selectedForeignMovie.id,
        this.state.selectedForeignMovie.original_language,
        this.state.selectedForeignMovie.overview,
        this.state.selectedForeignMovie.poster_path,
        this.state.selectedForeignMovie.release_date,
        this.state.selectedForeignMovie.popularity
      ]
    ]);
  };
  shuffle = array => {
    let counter = array.length;
    let temp;
    let index;

    // While there are elements in the array
    while (counter > 0) {
      // Pick a random index
      index = Math.floor(Math.random() * counter);
      // Decrease ctr by 1
      counter--;
      // And swap the last element with it
      temp = array[counter];
      array[counter] = array[index];
      array[index] = temp;
    }
    return array;
  };

  filterLanguage = langCode => {
    const foreignArrayClone = [...this.state.foreignArray];
    // renderedForeignMovies is the array that always gets rendered to the page
    // when we are trying to filter by language, it doesn't matter whether or not it's shuffled, so we just use the foreign array (which is unshuffled)
    this.setState(
      {
        renderedForeignMovies: foreignArrayClone
      },
      () => {
        const renderedForeignMoviesClone = [
          ...this.state.renderedForeignMovies
        ];

        const moviesSelectedLanguage = renderedForeignMoviesClone.filter(
          movie => {
            return movie.original_language === langCode;
          }
        );
        this.setState({
          renderedForeignMovies: moviesSelectedLanguage
        });
      }
    );
  };

  allLanguages = () => {
    const foreignArrayClone = [...this.state.foreignArray];
    this.setState({
      renderedForeignMovies: foreignArrayClone
    });
  };

  longname = placeholder => {
    return isoLangs[placeholder].name;
  };

  render() {
    return (
      <section className="foreignComponent">
        <div className="foreignTitle animated fadeInDown">
          <p>Foreign movies similar to</p>
          <h3>{this.props.location.state.englishMovie[0]}</h3>
        </div>

        <div className="allLanguageLinks animated fadeInDown delay-1s">
          {this.state.foreignMovieUniqueLangCodes.map(langCode => {
            return (
              <button
                className="languageLinks"
                value={langCode}
                onClick={() => {
                  this.filterLanguage(langCode);
                }}
              >
                {this.longname(langCode)}
              </button>
            );
          })}
          <button className="languageLinks" onClick={this.allLanguages}>
            ALL
          </button>
        </div>

        <ul className="posterGallery">
          {this.state.renderedForeignMovies.map((movie, index) => {
            return (
              <li
                key={movie[4]}
                className={`posterContainer poster${index} foreign animated fadeInUp`}
              >
                <img
                  style={{ position: "relative", zIndex: 10 }}
                  onClick={() => {
                    this.openModalHandler(movie);
                  }}
                  src={`http://image.tmdb.org/t/p/w500${movie["poster_path"]}`}
                />
              </li>
            );
          })}
        </ul>
        {this.state.isShowing ? (
          <div className="back-drop">
            <Modal
              className="modal-component"
              show={this.state.isShowing}
              close={this.closeModalHandler}
              modalarray={this.state.selectedForeignMovie}
              saveToDb={this.saveToDb}
            >
              <div className="closeModal" onClick={this.closeModalHandler}>
                ⤫
              </div>
              <div className="fullModal">
                <div className="top">
                  <h3 className="englishMovieTitleModal">
                    {this.state.selectedForeignMovie.title}
                  </h3>

                  <h3 className="englishMovieReleaseModal">
                    {this.state.selectedForeignMovie.release_date.replace(
                      /-.*/g,
                      ""
                    )}
                  </h3>
                </div>
                <div className="modalPosterArea">
                  <div className="modalPosterImage">
                    <img
                      src={`http://image.tmdb.org/t/p/w500${this.state.selectedForeignMovie.poster_path}`}
                    />
                  </div>
                </div>
                <div className="modalMovieDescription">
                  <ReadMoreReact
                    text={this.state.selectedForeignMovie.overview}
                    min={60}
                  />
                </div>
              </div>
            </Modal>
          </div>
        ) : null}
      </section>
    );
  }
}
export default ForeignRelatedComponent;
