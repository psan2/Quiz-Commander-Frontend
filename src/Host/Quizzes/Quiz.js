import React, { Component } from "react";
import { Link } from "react-router-dom";
import api from "../../API/Connection";

export default class Quiz extends Component {
  render() {
    return (
      <div>
        {this.props.quiz.nickname}
        <Link to={`/edit-quiz/${this.props.quiz.id}`}>Edit this quiz</Link>
        <button
          onClick={() => {
            if (window.confirm("Are you sure you wish to delete this item?"))
              api.deleteContent("quizzes", this.props.quiz.id);
          }}
        >
          Delete
        </button>
      </div>
    );
  }
}
