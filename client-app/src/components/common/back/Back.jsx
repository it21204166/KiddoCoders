import React, { Component } from "react";
import { withRouter } from "react-router-dom";

class Back extends Component {
  render() {
    const { title, location } = this.props;

    return (
      <>
        <section className='back'>
          <h2>Home / {location.pathname.split("/")[1]}</h2>
          <h1>{title}</h1>
        </section>
        <div className='margin'></div>
      </>
    );
  }
}

export default withRouter(Back);
