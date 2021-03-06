import React, { Component } from "react";
import api from "../API/Connection";
import Login from "./Login";
import Signup from "./Signup";

export default class StartPage extends Component {
  state = {
    persona: "hosts",
    username: "",
    password: "",
    password_confirmation: "",
    email: "",
    loginSignup: "login"
  };

  capitalize = s => {
    return s.charAt(0).toUpperCase() + s.slice(1);
  };

  handleChange = e => {
    e.preventDefault();
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  onLoginClicked = e => {
    e.preventDefault();
    api
      .login(this.state.username, this.state.password, this.state.persona)
      .then(data => {
        if (data.error) {
          this.setState({ username: "", password: "" });
          alert("Please re-enter your username and password and try again.");
        } else {
          localStorage.setItem("token", data.jwt);
          localStorage.setItem("persona", this.state.persona);
          this.props.handleLogin();
        }
      });
  };

  onSignupClicked = e => {
    e.preventDefault();

    api
      .signup(
        this.state.username,
        this.state.password,
        this.state.password_confirmation,
        this.state.email,
        this.state.persona
      )
      .then(data => {
        if (data.error) {
          alert(data.error);
          this.setState({
            username: "",
            password: "",
            password_confirmation: "",
            email: ""
          });
        } else {
          localStorage.setItem("token", data.jwt);
          localStorage.setItem("persona", this.state.persona);
          this.props.handleLogin();
        }
      });
  };

  renderLoginOrSignupPrompt = () => {
    if (this.state.persona && this.state.loginSignup === "login") {
      return (
        <Login
          capitalize={this.capitalize}
          persona={this.state.persona}
          onLoginClicked={this.onLoginClicked}
          handleChange={this.handleChange}
          username={this.state.username}
          password={this.state.password}
        />
      );
    } else if (this.state.persona && this.state.loginSignup === "signup") {
      return (
        <Signup
          capitalize={this.capitalize}
          persona={this.state.persona}
          onSignupClicked={this.onSignupClicked}
          handleChange={this.handleChange}
          username={this.state.username}
          password={this.state.password}
          password_confirmation={this.state.password_confirmation}
          email={this.state.email}
        />
      );
    }
  };

  headerToggle = () => {
    if (this.state.loginSignup) {
      return (
        <div>
          <div>
            {/* <div
              name="persona"
              value="hosts"
              onClick={this.handleChange}
              className="toggle-button"
              style={{ float: "left" }}
            >
              Hosts
            </div>
            <div
              name="persona"
              value="hosts"
              onClick={this.handleChange}
              className="toggle-button"
              style={{ float: "right" }}
            >
              Teams
            </div> */}
            {/* {this.capitalize(this.state.loginSignup)} as: */}
            {/* <select onChange={this.handleChange} name="persona" id="persona">
              <option value="hosts">Host</option>
              <option value="teams">Team</option>
            </select> */}
            {this.renderLoginOrSignupPrompt()}
          </div>
        </div>
      );
    }
  };

  loginOrSignupButton = () => {
    if (this.state.loginSignup === "signup") {
      return (
        <div
          className="toggle-button"
          onClick={() => this.setState({ loginSignup: "login" })}
        >
          Already a QuizCommander Host?
        </div>
      );
    } else {
      return (
        <div
          className="toggle-button"
          onClick={() => this.setState({ loginSignup: "signup" })}
        >
          New to QuizCommander?
        </div>
      );
    }
  };

  render() {
    return (
      <div className="login-flex-container">
        <div className="login-flex-left-column">
          <img
            className="login-logo"
            src={require("../Assets/quiz-commander-logo.png")}
            alt="quiz commander logo"
          />
          <div style={{ textAlign: "center", marginBottom: "25px" }}>
            <div
              style={{
                display: "inline-block",
                fontSize: "1.2rem",
                fontWeight: "bold",
                color: "#0496ff",
                width: "70%"
              }}
            >
              A place for trivia hosts to create innovative, highly interactive
              quizzes that teams can use their phones to answer!
            </div>
          </div>
          <div>
            <img
              className="qc-icon"
              src={require("../Assets/no_paper_forms.png")}
              alt="No paper forms required!"
            />{" "}
            <img
              className="qc-icon"
              src={require("../Assets/precision_scoring.png")}
              alt="Get scores live!"
            />{" "}
            <img
              className="qc-icon"
              src={require("../Assets/reuse_questions.png")}
              alt="Build questions from your personal question bank!"
            />{" "}
            <img
              className="qc-icon"
              src={require("../Assets/question_types.png")}
              alt="Use a variety of fun question types!"
            />
          </div>
        </div>
        <div className="login-flex-right-column">
          <div className="signup-login-container">
            {this.headerToggle()}
            <div>{this.loginOrSignupButton()}</div>
          </div>
        </div>
      </div>
    );
  }
}
