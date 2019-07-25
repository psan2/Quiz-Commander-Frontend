import React, { Component } from "react";
import { NavLink } from "react-router-dom";

export default class Sidebar extends Component {
  render() {
    return (
      <div>
        <NavLink className="sidebar" to={`/`}>
          <img
            className="logo"
            src={require("../Assets/quiz-commander-logo.png")}
            alt="quiz commander logo"
          />
        </NavLink>
      </div>
    );
  }
}
