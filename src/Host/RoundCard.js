import React, { Component } from "react";
import { Link } from "react-router-dom";
import api from "../../API/Connection";

export default class Round extends Component {
  checkboxPresent = () => {
    if (this.props.selectable) {
      return (
        <input
          type="checkbox"
          id={this.props.round.id}
          onChange={this.props.toggleRound}
          checked={this.props.round.in_quiz}
        />
      );
    }
  };

  render() {
    return (
      <div>
        <h4>
          {this.checkboxPresent()}
          {this.props.round.nickname}
        </h4>
        {this.props.generateQuestionEntries(this.props.questions)}
        <Link to={`/edit-round/${this.props.round.id}`}>Edit this round</Link>
        <button
          onClick={() => {
            if (window.confirm("Are you sure you wish to delete this item?")) {
              api.deleteItem("rounds", this.props.round.id);
            }
          }}
        >
          Delete
        </button>
      </div>
    );
  }
}
