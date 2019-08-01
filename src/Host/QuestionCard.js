import React, { Component } from "react";
import api from "../API/Connection";

export default class QuestionCard extends Component {
  questionType = () => {
    switch (this.props.question.question_type) {
      case "audio":
        return (
          <img
            className="card-icon"
            src={require("../Assets/audio.png")}
            alt="audio question icon"
          />
        );
      case "video":
        return (
          <img
            className="card-icon"
            src={require("../Assets/video.png")}
            alt="video question icon"
          />
        );
      case "text":
        return (
          <img
            className="card-icon"
            src={require("../Assets/text.png")}
            alt="text question icon"
          />
        );
      case "multiple":
        return (
          <img
            className="card-icon"
            src={require("../Assets/multiple_choice.png")}
            alt="multiple choice question icon"
          />
        );
      default:
        return (
          <img
            className="card-icon"
            src={require("../Assets/quiz-commander-logo.png")}
            alt="no type question icon"
          />
        );
    }
  };

  listAnswers = () => {
    return this.props.question.answers.map((answer, index) => {
      return (
        <div key={index}>
          A: {answer.answer_content} {answer.correct_answer ? "✓" : ""}
        </div>
      );
    });
  };

  render() {
    return (
      <div className="card">
        <div className="card-inner">
          <div className="side-front">
            <div className="card-content">
              {this.questionType()}
              <div>{this.props.question.nickname}:</div>
              {this.props.question.question_content}
            </div>
          </div>
          <div className="side-back">
            <div className="card-content">
              <div>{this.listAnswers()}</div>
              <div className="button-container">
                <div
                  className="back-button edit"
                  onClick={() =>
                    this.props.openEditDrawer(this.props.question.id)
                  }
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
                        .deleteItem("questions", this.props.question.id)
                        .then(resp => {
                          if (resp.ok) {
                            this.props.removeItem(this.props.question.id);
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
