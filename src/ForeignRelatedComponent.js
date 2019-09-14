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
          if (this.state.foreignArray.length < 11) {
            num++;
            console.log(`the functio has been called ${num} times`);
            this.makeApiCall(num, narrowedGenreString);
          } else {
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
        this.props.location.state.englishMovie[1]
      ],
      [
        this.state.selectedForeignMovie.title,
        this.state.selectedForeignMovie.id,
        this.state.selectedForeignMovie.original_language,
        this.state.selectedForeignMovie.overview,
        this.state.selectedForeignMovie.poster_path
      ]
    ]);
  };

  render() {
    return (
      <div>
        {this.state.foreignArray.map(movie => {
          return (
            <img
              style={{ position: "relative", zIndex: 10 }}
              onClick={() => {
                this.openModalHandler(movie);
              }}
              src={`http://image.tmdb.org/t/p/w500${movie["poster_path"]}`}
            />
          );
        })}
        {this.state.isShowing ? (
          <div onClick={this.closeModalHandler} className="back-drop">
            <Modal
              className="modal-component"
              show={this.state.isShowing}
              close={this.closeModalHandler}
              modalarray={this.state.selectedForeignMovie}
              saveToDb={this.saveToDb}
            >
              <p>{this.state.selectedForeignMovie.overview}</p>
              <p>Released:{this.state.selectedForeignMovie.release_date}</p>
              <p>Popularity{this.state.selectedForeignMovie.popularity}</p>
              <img
                style={{ height: "400px" }}
                src={`http://image.tmdb.org/t/p/w500${this.state.selectedForeignMovie.poster_path}`}
              />
            </Modal>
          </div>
        ) : null}
      </div>
    );
  }
}
export default ForeignRelatedComponent;
