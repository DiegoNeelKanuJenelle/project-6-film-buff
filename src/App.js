import React, { Component } from "react";
import "./styles/App.scss";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import Header from "./Header";
import EnglishSearchComponent from "./EnglishSearchComponent";
import ForeignRelatedComponent from "./ForeignRelatedComponent";
import PublicFeed from "./PublicFeed";
class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <nav className="animated slideInDown">
            <div className="wrapper">
              <Link to="/">
                <h3>Film Buff</h3>
              </Link>
              <Link to="/Feed" className="link">
                User picks
              </Link>
            </div>
          </nav>
          <Switch>
            <Route exact path="/" component={Header} />
            <Route exact path="/English" component={EnglishSearchComponent} />
            <Route exact path="/Foreign" component={ForeignRelatedComponent} />
            <Route exact path="/Feed" component={PublicFeed} />
          </Switch>
        </div>
      </Router>
    );
  }
}
export default App;
