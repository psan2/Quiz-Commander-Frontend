import React, { Component } from "react";
import { Link } from "react-router-dom";

export default class Question extends Component {
  render() {
    return (
      <div>
        {this.props.question.nickname}
        <Link to={`/edit-question/${this.props.question.id}`}>
          Edit this question
        </Link>
      </div>
    );
  }
}
