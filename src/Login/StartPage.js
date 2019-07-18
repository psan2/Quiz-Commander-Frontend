import React, { Component } from "react";
import api from "../API/Connection";
import Login from "./Login";
import Signup from "./Signup";

export default class StartPage extends Component {
  state = {
    persona: "hosts",
    username: "",
    password: "",
    loginSignup: "login"
  };

  capitalize = s => {
    return s.charAt(0).toUpperCase() + s.slice(1);
  };

  handleChange = e => {
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
          alert("something is wrong with your credentials");
          this.setState({ username: "", password: "" });
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
      .login(this.state.username, this.state.password, this.state.persona)
      .then(data => {
        if (data.error) {
          alert("something is wrong with your credentials");
          this.setState({ username: "", password: "" });
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
        />
      );
    } else if (this.state.persona && this.state.loginSignup === "signup") {
      return (
        <Signup
          capitalize={this.capitalize}
          persona={this.state.persona}
          handleChange={this.handleChange}
        />
      );
    }
  };

  renderPrompt = () => {
    if (this.state.loginSignup) {
      return (
        <div>
          <div>
            {this.capitalize(this.state.loginSignup)} as:
            <select onChange={this.handleChange} name="persona" id="persona">
              <option value="hosts">Host</option>
              <option value="teams">Team</option>
            </select>
            {this.renderLoginOrSignupPrompt()}
          </div>
        </div>
      );
    }
  };

  render() {
    return (
      <div>
        <div onClick={() => this.setState({ loginSignup: "login" })}>Login</div>
        <div onClick={() => this.setState({ loginSignup: "signup" })}>
          Signup
        </div>
        {this.renderPrompt()}
      </div>
    );
  }
}