import React, { Component } from "react";
import api from "../API/Connection";
import exportTools from "../API/ExportTools";

export default class QuizCard extends Component {
  render() {
    return (
      <div className="card">
        <div className="card-inner">
          <div className="side-front">
            <div className="card-content">
              <img
                className="card-icon"
                src={require("../Assets/quiz-commander-logo.png")}
                alt="no type quiz icon"
              />
              <div style={{ fontWeight: "bold" }}>
                {this.props.quiz.nickname}
              </div>
              {this.props.quiz.child_ids.length}{" "}
              {this.props.quiz.child_ids.length === 1 ? "round" : "rounds"}
            </div>
          </div>
          <div className="side-back">
            <div className="card-content">
              <div className="button-container">
                <div
                  className="back-button edit"
                  onClick={() => this.props.openEditDrawer(this.props.quiz.id)}
                >
                  Edit
                </div>
                <div
                  className="back-button edit"
                  onClick={() => exportTools.quiz(this.props.quiz.id)}
                  // onClick={() => alert("Coming soon!")}
                >
                  Export as CSV
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
                        .deleteItem("quizzes", this.props.quiz.id)
                        .then(resp => {
                          if (resp.ok) {
                            this.props.removeItem(this.props.quiz.id);
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
