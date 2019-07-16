import React, { Component } from "react";

export default class Question extends Component {
  render() {
    return <div>{this.props.question.nickname}</div>;
  }
}
