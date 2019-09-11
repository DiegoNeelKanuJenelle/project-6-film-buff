import React from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import EnglishSearchComponent from './EnglishSearchComponent' 
import './App.css';

const Header = () => {
    return (
    <header className="Header">
        <h1>Film Buff</h1>
        <Link to='/English'> Catalogue</Link>
        <Route path="/English" component={EnglishSearchComponent} />
    </header>
    )
}

export default Header;