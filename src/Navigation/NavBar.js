import React from "react";
import { NavLink } from "react-router-dom";

const NavBar = props => {
  return (
    <div className="header">
      <div className="navbar">
        <NavLink
          exact
          className="navbar-button"
          activeClassName="navbar-button-active"
          to={`/`}
        >
          Hosts
        </NavLink>
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
        <NavLink
          className="navbar-button"
          activeClassName="navbar-button-active"
        >
          Analytics
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

export default NavBar;
