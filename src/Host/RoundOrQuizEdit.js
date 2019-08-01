import React, { Component } from "react";
// eslint-disable-next-line
import { Redirect } from "react-router-dom";
import api from "../API/Connection";
import deserializer from "../API/Deserializer";

export default class RoundOrQuizEdit extends Component {
  state = { item: this.props.item, children: [] };

  contentType = this.props.contentType;

  componentDidMount = () => {
    const childType =
      this.props.contentType === "quizzes" ? "rounds" : "questions";
    if (childType === "rounds") {
      api.getItems(childType).then(entries => {
        this.setState({ children: deserializer.rounds(entries) });
      });
    } else {
      api.getItems(childType).then(entries => {
        this.setState({ children: deserializer.questions(entries) });
      });
    }
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
      const targetChild = this.state.children.find(child => {
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
      return this.state.children.map(child => {
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
      return this.state.children.map(child => {
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

  renderRoundTypes = () => {
    if (this.contentType === "rounds") {
      return (
        <div>
          <div>
            <div className="edit-label">Type</div>
          </div>
          <div>
            <label>Audio</label>
            <input
              onChange={this.handleChange}
              id="round_type"
              type="radio"
              name="round_type"
              value="audio"
              checked={this.state.item.round_type === "audio" ? true : false}
            />
          </div>
          <div>
            <label>Video</label>
            <input
              onChange={this.handleChange}
              id="round_type"
              type="radio"
              name="round_type"
              value="video"
              checked={this.state.item.round_type === "video" ? true : false}
            />
          </div>
          <div>
            <label>Text</label>
            <input
              onChange={this.handleChange}
              id="round_type"
              type="radio"
              name="round_type"
              value="text"
              checked={this.state.item.round_type === "text" ? true : false}
            />
          </div>
          <div>
            <label>Multiple Choice</label>
            <input
              onChange={this.handleChange}
              id="round_type"
              type="radio"
              name="round_type"
              value="multiple"
              checked={this.state.item.round_type === "multiple" ? true : false}
            />
          </div>
        </div>
      );
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
          {this.renderRoundTypes()}
          <div>
            <h4>{this.contentType === "quizzes" ? "Rounds" : "Questions"}:</h4>
            {this.generateChildEntries()}
          </div>
          <div>
            <button onClick={this.submitItem}>Submit</button>
          </div>
        </form>
      </div>
    );
  }
}
