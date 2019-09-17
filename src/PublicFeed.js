import React, { Component } from "react";
import "./App.css";
// import { BrowserRouter as Router, Route, Link } from "react-router-dom";
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
      <section className="publicFeed wrapper">
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
                      <img
                        className="publicImage"
                        src={`http://image.tmdb.org/t/p/w500${movie[0][4]}`}
                        alt={movie[0][0]}
                      />
                    </div>
                    <div className="bottomRightFeed">
                      <p className="releaseDate">
                        Released
                        <span className="releaseDateSpan">{movie[0][5]}</span>
                      </p>
                      <p className="language">
                        Language
                        <span className="languageSpan ">{movie[0][2]}</span>
                      </p>
                      <p className="popularityRating">
                        Popularity rating{" "}
                        <span className="popularitySpan">{movie[0][6]}</span>
                      </p>
                      <p className="description">{movie[0][3]}</p>
                    </div>
                  </div>
                </div>
                <div className="savedForeignMovie">
                  <div className="topPublic">
                    <h3>Then check out</h3>
                    <p className="title">{movie[1][0]}</p>
                  </div>
                  <div className="bottomPublic">
                    <div className="bottomLeftFeed">
                      <img
                        className="publicImage"
                        src={`http://image.tmdb.org/t/p/w500${movie[1][4]}`}
                        alt={movie[1][0]}
                      />
                    </div>
                    <div className="bottomRightFeed">
                      <p className="releaseDate">
                        Released
                        <span className="releaseDateSpan">{movie[1][5]}</span>
                      </p>
                      <p className="language">
                        Language
                        <span className="languageSpan ">{movie[1][2]}</span>
                      </p>
                      <p className="popularityRating">
                        Popularity rating
                        <span className="popularitySpan">{movie[1][6]}</span>
                      </p>
                      <p className="description">{movie[1][3]}</p>
                    </div>
                  </div>
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
