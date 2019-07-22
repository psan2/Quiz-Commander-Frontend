import React, { Component } from "react";
import api from "../../API/Connection";

export default class EditQuestion extends Component {
  state = { round: this.props.round };

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

  generateQuestionEntries = () => {
    return this.state.round.questions.map(question => {
      return (
        <div>
          {question.question_type}: {question.nickname}-
          {question.question_content}
        </div>
      );
    });
  };

  render() {
    return (
      <div>
        <form onSubmit={e => e.preventDefault()}>
          <div>
            <h4>Question Type</h4>
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
            <h4>Nickname:</h4>
            <input
              onChange={this.handleRoundChange}
              id="nickname"
              type="input"
              name="nickname"
              value={this.state.round.nickname}
            />
          </div>
          <div>
            <h4>Answer Options:</h4>
            {this.generateQuestionEntries()}
            <button onClick={console.log("New question!")}>+</button>
          </div>
          <div>
            <button onClick={this.submitQuestion}>Submit</button>
          </div>
        </form>
      </div>
    );
  }
}
