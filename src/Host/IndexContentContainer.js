import React, { Component } from "react";
import { Link } from "react-router-dom";
import FilterBar from "./FilterBar";

//api function imports
import api from "../API/Connection";
import deserialize from "../API/Deserializer";

//subcomponent imports
import QuestionCard from "./QuestionCard";
import RoundCard from "./RoundCard";
import QuizCard from "./QuizCard";

export default class IndexContentContainer extends Component {
  state = {
    content_items: [],
    filter: ""
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

  handleFilter = e => {
    this.setState({ filter: e.target.id });
  };

  filterItems = () => {
    if (this.state.filter) {
      return this.state.content_items.filter(item => {
        return (
          item.question_type === this.state.filter ||
          item.round_type === this.state.filter
        );
      });
    } else {
      return this.state.content_items;
    }
  };

  contentFilters = () => {
    if (this.content_type !== "quizzes") {
      return <FilterBar handleFilter={this.handleFilter} />;
    }
  };

  renderContent = () => {
    if (this.state.content_items.length === 0) {
      return (
        <div class="lds-circle">
          <div />
        </div>
      );
    } else {
      switch (this.content_type) {
        case "questions":
          return this.filterItems().map(question => (
            <QuestionCard key={question.id} question={question} />
          ));
        case "rounds":
          return this.filterItems().map(round => (
            <RoundCard key={round.id} round={round} />
          ));
        case "quizzes":
          return this.filterItems().map(quiz => (
            <QuizCard key={quiz.id} quiz={quiz} />
          ));
        default:
          break;
      }
    }
  };

  render() {
    return (
      <div className="card-container">
        {this.contentFilters()}
        <div style={{ flexBasis: "100%" }} />
        {this.renderContent()}
      </div>
    );
  }
}
