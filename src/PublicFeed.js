import React, { Component } from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import firebase from "./firebase";

class PublicFeed extends Component {
  constructor() {
    super();

    this.state = {
      savedMovies: []
    };
  }

  componentDidMount() {
    const dbRef = firebase.database().ref();

    dbRef.on("value", data => {
      const response = data.val();

      const resultsArray = Object.values(response).reverse();

      this.setState({
        savedMovies: resultsArray
      });
    });
  }

  render() {
    return (
      <div>
        <h1>Public Feed</h1>
        <ul>
          {this.state.savedMovies.map((movie, index) => {
            return (
              <li key={index}>
                <div className="savedEnglishMovie">
                  <h3 className="title">{movie[0][0]}</h3>
                  <img src={`http://image.tmdb.org/t/p/w500${movie[0][4]}`} />
                </div>
                <div className="savedForeignMovie">
                  <h3 className="title">{movie[1][0]}</h3>
                  <img src={`http://image.tmdb.org/t/p/w500${movie[1][4]}`} />
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    );
  }
}
export default PublicFeed;
