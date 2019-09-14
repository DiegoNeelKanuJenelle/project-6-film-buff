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
        <h2>Check out these matches ! <span>If you liked... then checkout..</span></h2> 
        <ul>
          {this.state.savedMovies.map((movie, index) => {
            return (
              <li key={index}>
                <div className="savedEnglishMovie">
                  <img src={`http://image.tmdb.org/t/p/w500${movie[0][4]}`} />
                  <p className="title">{movie[0][0]}</p>
                  <p className="description">{movie[0][3]}</p>
                  <p className="Language">{movie[0][2]}</p>
                </div>
                <div className="savedForeignMovie">
                  <img src={`http://image.tmdb.org/t/p/w500${movie[1][4]}`} />
                  <p className="title">{movie[1][0]}</p>
                  <p className="description">{movie[1][3]}</p>
                  <p className="Language">{movie[1][2]}</p>
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
