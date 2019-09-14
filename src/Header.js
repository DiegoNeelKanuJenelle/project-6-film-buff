import React from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import EnglishSearchComponent from "./EnglishSearchComponent";
import ForeignRelatedComponent from "./ForeignRelatedComponent";
import PublicFeed from "./PublicFeed";

import "./App.css";

const Header = () => {
  return (
    <header className="Header">
      <h1>Film Buff</h1>
      <Link to="/English"> Catalogue</Link>
      <Route path="/English" component={EnglishSearchComponent} />
      <Link to="/Foreign">Foreigns</Link>
      <Route path="/Foreign" component={ForeignRelatedComponent} />

      <Link to="/Feed">Feed</Link>
      <Route path="/Feed" component={PublicFeed} />
    </header>
  );
};

export default Header;
