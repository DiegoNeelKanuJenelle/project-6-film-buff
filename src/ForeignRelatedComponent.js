//import react , axios and styling file.
//Pass props to your constructor and super and in the state , create an empty foreignArray.
import React, { Component } from "react";
import "./App.css";
import axios from "axios";
import firebase from "./firebase";
class ForeignRelatedComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      foreignArray: []
    };
  }
  componentDidMount() {
    const narrowedGenreString = this.props.location.state.genreIds
      .splice(0, 2)
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
            console.log(`the loop has run ${num} times`);
            this.makeApiCall(num, narrowedGenreString);
          } else {
          }
        }
      );
    });
  };

  savetoDb = () => {
    const dbRef = firebase.database().ref();
    dbRef.push("HELLO!!!!");

    dbRef.on("value", response => {
      console.log(response.val());
    });
  };

  render() {
    return (
      <div>
        <button onClick={this.savetoDb}>Hi</button>
        {this.state.foreignArray.map(movie => {
          return (
            <img
              src={`http://image.tmdb.org/t/p/w500${movie["poster_path"]}`}
            />
          );
        })}
      </div>
    );
  }
}
export default ForeignRelatedComponent;
