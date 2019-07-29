import React, { Component } from "react";
import { Link } from "react-router-dom";
import api from "../API/Connection";

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
              <div style={{ fontWeight: "bold" }}>QUIZ NAME</div>
              QUIZ INFO
            </div>
          </div>
          <div className="side-back">
            <div className="card-content">
              NICKNAME STUFF
              <div>
                <Link to={`/questions/edit/${this.props.quiz.id}`}>Edit</Link>
              </div>
              <div
                onClick={() => {
                  if (
                    window.confirm("Are you sure you wish to delete this item?")
                  )
                    api.deleteItem("questions", this.props.question.id);
                }}
              >
                Delete
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
