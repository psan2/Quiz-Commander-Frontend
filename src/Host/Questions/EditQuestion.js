import React, { Component } from "react";

export default class EditQuestion extends Component {
  addContentToState = questionData => {
    const question = {
      id: parseInt(questionData.data.id, 10),
      question_type: questionData.data.attributes.question_type,
      question_content: questionData.data.attributes.question_content,
      nickname: questionData.data.attributes.nickname
    };

    let answers = [];
    questionData.included.forEach(answer => {
      const answerObj = {
        id: answer.id,
        answer_content: answer.attributes.answer_content,
        correct_answer: answer.attributes.correct_answer
      };
      answers.push(answerObj);
    });
    this.setState({ question: question, answers: answers });
  };

  fileUpload = () => {
    const type = this.state.question.question_type;
    if (type === "video" || type === "audio") {
      return "FILE UPLOAD HERE";
    }
  };

  handleQuestionChange = e => {
    this.setState({
      question: { ...this.state.question, [e.target.name]: e.target.value }
    });
  };

  addNewAnswer = () => {
    const answers = this.state.answers;
    answers.push({ answer_content: "" });
    this.setState({
      answers: answers
    });
  };

  removeNewAnswer = () => {
    this.setState({ answers: this.state.answers.slice(0, -1) });
  };

  handleAnswerChange = e => {
    let answers;
    answers = this.state.answers.map(answer => {
      if (answer.id === e.target.id) {
        answer = { ...answer, [e.target.name]: e.target.value };
        return answer;
      } else {
        return answer;
      }
    });
    this.setState({ answers: answers });
  };

  generateAnswerOptions = () => {
    let temp = [];
    for (let i = 0; i < this.state.answers.length; i++) {
      temp.push(
        <div key={i}>
          <h4>Answer Options:</h4>
          {i + 1 + ")  "}
          <input
            id={i}
            type="text"
            name="answer"
            value={
              this.state.answers[i] ? this.state.answers[i].answer_content : ""
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
