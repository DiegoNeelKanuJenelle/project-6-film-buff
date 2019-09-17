import React from "react";
// import "./Modal.css";
import ForeignRelatedComponent from "../ForeignRelatedComponent";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

const modal = props => {
  return (
    <div>
      <div
        className="modal-wrapper"
        style={{
          transform: props.show ? "translateY(0vh)" : "translateY(-100vh)",
          opacity: props.show ? "1" : "0"
        }}
      >
        
        <div className="modal-body">{props.children}</div>
        <div className="modal-footer">

          <div class="modalPopularityRating">
            <h3>{props.modalarray.popularity.toFixed(0)}%</h3>
            <h4>Popularity rating</h4>
          </div>

          <button className="btn-continue saveForeignButton" onClick={props.saveToDb}>
            Save Foreign Movie
          </button>
        </div>
      </div>
    </div>
  );
};
export default modal;
