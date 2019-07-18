import React from "react";

export default class Signup extends React.Component {
  render() {
    return (
      <div className="nav">
        <h1>{this.props.capitalize(this.props.persona)} Signup</h1>
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
          <label htmlFor="password">Password:</label>
          <input
            onChange={this.props.handleChange}
            id="password"
            type="password"
            name="password"
            value={this.props.password}
          />
          <div>
            <label>Re-enter your password:</label>
            <input
              onChange={this.props.handleChange}
              id="password_confirm"
              type="password_confirm"
              name="password_confirm"
              value={this.props.password_confirm}
            />
          </div>
          <div>
            <label>Email:</label>
            <input
              onChange={this.props.handleChange}
              id="email"
              type="email"
              name="email"
              value={this.props.email}
            />
          </div>
          <div>
            <button onClick={this.props.onLoginClicked}>Sign Up</button>
          </div>
        </form>
      </div>
    );
  }
}
