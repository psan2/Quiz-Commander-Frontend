import React from "react";

const Header = props => {
  return (
    <div>
      <h1>Quiz Commander</h1>
      <button onClick={props.handleLogOut}>Log Out</button>
    </div>
  );
};

export default Header;
