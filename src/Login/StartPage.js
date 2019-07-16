import React, { Component } from "react";
import api from "../API/Connection";
import HostLoginComponent from "../Login/HostLogin";
import TeamLoginComponent from "../Login/TeamLogin";

export default class StartPage extends Component {
  state = { persona: "", username: "", password: "" };

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

  personaSelection = () => {
    if (this.state.persona === "hosts") {
      return (
        <HostLoginComponent
          onLoginClicked={this.onLoginClicked}
          handleChange={this.handleChange}
        />
      );
    } else if (this.state.persona === "teams") {
      return (
        <TeamLoginComponent
          onLoginClicked={this.onLoginClicked}
          handleChange={this.handleChange}
        />
      );
    }
  };

  render() {
    return (
      <div>
        Log in as a:
        <select onChange={this.handleChange} name="persona" id="persona">
          <option value="" />
          <option value="hosts">Host</option>
          <option value="teams">Team</option>
        </select>
        {this.personaSelection()}
      </div>
    );
  }
}
