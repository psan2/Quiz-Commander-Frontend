import React, { Component } from "react";
import { NavLink } from "react-router-dom";

export default class HostLanding extends Component {
  render() {
    return (
      <div>
        <div>
          <NavLink className="host-landing-button" to="/questions">
            Questions
          </NavLink>
        </div>
        <div>
          <NavLink className="host-landing-button" to="/rounds">
            Rounds
          </NavLink>
        </div>
        <div>
          <NavLink className="host-landing-button" to="/quizzes">
            Quizzes
          </NavLink>
        </div>
      </div>
    );
  }
}
