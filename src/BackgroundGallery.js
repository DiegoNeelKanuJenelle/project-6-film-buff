import React from "react";

const BackgroundGallery = props => {
  const imgStart = parseInt(props.imgStart);
  return (
    <div className={`backgroundGallery column ${props.column}`}>
      <div className="backgroundGallery poster">
        <img src={`assets/moviePosters/poster${imgStart}.jpg`} alt="" />
      </div>
      <div className="backgroundGallery poster">
        <img src={`assets/moviePosters/poster${imgStart + 1}.jpg`} alt="" />
      </div>
      <div className="backgroundGallery poster">
        <img src={`assets/moviePosters/poster${imgStart + 2}.jpg`} alt="" />
      </div>
      <div className="backgroundGallery poster">
        <img src={`assets/moviePosters/poster${imgStart + 3}.jpg`} alt="" />
      </div>
      <div className="backgroundGallery poster">
        <img src={`assets/moviePosters/poster${imgStart}.jpg`} alt="" />
      </div>
      <div className="backgroundGallery poster">
        <img src={`assets/moviePosters/poster${imgStart + 1}.jpg`} alt="" />
      </div>
      <div className="backgroundGallery poster">
        <img src={`assets/moviePosters/poster${imgStart + 2}.jpg`} alt="" />
      </div>
      <div className="backgroundGallery poster">
        <img src={`assets/moviePosters/poster${imgStart + 3}.jpg`} alt="" />
      </div>
    </div>
  );
};

export default BackgroundGallery;
