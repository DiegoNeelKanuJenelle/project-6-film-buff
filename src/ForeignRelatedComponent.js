import React, { Component } from 'react';
import './App.css';
import axios from 'axios';


class ForeignSearchComponent extends Component{
  constructor() {
    super();
    axios({
      url: `https://api.themoviedb.org/3/discover/movie`,
      params: {
        api_key: "30b374e19d4f3c86f96dd1c12adb7cb0",
        with_genres: this.st
      }
    }).then(response => {
      const movie = response.data;
      this.setState({
        movie
      });
    });
  }
  
  render () {
    return(
        <div>
            
        </div>
    )
}
}





export default ForignRelatedComponent