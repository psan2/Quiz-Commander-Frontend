import React, { Component } from "react";

//api function imports
import api from "../API/Connection";
import deserialize from "../API/Deserializer";

//subcomponent imports
import QuestionCard from "./QuestionCard";
import RoundCard from "./RoundCard";

export default class SubcontentContainer extends Component {
  state = {
    subcontentItems: "",
    filter: "",
    itemsAlreadyAdded: ""
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

  render() {
    return <div>test</div>;
  }
}
