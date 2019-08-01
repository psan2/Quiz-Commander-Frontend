import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import FilterBar from "./FilterBar";

//api function imports
import api from "../API/Connection";
import deserialize from "../API/Deserializer";

//subcomponent imports
import QuestionCard from "./QuestionCard";
import RoundCard from "./RoundCard";
import QuizCard from "./QuizCard";
import EditDrawer from "./EditDrawer";

export default class IndexContentContainer extends Component {
  state = {
    contentItems: "",
    filter: "",
    editDrawerToggle: false,
    currentItem: {}
  };

  contentType = this.props.contentType;

  NEW_QUESTION = {
    id: "",
    question_content: "",
    nickname: "",
    answers: [{ answer_content: "", correct_answer: false }],
    question_type: "",
    aux_content_url: ""
  };

  componentDidMount = () => {
    this.fetchContent();
  };

  fetchContent = () => {
    api
      .getItems(this.contentType)
      .then(this.transformContent)
      .then(deserialized_content =>
        this.setState({ contentItems: deserialized_content })
      );
  };

  transformContent = data => {
    switch (this.contentType) {
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
      return this.state.contentItems.filter(item => {
        return (
          item.question_type === this.state.filter ||
          item.round_type === this.state.filter
        );
      });
    } else {
      return this.state.contentItems;
    }
  };

  openEditDrawer = id => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    this.closeEditDrawer();
    this.setState({
      editDrawerToggle: true,
      currentItem: this.state.contentItems.find(item => item.id === id)
    });
  };

  closeEditDrawer = () => {
    this.setState({ editDrawerToggle: false, currentItem: {} });
  };

  addItem = item => {
    this.setState({ contentItems: [...this.state.contentItems, item] });
    this.closeEditDrawer();
  };

  editItem = editItem => {
    const newItems = this.state.contentItems.map(existingItem => {
      if (editItem.id === existingItem.id) {
        return editItem;
      } else {
        return existingItem;
      }
    });

    this.setState({ contentItems: newItems });
    this.closeEditDrawer();
  };

  removeItem = id => {
    const newContent = this.state.contentItems.filter(content => {
      return content.id !== id;
    });
    this.setState({ contentItems: newContent });
  };

  renderContent = () => {
    if (this.state.contentItems === "") {
      return (
        <div className="lds-circle">
          <div />
        </div>
      );
    } else {
      switch (this.contentType) {
        case "questions":
          return this.filterItems().map(question => (
            <QuestionCard
              key={question.id}
              question={question}
              openEditDrawer={this.openEditDrawer}
              removeItem={this.removeItem}
            />
          ));
        case "rounds":
          return this.filterItems().map(round => (
            <RoundCard
              key={round.id}
              round={round}
              openEditDrawer={this.openEditDrawer}
              removeItem={this.removeItem}
            />
          ));
        case "quizzes":
          return this.filterItems().map(quiz => (
            <QuizCard
              key={quiz.id}
              quiz={quiz}
              openEditDrawer={this.openEditDrawer}
              removeItem={this.removeItem}
            />
          ));
        default:
          break;
      }
    }
  };

  renderEditDrawer = () => {
    if (this.state.editDrawerToggle) {
      //item to be modified is an existing question
      if (this.props.contentType === "questions" && !this.state.currentItem) {
        return (
          <EditDrawer
            item={this.NEW_QUESTION}
            contentType={this.props.contentType}
            addItem={this.addItem}
            closeEditDrawer={this.closeEditDrawer}
          />
        );
        //item to be modified is a new question
      } else if (this.props.contentType === "questions") {
        return (
          <EditDrawer
            editItem={this.editItem}
            item={this.state.currentItem}
            contentType={this.props.contentType}
            addItem={this.addItem}
            closeEditDrawer={this.closeEditDrawer}
          />
        );
        //item to be modified is a new round or quiz
      } else if (!this.state.currentItem) {
        return <Redirect to={`/${this.props.contentType}/edit/`} />;
        //item to be modified is an existing round or quiz
      } else {
        return (
          <Redirect
            to={{
              pathname: `/${this.props.contentType}/edit/${
                this.state.currentItem.id
              }`,
              state: { item: this.state.currentItem }
            }}
          />
        );
      }
    }
  };

  render() {
    return (
      <div className="card-container">
        <FilterBar
          openEditDrawer={this.openEditDrawer}
          handleFilter={this.handleFilter}
          contentType={this.props.contentType}
        />
        <div style={{ flexBasis: "100%" }} />
        {this.renderEditDrawer()}
        <div style={{ flexBasis: "100%" }} />
        {this.renderContent()}
      </div>
    );
  }
}
