import React, { Component } from "react";
import { Link } from "react-router-dom";
import api from "../API/Connection";

export default class Question extends Component {
  roundType = () => {
    switch (this.props.question.question_type) {
      case "audio":
        return (
          <img
            className="card-icon"
            src={require("../../Assets/audio.png")}
            alt="audio question icon"
          />
        );
      case "video":
        return (
          <img
            className="card-icon"
            src={require("../../Assets/video.png")}
            alt="video question icon"
          />
        );
      case "text":
        return (
          <img
            className="card-icon"
            src={require("../../Assets/text.png")}
            alt="text question icon"
          />
        );
      case "multiple":
        return (
          <img
            className="card-icon"
            src={require("../../Assets/multiple_choice.png")}
            alt="multiple choice question icon"
          />
        );
      default:
        return (
          <img
            className="card-icon"
            src={require("../../Assets/quiz-commander-logo.png")}
            alt="no type question icon"
          />
        );
    }
  };

  render() {
    return (
      <div className="card">
        <img
          className="flip-icon"
          src={require("../../Assets/flip.png")}
          alt="flip card icon"
        />
        <div style={{ flexBasis: "100%", height: "0px" }} />
        {this.roundType()}
        <div>{this.props.question.nickname}</div>
      </div>
    );
  }
}

/* <Link to={`/edit-question/${this.props.question.id}`}>
          Edit this question
        </Link>
        <button
          onClick={() => {
            if (window.confirm("Are you sure you wish to delete this item?"))
              api.deleteItem("questions", this.props.question.id);
          }}
        >
          Delete
        </button> */
