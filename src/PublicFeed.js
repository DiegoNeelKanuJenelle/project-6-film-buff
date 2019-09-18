import React, { Component } from "react";
import "./App.css";
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
        <ul>
          {this.state.savedMovies.map((movie, index) => {
            return (
              <li className="listItem animated fadeIn" key={index}>
                <div className="savedEnglishMovie animated fadeInLeft">
                  <div className="topPublic">
                    <h3>If you liked</h3>
                    <p className="title">{movie[0][0]}</p>
                  </div>
                  <div className="bottomPublic">
                    <div className="bottomLeftFeed">
                      <a
                        target="_blank"
                        href={`https://www.themoviedb.org/movie/${movie[0][1]}`}
                      >
                        <div className="linkOverlay">
                          <p className="animated pulse infinite">
                            Movie details{" "}
                            <span className="arrow">&#10142;</span> 
                          </p>
                        </div>

                        <img
                          className="publicImage"
                          src={`http://image.tmdb.org/t/p/w500${movie[0][4]}`}
                          alt={movie[0][0]}
                        />
                      </a>
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
                <div className="savedForeignMovie animated fadeInRight">
                  <div className="topPublic">
                    <h3>Then check out</h3>
                    <p className="title">{movie[1][0]}</p>
                  </div>
                  <div className="bottomPublic">
                    <div className="bottomLeftFeed">
                      <a
                        target="_blank"
                        href={`https://www.themoviedb.org/movie/${movie[1][1]}`}
                      >
                        <div className="linkOverlay">
                          <p className="animated pulse infinite">
                            Movie details
                            <span className="arrow">&#10142;</span> 
                          </p>
                        </div>
                        <img
                          className="publicImage"
                          src={`http://image.tmdb.org/t/p/w500${movie[1][4]}`}
                          alt={movie[0][0]}
                        />
                      </a>
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
