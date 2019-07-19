import React, { Component } from "react";
import Question from "./Questions/Question";
import Round from "./Rounds/Round";
import Quiz from "./Quizzes/Quiz";

export default class IndexContentContainer extends Component {
  content_type = this.props.content_type;

  mapContent = () => {
    switch (this.content_type) {
      case "questions":
        return this.props.data
          .sort((a, b) => {
            return a.updated_at > b.updated_at ? -1 : 0;
          })
          .map(question => {
            return <Question key={question.id} question={question} />;
          });
      case "rounds":
        return this.props.data.map(round => {
          return <Round key={round.id} round={round} />;
        });
      case "quizzes":
        return this.props.data.map(quiz => {
          return <Quiz key={quiz.id} quiz={quiz} />;
        });
      default:
        break;
    }
  };

  render() {
    return <div>{this.mapContent()}</div>;
  }
}
