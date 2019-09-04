import React, { Component } from "react";
// eslint-disable-next-line
import { Redirect } from "react-router-dom";
import api from "../API/Connection";
import deserializer from "../API/Deserializer";
import LibraryContainer from "./LibraryContainer";
import AddedContainer from "./AddedContainer";

export default class RoundOrQuizEdit extends Component {
  state = { item: this.props.item, library: [], added: [] };

  contentType = this.props.contentType;
  childType = this.props.contentType === "quizzes" ? "rounds" : "questions";

  componentDidMount = () => {
    api.getItems(this.childType).then(this.parseChildren);
  };

  parseChildren = entries => {
    let children;
    if (this.childType === "rounds") {
      children = deserializer.rounds(entries);
    } else {
      children = deserializer.questions(entries);
    }

    let added = [];
    let library = [];
    for (const child of children) {
      this.childInParent(child.id) ? added.push(child) : library.push(child);
    }
    this.setState({ library: library, added: added });
  };

  handleChange = e => {
    this.setState({
      item: { ...this.state.item, [e.target.name]: e.target.value }
    });
  };

  childInParent = id => {
    return this.state.item.child_ids.includes(id);
  };

  addChild = id => {
    const target = this.state.library.find(child => child.id === id);
    const library = this.state.library.filter(child => {
      return child.id !== id;
    });
    const added = this.state.added;
    added.push(target);

    this.setState({ library: library, added: added });
  };

  removeChild = id => {
    const target = this.state.added.find(child => child.id === id);
    const added = this.state.added.filter(child => {
      return child.id !== id;
    });
    const library = this.state.library;
    library.push(target);

    this.setState({ library: library, added: added });
  };

  reorderAdded = (id, direction) => {
    const reorderedArray = this.state.added;

    const targetCurrentIndex = reorderedArray.findIndex(
      child => child.id === id
    );
    const target = reorderedArray.splice(targetCurrentIndex, 1)[0];

    const newIndex = () => {
      debugger;
      const newIndex = targetCurrentIndex + direction;

      if (newIndex > this.state.added.length) {
        return this.state.added.length;
      } else if (newIndex < 0) {
        return 0;
      } else {
        return newIndex;
      }
    };

    reorderedArray.splice(newIndex(), 0, target);
    this.setState({ added: reorderedArray });
  };

  handleSubmit = e => {
    e.preventDefault();
    if (this.state.item.id) {
      api.updateItem(this.props.contentType, this.state.item).then(data => {
        if (data.error) {
          alert(data.error);
        } else {
          alert("Updated!");
        }
      });
    } else {
      api.createItem(this.props.contentType, this.state.item).then(data => {
        if (data.error) {
          alert(data.error);
        } else {
          alert("Created!");
        }
      });
    }
  };

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <label>Nickname: </label>
          <input
            size="50"
            name="nickname"
            value={this.state.item.nickname}
            onChange={this.handleChange}
          />
          <div>
            <button className="back-button edit" onClick={this.submitItem}>
              Save
            </button>
          </div>
          <div>
            <h4>
              {this.contentType === "quizzes" ? "Rounds" : "Questions"} Added:
            </h4>
            <AddedContainer
              contentType={this.contentType}
              added={this.state.added}
              removeChild={this.removeChild}
              reorderAdded={this.reorderAdded}
            />
          </div>
          <div>
            <h4>
              {this.contentType === "quizzes" ? "Round" : "Question"} Library:
            </h4>
            <LibraryContainer
              contentType={this.contentType}
              library={this.state.library}
              addChild={this.addChild}
            />
          </div>
        </form>
      </div>
    );
  }
}
