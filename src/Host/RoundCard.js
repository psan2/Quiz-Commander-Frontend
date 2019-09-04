import React, { Component } from "react";
import api from "../API/Connection";

export default class RoundCard extends Component {
  roundType = () => {
    switch (this.props.round.round_type) {
      case "audio":
        return (
          <img
            className="card-icon"
            src={require("../Assets/audio.png")}
            alt="audio round icon"
          />
        );
      case "video":
        return (
          <img
            className="card-icon"
            src={require("../Assets/video.png")}
            alt="video round icon"
          />
        );
      case "text":
        return (
          <img
            className="card-icon"
            src={require("../Assets/text.png")}
            alt="text round icon"
          />
        );
      case "multiple":
        return (
          <img
            className="card-icon"
            src={require("../Assets/multiple_choice.png")}
            alt="multiple choice round icon"
          />
        );
      default:
        return (
          <img
            className="card-icon"
            src={require("../Assets/quiz-commander-logo.png")}
            alt="no type round icon"
          />
        );
    }
  };

  renderAddRemoveButtons = () => {
    if (this.props.added === false) {
      return (
        <React.Fragment>
          <div
            className="back-button edit"
            onClick={() => this.props.addChild(this.props.round.id)}
          >
            Add
          </div>
        </React.Fragment>
      );
    } else {
      return (
        <React.Fragment>
          <div
            className="back-button del"
            onClick={() => this.props.removeChild(this.props.round.id)}
          >
            Remove
          </div>
          <br />
          <div
            className="back-button edit"
            onClick={() => this.props.reorderAdded(this.props.round.id, -1)}
          >
            ◄
          </div>
          <div
            className="back-button edit"
            onClick={() => this.props.reorderAdded(this.props.round.id, 1)}
          >
            ►
          </div>
        </React.Fragment>
      );
    }
  };

  editOrDelete = () => {
    if (this.props.edit === true) {
      return this.renderAddRemoveButtons();
    } else {
      return (
        <React.Fragment>
          <div
            className="back-button edit"
            onClick={() => this.props.openEditDrawer(this.props.round.id)}
          >
            Edit
          </div>
          <div
            className="back-button del"
            onClick={() => {
              if (
                window.confirm("Are you sure you wish to delete this item?")
              ) {
                api.deleteItem("rounds", this.props.round.id).then(resp => {
                  if (resp.ok) {
                    this.props.removeItem(this.props.round.id);
                  } else {
                    alert("Error, please try again.");
                  }
                });
              }
            }}
          >
            Delete
          </div>
        </React.Fragment>
      );
    }
  };

  render() {
    const question_count = this.props.round.children.length;

    return (
      <div className="card">
        <div className="card-inner">
          <div className="side-front">
            <div className="card-content">
              {this.roundType()}
              <div style={{ fontWeight: "bold" }}>
                {this.props.round.nickname}
              </div>
              {question_count} {question_count === 1 ? "question" : "questions"}
            </div>
          </div>
          <div className="side-back">
            <div className="card-content">
              <div className="button-container">{this.editOrDelete()}</div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
