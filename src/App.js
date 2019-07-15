import React from "react";
import "./App.css";
import api from "./constants/api";
import HostLoginComponent from "./components/HostLoginComponent";
import TeamLoginComponent from "./team_components/TeamLoginComponent";

class App extends React.Component {
  state = {
    logged_in: "",
    persona: "",
    username: "",
    password: ""
  };

  componentDidMount() {
    const token = localStorage.getItem("token");
    if (token) {
      api.getCurrentUser(token, this.state.persona).then(user => {
        this.setState({
          logged_in: this.state.persona,
          username: user.username
        });
      });
    }
  }

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
          this.setState({
            logged_in: this.state.persona,
            username: data.username
          });
        }
      });
  };

  handleLogOut = () => {
    localStorage.clear("token");
    this.setState({
      logged_in: "",
      username: "",
      password: ""
    });
  };

  personaSelection = () => {
    if (this.state.persona === "host") {
      return (
        <HostLoginComponent
          logged_in={this.state.logged_in}
          onLoginClicked={this.onLoginClicked}
          handleLogOut={this.handleLogOut}
          host_username={this.state.username}
          handleChange={this.handleChange}
          password={this.state.password}
        />
      );
    } else if (this.state.persona === "team") {
      return (
        <TeamLoginComponent
          logged_in={this.state.logged_in}
          onLoginClicked={this.onLoginClicked}
          handleLogOut={this.handleLogOut}
          host_username={this.state.username}
          handleChange={this.handleChange}
          password={this.state.password}
        />
      );
    }
  };

  render() {
    return (
      <div className="App">
        <h1>Quiz Commander</h1>
        Log in as a:
        <select onChange={this.handleChange} name="persona" id="persona">
          <option value="" />
          <option value="host">Host</option>
          <option value="team">Team</option>
        </select>
        {this.personaSelection()}
      </div>
    );
  }
}

export default App;
