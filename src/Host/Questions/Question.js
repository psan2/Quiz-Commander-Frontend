import React, { Component } from "react";
import { Link } from "react-router-dom";
import api from "../../API/Connection";

export default class Question extends Component {
  checkboxPresent = () => {
    if (this.props.selectable) {
      return (
        <input
          type="checkbox"
          id={this.props.question.id}
          onChange={this.props.toggleQuestion}
          checked={this.props.question.in_round}
        />
      );
    }
  };

  render() {
    return (
      <div>
        {this.checkboxPresent()}
        {this.props.question.nickname}
        <Link to={`/edit-question/${this.props.question.id}`}>
          Edit this question
        </Link>
        <button
          onClick={() => {
            if (window.confirm("Are you sure you wish to delete this item?"))
              api.deleteItem("questions", this.props.question.id);
          }}
        >
          Delete
        </button>
      </div>
    );
  }
}
