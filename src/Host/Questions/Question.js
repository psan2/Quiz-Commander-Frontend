import React, { Component } from "react";
import { Link } from "react-router-dom";
import api from "../../API/Connection";

export default class Question extends Component {
  render() {
    return (
      <div>
        {this.props.question.nickname}
        <Link to={`/edit-question/${this.props.question.id}`}>
          Edit this question
        </Link>
        <button
          onClick={() => {
            if (window.confirm("Are you sure you wish to delete this item?"))
              api.deleteQuestion(this.props.question.id);
          }}
        >
          Delete
        </button>
      </div>
    );
  }
}
