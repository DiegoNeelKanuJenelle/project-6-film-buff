import React from "react";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import { BrowserView, TabletView, MobileOnlyView } from "react-device-detect";
import BackgroundGallery from "./BackgroundGallery";
import "./App.css";

const Header = () => {
  return (
    <div className="headerContainer animated zoomIn">
      <header>
        <div className="h1Container">
          <h1 className="animated jackInTheBox delay-1s">Film Buff</h1>
        </div>
        <h2 className="animated fadeInUp delay-2s">
          Foreign movie recommendations
        </h2>
        <div class="animated fadeInUp delay-2s">
          <Link to="/English" className="link">
            Find a movie
          </Link>
        </div>

        <p className="credits">
          Created by <a href="http://juandiegocodes.com">Diego</a>,
          <a href="http://neelpatel.io"> Neel</a>,
          <a href="http://kanusobti.com"> Kanu</a> and
          <a href="http://jenelle.codes"> Jenelle</a>
        </p>
      </header>

      <BrowserView>
        <div className="backgroundGallery container clearfix">
          <div className="overlay"></div>
          <BackgroundGallery imgStart="1" device="desktop" />
          <BackgroundGallery imgStart="5" device="desktop" />
          <BackgroundGallery imgStart="9" device="desktop" />
          <BackgroundGallery imgStart="13" device="desktop" />
          <BackgroundGallery imgStart="17" device="desktop" />
          <BackgroundGallery imgStart="21" device="desktop" />
          <BackgroundGallery imgStart="25" device="desktop" />
        </div>
      </BrowserView>
      <TabletView>
        <div className="backgroundGallery container clearfix">
          <div className="overlay"></div>
          <BackgroundGallery imgStart="1" device="tablet" />
          <BackgroundGallery imgStart="5" device="tablet" />
          <BackgroundGallery imgStart="9" device="tablet" />
          <BackgroundGallery imgStart="13" device="tablet" />
          <BackgroundGallery imgStart="17" device="tablet" />
        </div>
      </TabletView>
      <MobileOnlyView>
        <div className="backgroundGallery container clearfix">
          <div className="overlay"></div>
          <BackgroundGallery imgStart="1" device="mobile" />
          <BackgroundGallery imgStart="5" device="mobile" />
          <BackgroundGallery imgStart="9" device="mobile" />
        </div>
      </MobileOnlyView>
    </div>
  );
};

export default Header;
