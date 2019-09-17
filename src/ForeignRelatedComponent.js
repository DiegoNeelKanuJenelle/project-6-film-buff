//import react , axios and styling file.
//Pass props to your constructor and super and in the state , create an empty foreignArray.
import React, { Component } from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import axios from "axios";
import firebase from "./firebase";
import Modal from "./Modal/ModalForeign";

class ForeignRelatedComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      foreignArray: [],
      isShowing: false,
      selectedForeignMovie: [],
      arrayFromDb: []
    };
  }
  componentDidMount() {
    const narrowedGenreString = this.props.location.state.englishMovie[2]
      // .splice(0, 2)
      .join(); // narrows down genre ID string to only include the first 2 genre IDs

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
      console.log(response);
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
          if (this.state.foreignArray.length < 18) {
            num++;
            console.log(`the functio has been called ${num} times`);
            this.makeApiCall(num, narrowedGenreString);
          } else {
          }
        }
      );
      const shufflearray = [...this.state.foreignArray];
      this.shuffle(shufflearray);
      this.setState({
        foreignArray: shufflearray
      });
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

  render() {
    return (
      <div className="foreignContainer">
        <div className="foreignTitle">
          <p>Foreign movies similar to</p>
          <h3>{this.props.location.state.englishMovie[0]}</h3>
        </div>
        <ul className="posterGallery">
          {this.state.foreignArray.map((movie, index) => {
            return (
              <li className={`posterContainer poster${index} `} key={movie[4]}>
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
          <div onClick={this.closeModalHandler} className="back-drop">
            <Modal
              className="modal-component"
              show={this.state.isShowing}
              close={this.closeModalHandler}
              modalarray={this.state.selectedForeignMovie}
              saveToDb={this.saveToDb}
            >
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
                      // style={{ height: "400px" }}
                      src={`http://image.tmdb.org/t/p/w500${this.state.selectedForeignMovie.poster_path}`}
                    />
                  </div>
                </div>
                <div className="modalMovieDescription">
                  <p>{this.state.selectedForeignMovie.overview}</p>
                </div>
              </div>
            </Modal>
          </div>
        ) : null}
      </div>
    );
  }
}
export default ForeignRelatedComponent;
