import React, { Component } from "react";

export default class Round extends Component {
  render() {
    return <div>{this.props.round.nickname}</div>;
  }
}
