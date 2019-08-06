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

  render() {
    const question_count = this.props.round.child_ids.length;
    return (
      <div className="card">
        <div className="card-inner">
          <div className="side-front">
            <div className="card-content">
              {this.roundType()}
              <div style={{ fontWeight: "bold" }}>
                {this.props.round.nickname}
              </div>
              {question_count} {question_count > 1 ? "questions" : "question"}
            </div>
          </div>
          <div className="side-back">
            <div className="card-content">
              <div className="button-container">
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
                      window.confirm(
                        "Are you sure you wish to delete this item?"
                      )
                    ) {
                      api
                        .deleteItem("rounds", this.props.round.id)
                        .then(resp => {
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
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}