import React from "react";
import { NavLink } from "react-router-dom";

const Header = props => {
  return (
    <div>
      <NavLink to={`/`}>
        <img
          className="logo"
          src={require("../Assets/quiz-commander-logo.png")}
          alt="quiz commander logo"
        />
      </NavLink>
      <div className="navbar">
        <NavLink
          className="navbar-button"
          activeClassName="navbar-button-active"
          to={`/questions`}
        >
          Questions
        </NavLink>
        <NavLink
          className="navbar-button"
          activeClassName="navbar-button-active"
          to={`/rounds`}
        >
          Rounds
        </NavLink>
        <NavLink
          className="navbar-button"
          activeClassName="navbar-button-active"
          to={`/quizzes`}
        >
          Quizzes
        </NavLink>
      </div>
      <button
        className="logout-button"
        onClick={() => {
          props.handleLogOut();
        }}
      >
        Log Out
      </button>
    </div>
  );
};

export default Header;
