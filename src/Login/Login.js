import React from "react";

export default class Login extends React.Component {
  render() {
    return (
      <div>
        <h1>{this.props.capitalize(this.props.persona)} Login</h1>
        <form>
          <div>
            <label htmlFor="username">Username:</label>
            <input
              onChange={this.props.handleChange}
              id="username"
              type="text"
              name="username"
              value={this.props.username}
            />
          </div>
          <div>
            <label htmlFor="password">Password:</label>
            <input
              onChange={this.props.handleChange}
              id="password"
              type="password"
              name="password"
              value={this.props.password}
            />
          </div>
          <div>
            <button onClick={this.props.onLoginClicked}>Log in</button>
          </div>
        </form>
      </div>
    );
  }
}
