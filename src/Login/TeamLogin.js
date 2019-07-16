import React from "react";

export default class TeamLoginComponent extends React.Component {
  render() {
    return (
      <div className="nav">
        <h1>Team Login</h1>
        <form>
          <label htmlFor="username">Username:</label>
          <input
            onChange={this.props.handleChange}
            id="username"
            type="text"
            name="username"
            value={this.props.username}
          />
          <label htmlFor="password">Password:</label>
          <input
            onChange={this.props.handleChange}
            id="password"
            type="password"
            name="password"
            value={this.props.password}
          />
          <button onClick={this.props.onLoginClicked}>Log in</button>
        </form>
      </div>
    );
  }
}
