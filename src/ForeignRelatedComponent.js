import React, { Component } from 'react';
import './App.css';
import axios from 'axios';


class ForeignRelatedComponent extends Component{
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const genreIndexString = this.props.location.state.genreIds;
    console.log('Genre Index String', genreIndexString);

    const genreIndexStringAfterSplice = this.props.location.state.genreIds.splice(0, genreIndexString.length - 1).join()

    console.log('String (after splice)', genreIndexStringAfterSplice);
    
    const foreignMovies = [];
    
    for(let num = 1; num < 10 ; num++) {

      // LOOP HERE? 

      console.log(`for loop has run ${num} times.`);
      console.log('length of foreign movies array:', foreignMovies.length)
      
      axios({
        url: `https://api.themoviedb.org/3/discover/movie`,
        params: {
          api_key: "30b374e19d4f3c86f96dd1c12adb7cb0",
          with_genres: 28,
          page: num
        }
      }).then(response => {
        const movies = response.data["results"];
        console.log('movies from the new loooooop', movies.length, movies)
  
        const filteredMovies = movies.filter((movies)=>{
          return movies.original_language !== 'en'
        })
  
        filteredMovies.map((movie)=>{
          return foreignMovies.push(movie)
        })

      })
    } // end of for loop
    console.log("THIS IS THE ONEEEE",foreignMovies)
  }
  
  render () {
    return (
        <div>
            
        </div>
    )
}
}



export default ForeignRelatedComponent