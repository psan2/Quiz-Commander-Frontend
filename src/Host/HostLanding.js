import React, { Component } from "react";
import { Link } from "react-router-dom";

export default class HostLanding extends Component {
  render() {
    return (
      <div>
        <div>
          <Link to="/questions">See your questions</Link>
        </div>
        <div>
          <Link to="/rounds">See your rounds</Link>
        </div>
        <div>
          <Link to="/quizzes">See your quizzes</Link>
        </div>
      </div>
    );
  }
}
