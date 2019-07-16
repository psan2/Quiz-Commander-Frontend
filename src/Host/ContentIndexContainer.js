import React, { Component } from "react";
import api from "../API/Connection";
import Question from "./Question";
import Round from "./Round";
import Quiz from "./Quiz";

export default class ContentIndexContainer extends Component {
  state = { questions: [], rounds: [], quizzes: [] };

  content_type = this.props.content;

  componentDidMount() {
    this.fetchContent();
  }

  fetchContent = () => {
    const token = localStorage.getItem("token");
    api.getContent(token, this.content_type).then(data => {
      this.setState({ [this.content_type]: data });
    });
  };

  mapQuestions = () => {
    return this.state.contentArray.map(content => {
      switch (this.content_type) {
        case "questions":
          return <Question key={content.id} question={content} />;
        case "rounds":
          return <Round key={content.id} round={content} />;
        case "quizzes":
          return <Quiz key={content.id} quiz={content} />;
        default:
          break;
      }
    });
  };

  render() {
    return <div>{this.mapQuestions()}</div>;
  }
}
