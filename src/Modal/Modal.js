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
        <div className="modalTopBar">
          <button className="btn-cancel" onClick={props.close}>
            X
          </button>
        </div>
        <div className="modal-header">
          <span className="close-modal-btn" onClick={props.close}></span>
        </div>

        <div className="modal-body">{props.children}</div>
        <div className="modal-footer">
          {/* {props.children} */}

          <Link
            to={{
              pathname: "/Foreign",
              state: {
                englishMovie: props.englishMovie
              }
            }}
          >
            <button className="btn-continue">CONTINUE</button>
          </Link>
          <Route path="/Foreign" component={ForeignRelatedComponent} />
        </div>
      </div>
    </div>
  );
};
export default modal;
