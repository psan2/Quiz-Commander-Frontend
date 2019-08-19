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

  toggleChild = e => {
    const currentChildren = this.state.item.child_ids;
    const targetIndex = currentChildren.findIndex(child => {
      return child === e.target.id;
    });

    if (targetIndex >= 0) {
      currentChildren.splice(targetIndex, 1);
    } else {
      const targetChild = this.state.library.find(child => {
        return child.id === e.target.id;
      });
      currentChildren.push(targetChild.id);
    }
    this.setState({
      item: { ...this.state.item, child_ids: currentChildren }
    });
  };

  childInParent = id => {
    return this.state.item.child_ids.includes(id);
  };

  generateChildEntries = () => {
    if (this.contentType === "quizzes") {
      return this.state.library.map(child => {
        return (
          <div key={child.id}>
            <input
              type="checkbox"
              id={child.id}
              onChange={this.toggleChild}
              checked={this.childInParent(child.id)}
            />
            <label>
              {child.nickname}: {child.round_type}
            </label>
          </div>
        );
      });
    } else {
      return this.state.library.map(child => {
        return (
          <div key={child.id}>
            <input
              type="checkbox"
              id={child.id}
              onChange={this.toggleChild}
              checked={this.childInParent(child.id)}
            />
            <label>
              {child.nickname}: {child.question_content}
            </label>
          </div>
        );
      });
    }
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
            <h4>
              {this.contentType === "quizzes" ? "Rounds" : "Questions"} Added:
            </h4>
            <AddedContainer
              contentType={this.contentType}
              added={this.state.added}
            />
          </div>
          <div>
            <h4>
              {this.contentType === "quizzes" ? "Round" : "Question"} Library:
            </h4>
            <LibraryContainer
              contentType={this.contentType}
              library={this.state.library}
            />
          </div>
          <div>
            <button onClick={this.submitItem}>Save</button>
          </div>
        </form>
      </div>
    );
  }
}
