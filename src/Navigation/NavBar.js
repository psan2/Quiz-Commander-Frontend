import React from "react";
import { Link } from "react-router-dom";

const Header = props => {
  return (
    <div>
      <h1>Quiz Commander</h1>
      <div>
        <Link to={`/`}>Home</Link>
        <Link to={`/questions`}>Questions</Link>
        <Link to={`/rounds`}>Rounds</Link>
        <Link to={`/quizzes`}>Quizzes</Link>
        <Link to={`/logout`}>Log Out</Link>
      </div>
    </div>
  );
};

export default Header;
