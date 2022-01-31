import React, { Component } from "react";
import { RouteComponentProps } from "react-router-dom";

interface Props {}

class Message extends Component<RouteComponentProps<Props>> {
  render() {
    const { message } = this.props.location.state;

    return (
      <div className="pad-top-center container">
        <h4>{message}</h4>
      </div>
    );
  }
}

export default Message;
