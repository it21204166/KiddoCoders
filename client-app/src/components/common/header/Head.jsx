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
              <i className='fab fa-facebook-f icon'></i>
              <i className='fab fa-instagram icon'></i>
              <i className='fab fa-twitter icon'></i>
              <i className='fab fa-youtube icon'></i>
            </div>
          </div>
        </section>
      </>
    );
  }
}

export default Head;
