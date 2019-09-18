import React, { Component } from "react";
import "./App.css";
import Modal from "./Modal/Modal";
import axios from "axios";
import ReadMoreReact from "read-more-react";
import AutosizeInput from "react-input-autosize";

class EnglishSearchComponent extends Component {
  constructor() {
    super();
    this.state = {
      userInput: "",
      emptyInput: false,
      noResults: false,
      englishMovies: [],
      isShowing: false,
      selectedEnglishMovie: []
    };
  }

  openModalHandler = movie => {
    this.setState({
      selectedEnglishMovie: movie,
      isShowing: true
    });
  };

  closeModalHandler = () => {
    this.setState({
      isShowing: false
    });
  };
  handleChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };
  handleAutofill = event => {
    event.preventDefault();

    if (!this.state.userInput) {
      return this.setState({
        emptyInput: true
      });
    }

    this.setState({
      noResults: false,
      emptyInput: false
    });

    axios({
      url: `https://api.themoviedb.org/3/search/movie`,
      params: {
        api_key: "37127aeb4753ff74ef22b9e85d9ace5b",
        language: "en-US",
        query: this.state.userInput,
        page: 1,
        include_adult: false
      }
    }).then(res => {
      const results = res.data["results"];

      const filteredMovies = results.filter(movie => {
        return movie.original_language === "en";
      });

      if (results.length === 0 || filteredMovies.length === 0) {
        return this.setState({
          noResults: true
        });
      }

      const dataFromResults = [];

      filteredMovies.forEach(movie => {
        dataFromResults.push([
          movie.original_title,
          movie.poster_path,
          movie.genre_ids,
          movie.overview,
          movie.id,
          movie.original_language,
          movie.release_date,
          movie.popularity
        ]);
      });

      this.setState({
        englishMovies: dataFromResults
      });
    });
  };
  render() {
    return (
      <section className="englishComponent">
        <div className="wrapper">
          <div className="searchAutofill animated fadeInDown">
            <form onSubmit={this.handleAutofill}>
              <p>Find me an english movie</p>
              <label className="sr-only">Enter your movie</label>

              <AutosizeInput
                type="text"
                placeholder="Enter your movie"
                name="userInput"
                value={this.state.userInput}
                onChange={this.handleChange}
              />
              <button type="submit" className="visuallyHidden">
                Search movies
              </button>
            </form>
            {this.state.noResults && (
              <p className="noResults animated bounceIn">
                No movies found. Please try another search.
              </p>
            )}

            {this.state.emptyInput && (
              <p className="noResults animated bounceIn">
                Please enter a movie name.
              </p>
            )}
          </div>
        </div>
        <ul className="posterGallery">
          {this.state.englishMovies.map((movie, index) => {
            return (
              <li
                className={`posterContainer poster${index} animated fadeInUp`}
                key={movie[4]}
              >
                {movie[1] !== null ? (
                  <img
                    style={{ position: "relative", zIndex: 10 }}
                    onClick={() => {
                      this.openModalHandler(movie);
                    }}
                    src={`http://image.tmdb.org/t/p/w500${movie[1]}`}
                    alt={`Movie poster for ${movie[0]}`}
                  />
                ) : (
                  <div
                    className="noPoster"
                    style={{ position: "relative", zIndex: 10 }}
                    onClick={() => {
                      this.openModalHandler(movie);
                    }}
                  >
                    <p>{movie[0]}</p>
                  </div>
                )}
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
              englishMovie={this.state.selectedEnglishMovie}
            >
              <div className="closeModal" onClick={this.closeModalHandler}>
                ⤫
              </div>
              <div className="fullModal">
                <div className="top">
                  <h3 className="englishMovieTitleModal">
                    {this.state.selectedEnglishMovie[0]}
                  </h3>
                  <h3 className="englishMovieReleaseModal">
                    {this.state.selectedEnglishMovie[6].replace(/-.*/g, "")}
                  </h3>
                </div>
                <div className="modalPosterArea">
                  <div className="modalPosterImage">
                    {this.state.selectedEnglishMovie[1] !== null ? (
                      <img
                        src={`http://image.tmdb.org/t/p/w500${
                          this.state.selectedEnglishMovie[1]
                        }`}
                        alt={`Movie poster for ${
                          this.state.selectedEnglishMovie[0]
                        }`}
                      />
                    ) : (
                      <div className="noPosterInModal">
                        <p>{this.state.selectedEnglishMovie[0]}</p>
                      </div>
                    )}
                  </div>
                </div>
                <div className="modalMovieDescription">
                  <ReadMoreReact text={this.state.selectedEnglishMovie[3]} />
                </div>
              </div>
            </Modal>
          </div>
        ) : null}
      </section>
    );
  }
}
export default EnglishSearchComponent;
