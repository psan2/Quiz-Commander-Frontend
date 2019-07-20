import React, { Component } from "react";
import api from "../../API/Connection";

export default class EditQuestion extends Component {
  state = { question: this.props.question };

  submitQuestion = () => {
    if (this.state.question.id) {
      api.updateQuestion(this.state.question).then(data => {
        if (data.error) {
          alert(data.error);
        } else {
          alert("Question updated!");
        }
      });
    } else {
      api.createQuestion(this.state.question).then(console.log);
    }
  };

  fileUpload = () => {
    const type = this.state.question ? this.state.question.question_type : "";
    if (type === "video" || type === "audio") {
      return <div>"FILE UPLOAD HERE"</div>;
    }
  };

  addNewAnswer = () => {
    const answers = this.state.question.answers;
    answers.push({
      answer_content: "",
      question_id: this.state.question.id,
      correct_answer: false
    });
    this.setState({
      question: { ...this.state.question, answers: answers }
    });
  };

  removeNewAnswer = () => {
    const newAnswers = this.state.question.answers;
    newAnswers.pop();
    this.setState({
      question: { ...this.state.question, answers: newAnswers }
    });
  };

  handleAnswerChange = (e, index) => {
    let answers;
    answers = this.state.question.answers;
    answers[index][e.target.name] = e.target.value;
    this.setState({ question: { ...this.state.question, answers: answers } });
  };

  handleQuestionChange = e => {
    this.setState({
      question: { ...this.state.question, [e.target.name]: e.target.value }
    });
  };

  generateAnswerOptions = () => {
    let temp = [];
    const count = this.state.question ? this.state.question.answers.length : 1;
    for (let i = 0; i < count; i++) {
      temp.push(
        <div key={i}>
          {i + 1 + ")  "}
          <input
            id={i}
            type="text"
            name="answer_content"
            value={
              this.state.question && this.state.question.answers[i]
                ? this.state.question.answers[i].answer_content
                : ""
            }
            onChange={e => this.handleAnswerChange(e, i)}
          />
          <button
            name="correct_answer"
            value={
              this.state.question.answers[i].correct_answer === "true"
                ? "false"
                : "true"
            }
            onClick={e => this.handleAnswerChange(e, i)}
          >
            {this.state.question.answers[i].correct_answer === "true"
              ? "✓"
              : "X"}
          </button>
          <button onClick={this.removeNewAnswer}>-</button>
        </div>
      );
    }
    return temp;
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
              onChange={this.handleQuestionChange}
              id="question_type"
              type="radio"
              name="question_type"
              value="audio"
              checked={
                this.state.question.question_type === "audio" ? true : false
              }
            />
          </div>
          <div>
            <label>Video</label>
            <input
              onChange={this.handleQuestionChange}
              id="question_type"
              type="radio"
              name="question_type"
              value="video"
              checked={
                this.state.question.question_type === "video" ? true : false
              }
            />
          </div>
          <div>
            <label>Text</label>
            <input
              onChange={this.handleQuestionChange}
              id="question_type"
              type="radio"
              name="question_type"
              value="text"
              checked={
                this.state.question.question_type === "text" ? true : false
              }
            />
          </div>
          <div>
            <label>Multiple Choice</label>
            <input
              onChange={this.handleQuestionChange}
              id="question_type"
              type="radio"
              name="question_type"
              value="multiple"
              checked={
                this.state.question.question_type === "multiple" ? true : false
              }
            />
          </div>
          <div>{this.fileUpload()}</div>
          <div>
            <h4>Nickname:</h4>
            <input
              onChange={this.handleQuestionChange}
              id="nickname"
              type="input"
              name="nickname"
              value={this.state.question.nickname}
            />
          </div>
          <div>
            <h4>Question Text</h4>
            <input
              onChange={this.handleQuestionChange}
              id="question_content"
              type="input"
              name="question_content"
              value={this.state.question.question_content}
            />
          </div>
          <div>
            <h4>Answer Options:</h4>
            {this.generateAnswerOptions()}
            <button onClick={this.addNewAnswer}>+</button>
          </div>
          <div>
            <button onClick={this.submitQuestion}>Submit</button>
          </div>
        </form>
      </div>
    );
  }
}
