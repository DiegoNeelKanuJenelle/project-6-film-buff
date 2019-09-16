import React, { Component } from "react";
import ForeignRelatedComponent from "./ForeignRelatedComponent";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import "./App.css";
import Modal from "./Modal/Modal";
import axios from "axios";

class EnglishSearchComponent extends Component {
  constructor() {
    super();
    this.state = {
      userInput: "",
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
    this.setState({
      englishMovies: []
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

      console.log(results);

      const dataFromResults = [];

      results.forEach(movie => {
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
      <div>
        <div className="searchAutofill">
          <form onSubmit={this.handleAutofill}>
            <p>Find me an english movie</p>
            <input
              type="text"
              placeholder="Enter your movie"
              name="userInput"
              value={this.state.userInput}
              onChange={this.handleChange}
              // onKeyUp={this.handleAutofill}
            />
            {/* <button>Search movies</button> */}
          </form>
        </div>
        <ul className="posterGallery">
          {this.state.englishMovies.map((movie, index)=> {
            return (
              <div className={`posterContainer poster${index} `} key={movie[4]}>
                <img
                    style={{ position: "relative", zIndex: 10 }}
                    onClick={() => {
                      this.openModalHandler(movie);
                    }}
                    src={movie[1] !== null ? `http://image.tmdb.org/t/p/w500${movie[1]}` : `https://images.ctfassets.net/kjeq3om28nk5/29EdaLLFGICqU4OwMOUumE/cf9e89ee7dac5795db6730681157d350/2019-Winter_Bootcamp-Asaf-Gerchak-1.jpg?w=800&q=50`}

                    alt={movie[1] !== null ? `Movie poster for ${movie[0]}` : 'TROLOLOLOL'}
                    />
              </div>
            );
          })}
        </ul>

        {this.state.isShowing ? (
          <div onClick={this.closeModalHandler} className="back-drop">
            <Modal
              className="modal-component"
              show={this.state.isShowing}
              close={this.closeModalHandler}
              englishMovie={this.state.selectedEnglishMovie}
            >
              <div className="fullModal">
                <div className="top">
                  <h3 className = "englishMovieTitleModal">{this.state.selectedEnglishMovie[0]}</h3>
                  <h3 className="englishMovieReleaseModal">{this.state.selectedEnglishMovie[6].replace(/-.*/g, "")}</h3>
                </div>
                <div class="modalPosterArea">
                  <div className="modalPosterImage">
                    <img
                      // style={{ height: "400px" }}
                      src={`http://image.tmdb.org/t/p/w500${
                        this.state.selectedEnglishMovie[1]
                      }`}
                    />
                  </div>
                </div>
                <div className="modalMovieDescription">
                  <p>{this.state.selectedEnglishMovie[3]}</p>
                </div>
                <div className="footer">
                </div>

              </div>
            </Modal>
          </div>
        ) : null}
      </div>
    );
  }
}
export default EnglishSearchComponent;
