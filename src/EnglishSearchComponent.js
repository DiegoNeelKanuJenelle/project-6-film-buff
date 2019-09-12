import React, { Component } from 'react';
import './App.css';
import axios from 'axios'

class EnglishSearchComponent extends Component{

    constructor(){
        super();
        this.state = {
            userInput: '',
            englishMovies: [],
            genresIds: []
        }
    }

    handleChange = (event) => {
        const { name, value } = event.target;
        this.setState({
            [name]: value
        })
    }

    handleAutofill = (event) => {
        event.preventDefault();
        this.setState({
            englishMovies: []
        })
        axios({
            url: `https://api.themoviedb.org/3/search/movie`,
            params: {
                "api_key": '37127aeb4753ff74ef22b9e85d9ace5b',
                language: 'en-US',
                query: this.state.userInput,
                page: 1,
                "include_adult": false
            }   
        }).then((res) => {
            // console.log(res)
            const results = res.data["results"];
            const dataFromResults = [];
            results.map( movie =>{
                return dataFromResults.push([movie.original_title, movie.poster_path,movie.genre_ids,movie.overview,movie.id])
            })
            console.log(dataFromResults);
            this.setState({
                englishMovies: dataFromResults
            })
        })
    }


    imageClick = (id) => {
        this.setState({
            genresIds: movie[2]
        })
    }


    render(){
        return(
            <div>
                <div className="searchAutofill">
                    <form onSubmit={this.handleAutofill}>
                        <input type="text" name="userInput" value={this.state.userInput} onChange={this.handleChange} onKeyUp={this.handleAutofill} />
                        <button>Search movies</button>   
                    </form>
                </div>
                <ul>
                    {this.state.englishMovies.map(movie => {
                        return (
                        <div>

                            <Link to='/Foreign'> <img src={`http://image.tmdb.org/t/p/w500${movie[1]}`} alt={movie[0]} key={movie[4]} onClick={() => { this.imageClick(movie[2]) }} /> </Link>
                            <Route path="/Foreign" component={ForeignSearchComponent} />
                        </div> 
                        )
                    })}
                </ul>
            </div>
        )
    }
}

export default EnglishSearchComponent;