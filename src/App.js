import React, { Component } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Header from './Header';
import EnglishSearchComponent from './EnglishSearchComponent';

class App extends Component  {

  render(){
    return (
      <Router>
        <div className="App">
          <Header />
          {/* <Route exact path="/search" component={EnglishSearchComponent} /> */}
          {/* <Route path="/movie/:movieId" component={ForeignRelatedComponent} /> */}
        </div>
      </Router>
    );
  }
}

export default App;
