import React, { Component } from "react";
import { Link } from "react-router-dom";

export default class Quiz extends Component {
  render() {
    return (
      <div>
        {this.props.quiz.nickname}
        <Link to={`/edit-quiz/${this.props.quiz.id}`}>Edit this quiz</Link>
      </div>
    );
  }
}
