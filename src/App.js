import React, { Component } from "react";
import "./styles/App.scss";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import { spring, AnimatedRoute, AnimatedSwitch } from "react-router-transition";
import Header from "./Header";
import EnglishSearchComponent from "./EnglishSearchComponent";
import ForeignRelatedComponent from "./ForeignRelatedComponent";
import PublicFeed from "./PublicFeed";

class App extends Component {
  render() {
    // we need to map the `scale` prop we define below
    // to the transform style property
    function mapStyles(styles) {
      return {
        opacity: styles.opacity,
        transform: `scale(${styles.scale})`
      };
    }

    // wrap the `spring` helper to use a bouncy config
    function bounce(val) {
      return spring(val, {
        stiffness: 150,
        damping: 22
      });
    }
    // child matches will...
    const bounceTransition = {
      // start in a transparent, upscaled state
      atEnter: {
        opacity: 0,
        scale: 1.2
      },
      // leave in a transparent, downscaled state
      atLeave: {
        opacity: bounce(0),
        scale: bounce(0.8)
      },
      // and rest at an opaque, normally-scaled state
      atActive: {
        opacity: bounce(1),
        scale: bounce(1)
      }
    };

    return (
      <Router>
        <div className="App">
          <nav className="animated fadeInDown">
            <div className="wrapper">
              <Link to="/">
                <h3>Film Buff</h3>
              </Link>
              <Link to="/Feed" className="link">
                User picks
              </Link>
            </div>
          </nav>
          <AnimatedSwitch
            atEnter={bounceTransition.atEnter}
            atLeave={bounceTransition.atLeave}
            atActive={bounceTransition.atActive}
            mapStyles={mapStyles}
            className="route-wrapper"
          >
            <Route exact path="/" component={Header} />
            <Route exact path="/English" component={EnglishSearchComponent} />
            <Route exact path="/Foreign" component={ForeignRelatedComponent} />
            <Route exact path="/Feed" component={PublicFeed} />
          </AnimatedSwitch>
        </div>
      </Router>
    );
  }
}

export default App;
