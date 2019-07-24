import React, { Component } from "react";
import api from "../../API/Connection";

export default class EditQuiz extends Component {
  state = {
    quiz: this.props.quiz,
    rounds: this.props.rounds
  };

  submitQuiz = () => {
    if (this.state.round.id) {
      api.updateItem("quizzes", this.state.quiz).then(data => {
        if (data.error) {
          alert(data.error);
        } else {
          alert("Quiz updated!");
        }
      });
    } else {
      api.createItem("quizzes", this.state.quiz).then(console.log);
    }
  };

  handleQuizChange = e => {
    this.setState({
      round: { ...this.state.round, [e.target.name]: e.target.value }
    });
  };

  toggleRound = e => {
    const currentRounds = this.state.quiz.rounds;
    const checkboxRoundIndex = currentRounds.findIndex(round => {
      return round.id === e.target.id;
    });

    if (checkboxRoundIndex >= 0) {
      currentRounds.splice(checkboxRoundIndex, 1);
    } else {
      const targetRound = this.state.rounds.find(round => {
        return round.id === e.target.id;
      });
      currentRounds.push(targetRound);
    }
    this.setState({
      round: { ...this.state.round, rounds: currentRounds }
    });
  };

  render() {
    return (
      <div>
        <form onSubmit={e => e.preventDefault()}>
          <div>
            <h4>Quiz Name:</h4>
            <input
              onChange={this.handleQuizChange}
              id="nickname"
              type="input"
              name="nickname"
              value={this.state.quiz.nickname}
            />
          </div>
          <div>
            <h4>Rounds:</h4>
            {this.props.generateRoundEntries(
              this.props.rounds,
              this.state.quiz.rounds,
              true,
              this.toggleRound
            )}
          </div>
          <div>
            <button onClick={this.submitQuiz}>Submit</button>
          </div>
        </form>
      </div>
    );
  }
}
