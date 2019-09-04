import React, { Component } from "react";
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
      const index = this.indexOfChild(child.id);
      if (index) {
        added.push({ ...child, index: index });
      } else {
        library.push(child);
      }
    }
    this.setState({ library: library, added: added });
  };

  handleChange = e => {
    this.setState({
      item: { ...this.state.item, [e.target.name]: e.target.value }
    });
  };

  indexOfChild = idString => {
    const inRound = this.state.item.children.find(
      rq => rq.child_id === parseInt(idString)
    );

    if (inRound) {
      return inRound.index;
    } else {
      return false;
    }
  };

  addChild = id => {
    const added = this.state.added;
    const library = this.state.library.filter(child => {
      return child.id !== id;
    });

    const target = {
      ...this.state.library.find(child => child.id === id),
      index: added.length + 1
    };
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

    const targetItem = reorderedArray.find(child => child.id === id);
    const destinationIndex = targetItem.index + direction;
    if (destinationIndex < 0 || destinationIndex > reorderedArray.length) {
      return;
    }
    const itemInDestination = reorderedArray[destinationIndex - 1];
    itemInDestination.index = targetItem.index;
    targetItem.index = destinationIndex;

    this.setState({ added: reorderedArray });
  };

  handleSubmit = e => {
    e.preventDefault();

    const payload = {
      id: this.state.item.id,
      nickname: this.state.item.nickname,
      children: this.state.added.map(child => {
        return { id: child.id, index: child.index };
      })
    };

    if (this.state.item.id) {
      api.updateItem(this.props.contentType, payload).then(data => {
        if (data.error) {
          alert("Sorry, something went wrong. Please try again.");
        } else {
          alert("Updated!");
        }
      });
    } else {
      api.createItem(this.props.contentType, payload).then(data => {
        if (data.error) {
          alert("Sorry, something went wrong. Please try again.");
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
