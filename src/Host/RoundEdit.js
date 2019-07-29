import React, { Component } from "react";
import api from "../../API/Connection";

export default class RoundEdit extends Component {
  state = { round: this.props.round, questions: this.props.questions };

  submitRound = () => {
    if (this.state.round.id) {
      api.updateItem("rounds", this.state.round).then(data => {
        if (data.error) {
          alert(data.error);
        } else {
          alert("Round updated!");
        }
      });
    } else {
      api.createItem("rounds", this.state.round).then(console.log);
    }
  };

  handleRoundChange = e => {
    this.setState({
      round: { ...this.state.round, [e.target.name]: e.target.value }
    });
  };

  toggleQuestion = e => {
    const currentQuestions = this.state.round.questions;
    const checkboxQuestionIndex = currentQuestions.findIndex(question => {
      return question.id === e.target.id;
    });

    if (checkboxQuestionIndex >= 0) {
      currentQuestions.splice(checkboxQuestionIndex, 1);
    } else {
      const targetQuestion = this.state.questions.find(question => {
        return question.id === e.target.id;
      });
      currentQuestions.push(targetQuestion);
    }
    this.setState({
      round: { ...this.state.round, questions: currentQuestions }
    });
  };

  render() {
    return (
      <div>
        <form onSubmit={e => e.preventDefault()}>
          <div>
            <h4>Round Type</h4>
          </div>
          <div>
            <label>Audio</label>
            <input
              onChange={this.handleRoundChange}
              id="round_type"
              type="radio"
              name="round_type"
              value="audio"
              checked={this.state.round.round_type === "audio" ? true : false}
            />
          </div>
          <div>
            <label>Video</label>
            <input
              onChange={this.handleRoundChange}
              id="round_type"
              type="radio"
              name="round_type"
              value="video"
              checked={this.state.round.round_type === "video" ? true : false}
            />
          </div>
          <div>
            <label>Text</label>
            <input
              onChange={this.handleRoundChange}
              id="round_type"
              type="radio"
              name="round_type"
              value="text"
              checked={this.state.round.round_type === "text" ? true : false}
            />
          </div>
          <div>
            <label>Multiple Choice</label>
            <input
              onChange={this.handleRoundChange}
              id="round_type"
              type="radio"
              name="round_type"
              value="multiple"
              checked={
                this.state.round.round_type === "multiple" ? true : false
              }
            />
          </div>
          <div>
            <h4>Round Name:</h4>
            <input
              onChange={this.handleRoundChange}
              id="nickname"
              type="input"
              name="nickname"
              value={this.state.round.nickname}
            />
          </div>
          <div>
            <h4>Questions:</h4>
            {this.props.generateQuestionEntries(
              this.props.questions,
              this.state.round.questions,
              true,
              this.toggleQuestion
            )}
          </div>
          <div>
            <button onClick={this.submitRound}>Submit</button>
          </div>
        </form>
      </div>
    );
  }
}
