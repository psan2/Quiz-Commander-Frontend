import React, { Component } from "react";

export default class NewContentItem extends Component {
  fileUpload = () => {
    const type = this.props.question ? this.props.question.question_type : "";
    if (type === "video" || type === "audio") {
      return <div>"FILE UPLOAD HERE"</div>;
    }
  };

  addNewAnswer = () => {
    const answers = this.props.question.answers;
    answers.push({ answer_content: "" });
    this.setState({
      answers: answers
    });
  };

  removeNewAnswer = () => {
    this.setState({
      answers: this.props.question.answers.slice(
        this.props.question.answers.length - 1
      )
    });
  };

  handleAnswerChange = e => {
    let answers;

    if (this.props.question) {
      answers = this.props.question.answers.map(answer => {
        if (answer.id === e.target.id) {
          answer = { ...answer, [e.target.name]: e.target.value };
          return answer;
        } else {
          return answer;
        }
      });
      this.setState({ question: { answers: answers } });
    }
  };

  generateAnswerOptions = () => {
    let temp = [];
    const count = this.props.question ? this.props.question.answers.length : 1;
    for (let i = 0; i < count; i++) {
      temp.push(
        <div key={i}>
          <h4>Answer Options:</h4>
          {i + 1 + ")  "}
          <input
            id={i}
            type="text"
            name="answer"
            value={
              this.props.question && this.props.question.answers[i]
                ? this.props.question.answers[i].answer_content
                : ""
            }
            onChange={this.handleAnswerChange}
          />
          <button onClick={this.removeNewAnswer}>-</button>
        </div>
      );
    }
    return temp;
  };

  render() {
    debugger;
    const question = this.props.question ? this.props.question : {};

    return (
      <div>
        <form>
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
              checked={question.question_type === "audio" ? true : false}
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
              checked={question.question_type === "video" ? true : false}
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
              checked={question.question_type === "text" ? true : false}
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
              checked={question.question_type === "multiple" ? true : false}
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
              value={question.nickname}
            />
          </div>
          <div>
            <h4>Question Text</h4>
            <input
              onChange={this.handleQuestionChange}
              id="question_content"
              type="input"
              name="question_content"
              value={question.question_content}
            />
          </div>
          <div>
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
