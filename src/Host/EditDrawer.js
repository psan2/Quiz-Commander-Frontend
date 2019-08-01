import React, { Component } from "react";
import api from "../API/Connection";

export default class EditDrawer extends Component {
  state = { ...this.props.item };

  componentDidUpdate(prevProps) {
    if (this.props.item.id !== this.state.id) {
      this.setState({ ...this.props.item });
    }
  }

  handleSubmit = e => {
    e.preventDefault();
    if (this.state.id) {
      api.updateItem(this.props.contentType, this.state).then(data => {
        if (data.error) {
          alert(data.error);
        } else {
          alert("Updated!");
          this.props.editItem(this.state);
        }
      });
    } else {
      api.createItem(this.props.contentType, this.state).then(data => {
        if (data.error) {
          alert(data.error);
        } else {
          alert("Created!");
          this.props.addItem(this.state);
        }
      });
    }
  };

  addNewAnswer = () => {
    const newAnswers = this.state.answers;
    newAnswers.push({
      answer_content: "",
      question_id: this.state.id,
      correct_answer: false
    });

    this.setState({ answers: newAnswers });
  };

  removeNewAnswer = () => {
    const newAnswers = this.state.answers;
    newAnswers.pop();
    this.setState({ answers: newAnswers });
  };

  handleAnswerChange = (e, index) => {
    let newAnswers = this.state.answers;
    newAnswers[index][e.target.name] = e.target.value;
    this.setState({ answers: newAnswers });
  };

  generateAnswerOptions = () => {
    return this.state.answers.map((answer, index) => {
      return (
        <div key={index}>
          {index + 1 + ")  "}
          <input
            size="50"
            id={index}
            type="text"
            name="answer_content"
            value={answer.answer_content}
            onChange={e => this.handleAnswerChange(e, index)}
          />
          <button
            type="button"
            name="correct_answer"
            value={this.trueFalseValue(
              this.state.answers[index].correct_answer
            )}
            onClick={e => this.handleAnswerChange(e, index)}
          >
            {this.trueFalseButton(this.state.answers[index].correct_answer)}
          </button>
          <button type="button" onClick={this.removeNewAnswer}>
            -
          </button>
        </div>
      );
    });
  };

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  renderQuestionContent = () => {
    if (this.props.contentType === "questions") {
      return (
        <div>
          <div className="edit-label">Question: </div>
          <input
            size="50"
            value={this.state.question_content}
            onChange={this.handleChange}
            name="question_content"
          />
          <div>
            <div>
              <div className="edit-label">Answer Options:</div>
              {this.generateAnswerOptions()}
              <button type="button" onClick={this.addNewAnswer}>
                +
              </button>
            </div>
          </div>
          <div>
            <button type="submit" onClick={this.handleSubmit}>
              Submit
            </button>
          </div>
        </div>
      );
    }
  };

  trueFalseValue = correct_answer => {
    if (correct_answer === "true" || correct_answer === true) {
      return false;
    } else {
      return true;
    }
  };

  trueFalseButton = correct_answer => {
    if (correct_answer === "true" || correct_answer === true) {
      return "✓";
    } else {
      return "X";
    }
  };

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <label>Nickname: </label>
          <input
            size="50"
            value={this.state.nickname}
            onChange={this.handleChange}
            name="nickname"
          />
          <div>
            <div className="edit-label">Type</div>
          </div>
          <div>
            <input
              onChange={this.handleChange}
              id="question_type"
              type="radio"
              name="question_type"
              value="audio"
              checked={this.state.question_type === "audio" ? true : false}
            />
            <label>
              Audio - play an audio clip and have teams answer questions about
              it
            </label>
          </div>
          <div>
            <input
              onChange={this.handleChange}
              id="question_type"
              type="radio"
              name="question_type"
              value="video"
              checked={this.state.question_type === "video" ? true : false}
            />
            <label>
              Video - play a video clip and have teams answer questions about it
            </label>
          </div>
          <div>
            <input
              onChange={this.handleChange}
              id="question_type"
              type="radio"
              name="question_type"
              value="text"
              checked={this.state.question_type === "text" ? true : false}
            />
            <label>Text - teams answer these with freeform inputs</label>
          </div>
          <div>
            <input
              onChange={this.handleChange}
              id="question_type"
              type="radio"
              name="question_type"
              value="multiple"
              checked={this.state.question_type === "multiple" ? true : false}
            />
            <label>
              Multiple Choice - give teams a number of options to choose from
            </label>
          </div>
          {this.renderQuestionContent()}
          <button type="cancel" onClick={() => this.props.closeEditDrawer()}>
            Cancel
          </button>
        </form>
      </div>
    );
  }
}
