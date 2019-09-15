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
      <section className="publicFeed">
        {/* <h2>Check out these matches ! <span>If you liked... then checkout..</span></h2>  */}
        <ul>
          {this.state.savedMovies.map((movie, index) => {
            return (
              <li className="listItem" key={index}>
                <div className="savedEnglishMovie">
                  <div className="topPublic">
                    <h3>If you liked</h3>
                    <p className="title">{movie[0][0]}</p>
                  </div>
                  <div className="bottomPublic">
                    <div className="bottomLeftFeed">
                      <img className="publicImage"src={`http://image.tmdb.org/t/p/w500${movie[0][4]}`} alt ={movie[0][0]}/>
                    </div>
                    <div className="bottomRightFeed">
                      <p className="releaseDate">{movie[0][5]}</p>
                      <p className="popularity">{movie[0][6]}</p>
                      <p className="description">{movie[0][3]}</p>
                    </div>
                  </div>
                </div>
                <div className="savedForeignMovie">
                  <h3>Then check out</h3>
                  <p className="title">{movie[1][0]}</p>
                  <img className="publicImage" src={`http://image.tmdb.org/t/p/w500${movie[1][4]}`} alt={movie[1][0]} />
                  <p className="releaseDate">{movie[1][5]}</p>
                  <p className="Language">{movie[1][2]}</p>
                  <p className="popularity">{movie[1][6]}</p>
                  <p className="description">{movie[1][3]}</p>
                  
                </div>
              </li>
            );
          })}
        </ul>
      </section>
    );
  }
}
export default PublicFeed;
