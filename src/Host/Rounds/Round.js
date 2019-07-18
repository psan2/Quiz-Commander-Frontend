import React, { Component } from "react";
import { Link } from "react-router-dom";

export default class Round extends Component {
  render() {
    return (
      <div>
        {this.props.round.nickname}
        <Link to={`/edit-round/${this.props.round.id}`}>Edit this round</Link>
      </div>
    );
  }
}
