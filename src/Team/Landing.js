import React, { Component } from "react";

export default class TeamLandingComponent extends Component {
  render() {
    return (
      <div>
        <button onClick={this.props.handleLogOut}>Log Out</button>
      </div>
    );
  }
}
