import React, { Component } from "react";

export default class TestComponent extends Component {
  openConnection = () => {
    return new WebSocket("ws://localhost:3000/cable");
  };

  render() {
    return <div>{this.openConnection()}</div>;
  }
}
