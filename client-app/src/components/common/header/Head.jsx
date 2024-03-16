import React, { Component } from "react";

class Head extends Component {
  render() {
    return (
      <>
        <section className='head'>
          <div className='container flexSB'>
            <div className='logo'>
              <h1>{"<KIDDO/CODERS>"}</h1>
              <span>ONLINE EDUCATION & LEARNING</span>
            </div>

            <div className='social'>
              <i className='fas fa-sign-in-alt icon' title="Login"></i>
              
            </div>
          </div>
        </section>
      </>
    );
  }
}

export default Head;
