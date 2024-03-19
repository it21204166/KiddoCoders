import React, { Component } from "react";

class Heading extends Component {
  render() {
    const { subtitle, title } = this.props;

    return (
      <>
        <div id='heading'>
          <h3>{subtitle}</h3>
          <h1>{title}</h1>
        </div>
      </>
    );
  }
}

export default Heading;
