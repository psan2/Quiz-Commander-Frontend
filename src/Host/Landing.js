import React, { Component } from "react";
import { Link } from "react-router-dom";

export default class HostLandingComponent extends Component {
  render() {
    return (
      <div>
        <Link to="/questions">See your questions</Link>
        <Link to="/rounds">See your rounds</Link>
        <button onClick={this.props.handleLogOut}>Log Out</button>
      </div>
    );
  }
}
