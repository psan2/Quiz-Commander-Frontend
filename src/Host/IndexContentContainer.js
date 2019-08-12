import React, { Component } from "react";
import { Redirect } from "react-router-dom";

//import redux tools
import { connect } from "react-redux";
import {
  fetchQuestionsSuccess,
  fetchRoundsSuccess,
  fetchQuizzesSuccess
} from "../Redux/Actions";

//api function imports
import api from "../API/Connection";
import deserialize from "../API/Deserializer";

//subcomponent imports
import FilterBar from "./FilterBar";
import QuestionCard from "./QuestionCard";
import RoundCard from "./RoundCard";
import QuizCard from "./QuizCard";
import EditDrawer from "./EditDrawer";

class IndexContentContainer extends Component {
  state = {
    loading: true,
    filter: "",
    currentItem: {},
    editDrawerToggle: false
  };

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
      .getItems(this.props.contentType)
      .then(this.transformContent)
      .then(deserialized_content => {
        fetchQuestionsSuccess(deserialized_content);
      });
  };

  transformContent = data => {
    switch (this.props.contentType) {
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
    if (this.props.filter) {
      return this.props.contentItems.filter(item => {
        return (
          item.question_type === this.props.filter ||
          item.round_type === this.props.filter
        );
      });
    } else {
      return this.props.contentItems;
    }
  };

  openEditDrawer = id => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    this.closeEditDrawer();
    this.setState({
      editDrawerToggle: true,
      currentItem: this.props.contentItems.find(item => item.id === id)
    });
  };

  closeEditDrawer = () => {
    this.setState({ editDrawerToggle: false, currentItem: {} });
  };

  addItem = item => {
    this.setState({ contentItems: [...this.props.contentItems, item] });
    this.closeEditDrawer();
  };

  editItem = editItem => {
    const newItems = this.props.contentItems.map(existingItem => {
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
    const newContent = this.props.contentItems.filter(content => {
      return content.id !== id;
    });
    this.setState({ contentItems: newContent });
  };

  renderContent = () => {
    switch (this.props.contentType) {
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
  };

  renderEditDrawer = () => {
    if (this.props.editDrawerToggle) {
      //item to be modified is an existing question
      if (this.props.contentType === "questions" && !this.props.currentItem) {
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
            item={this.props.currentItem}
            contentType={this.props.contentType}
            addItem={this.addItem}
            closeEditDrawer={this.closeEditDrawer}
          />
        );
        //item to be modified is a new round or quiz
      } else if (!this.props.currentItem) {
        return <Redirect to={`/${this.props.contentType}/edit/`} />;
        //item to be modified is an existing round or quiz
      } else {
        return (
          <Redirect
            to={{
              pathname: `/${this.props.contentType}/edit/${
                this.props.currentItem.id
              }`,
              state: { item: this.props.currentItem }
            }}
          />
        );
      }
    }
  };

  render() {
    if (this.props.contentItems === "") {
      return (
        <div className="spinner">
          <img
            style={{ width: "50vh" }}
            src={require("../Assets/quiz-commander-logo.png")}
            alt="quiz commander logo"
          />
        </div>
      );
    } else {
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
}

const mapStateToProps = (state, ownProps) => {
  let contentItems;

  switch (ownProps.contentType) {
    case "questions":
      contentItems = state.questions;
      break;
    case "rounds":
      contentItems = state.rounds;
      break;
    case "quizzes":
      contentItems = state.quizzes;
      break;
    default:
      contentItems = [];
      break;
  }

  return {
    contentType: ownProps.contentType,
    contentItems: contentItems
  };
};

export default connect(mapStateToProps)(IndexContentContainer);
