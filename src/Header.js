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
      <p>Foreign movie recommendations</p>
      <Link to="/English">Find a movie</Link>
    </header>
  );
};

export default Header;
