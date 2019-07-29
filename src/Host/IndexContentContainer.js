import React, { Component } from "react";
import { Link } from "react-router-dom";

//api function imports
import api from "../API/Connection";
import deserialize from "../API/Deserializer";

//subcomponent imports
import QuestionCard from "./QuestionCard";
import RoundCard from "./RoundCard";
import QuizCard from "./QuizCard";

export default class IndexContentContainer extends Component {
  state = {
    content_items: []
  };

  content_type = this.props.content_type;

  componentDidMount = () => {
    this.fetchContent();
  };

  fetchContent = () => {
    api
      .getItems(this.content_type)
      .then(this.transformContent)
      .then(deserialized_content =>
        this.setState({ content_items: deserialized_content })
      );
  };

  transformContent = data => {
    switch (this.content_type) {
      case "questions":
        return deserialize.questions(data);
      case "rounds":
        return deserialize.rounds(data);
      case "quizzes":
        return deserialize.quizzes(data);
      default:
        break;
    }
  };

  newButtonType = () => {
    switch (this.content_type) {
      case "questions":
        return <Link to="/questions/edit">New Question</Link>;
      case "rounds":
        return <Link to="/rounds/edit">New Round</Link>;
      case "quizzes":
        return <Link to="/quizzes/edit">New Quiz</Link>;
      default:
        break;
    }
  };

  renderContent = () => {
    if (this.state.content_items.length === 0) {
      return "THIS WILL SPIN AS LOADING";
    } else {
      switch (this.content_type) {
        case "questions":
          return this.state.content_items.map(question => (
            <QuestionCard key={question.id} question={question} />
          ));
        case "rounds":
          return this.state.content_items.map(round => (
            <RoundCard key={round.id} round={round} />
          ));
        case "quizzes":
          return this.state.content_items.map(quiz => (
            <QuizCard key={quiz.id} quiz={quiz} />
          ));
        default:
          break;
      }
    }
  };

  render() {
    return (
      <div>
        {this.newButtonType()}
        {this.renderContent()}
      </div>
    );
  }
}
