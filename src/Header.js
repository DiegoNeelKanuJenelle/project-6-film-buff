import React from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import BackgroundGallery from "./BackgroundGallery";
import "./App.css";

const Header = () => {
  return (
    <div className="headerContainer">
      <header>
        <div className="h1Container">
          <h1>Film Buff</h1>
        </div>
        <p>Foreign movie recommendations</p>
        <Link to="/English" className="link">
          Find a movie
        </Link>
      </header>
      <div className="backgroundGallery container clearfix">
        <div className="backgroundGallery overlay"></div>
        <BackgroundGallery imgStart="1" column="1" />
        <BackgroundGallery imgStart="5" column="2" />
        <BackgroundGallery imgStart="10" column="3" />
        <BackgroundGallery imgStart="15" column="4" />
        <BackgroundGallery imgStart="20" column="5" />
        <BackgroundGallery imgStart="25" column="6" />
        <BackgroundGallery imgStart="30" column="7" />
      </div>
    </div>
  );
};

export default Header;
