import React, { Component } from "react";
import "./App.css";
import Modal from "./Modal/Modal";
import axios from "axios";
import ReadMoreReact from "read-more-react";

class EnglishSearchComponent extends Component {
  constructor() {
    super();
    this.state = {
      userInput: "",
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
    this.setState({
      noResults: false
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

      if (results.length === 0) {
        return this.setState({
          noResults: true
        });
      }

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
      <section className="englishComponent">
        <div className="wrapper">
          <div className="searchAutofill animated fadeInDown">
            <form onSubmit={this.handleAutofill}>
              <p>Find me an english movie</p>
              <label className="sr-only">Enter your movie</label>
              <input
                type="text"
                placeholder="Enter your movie"
                name="userInput"
                value={this.state.userInput}
                onChange={this.handleChange}
                // onKeyUp={this.handleAutofill}
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
          </div>
        </div>
        <ul className="posterGallery">
          {this.state.englishMovies.map((movie, index) => {
            return (
              <li
                className={`posterContainer poster${index} animated fadeInUp`}
                key={movie[4]}
              >
                <img
                  style={{ position: "relative", zIndex: 10 }}
                  onClick={() => {
                    this.openModalHandler(movie);
                  }}
                  src={
                    movie[1] !== null
                      ? `http://image.tmdb.org/t/p/w500${movie[1]}`
                      : `https://images.ctfassets.net/kjeq3om28nk5/29EdaLLFGICqU4OwMOUumE/cf9e89ee7dac5795db6730681157d350/2019-Winter_Bootcamp-Asaf-Gerchak-1.jpg?w=800&q=50`
                  }
                  alt={
                    movie[1] !== null
                      ? `Movie poster for ${movie[0]}`
                      : "TROLOLOLOL"
                  }
                />
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
                    <img
                      src={`http://image.tmdb.org/t/p/w500${
                        this.state.selectedEnglishMovie[1]
                      }`}
                      alt=""
                    />
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
