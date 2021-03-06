import React, { Component } from "react";
import { NavLink } from "react-router-dom";

export default class HostLanding extends Component {
  render() {
    return (
      <div>
        {/* <div className="host-landing-row">
          <NavLink className="host-landing-button double inactive">
            Start a Quiz
          </NavLink>
        </div> */}
        <div className="host-landing-row">
          <NavLink className="host-landing-button" to="/quizzes/edit">
            Create a Quiz
          </NavLink>
          <NavLink className="host-landing-button" to="/quizzes">
            View Quizzes
          </NavLink>
        </div>
        <div className="host-landing-row">
          <NavLink className="host-landing-button" to="/rounds/edit">
            Create a Round
          </NavLink>
          <NavLink className="host-landing-button" to="/rounds">
            View Rounds
          </NavLink>
        </div>
        <div className="host-landing-row">
          <NavLink className="host-landing-button" to="/questions">
            Create a Question
          </NavLink>
          <NavLink className="host-landing-button" to="/questions">
            View Questions
          </NavLink>
        </div>
      </div>
    );
  }
}
