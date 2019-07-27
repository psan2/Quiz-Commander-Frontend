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
    api.getItems(this.content_type).then(this.transformContent);
  };

  transformContent = data => {
    switch (this.content_type) {
      case "questions":
        return deserialize.parseQuestionsSerial(data);
      case "rounds":
        return deserialize.parseRoundsSerial(data);
      case "quizzes":
        return deserialize.parseQuizzesSerial(data);
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

  render() {
    return <div>{this.newButtonType()}</div>;
  }
}
