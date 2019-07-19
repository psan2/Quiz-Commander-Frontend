import React from "react";
import { Link } from "react-router-dom";

const Header = props => {
  return (
    <div>
      <h1>Quiz Commander</h1>
      <div>
        <Link to={`/questions`}>Questions</Link>
        <Link to={`/rounds`}>Rounds</Link>
        <Link to={`/quizzes`}>Quizzes</Link>
      </div>
      <button onClick={props.handleLogOut}>Log Out</button>
    </div>
  );
};

export default Header;
