import React, { Component } from "react";
import Head from "./Head";
import "./header.css";

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      click: false
    };
  }

  handleClick = () => {
    this.setState({ click: !this.state.click });
  };

  handleLinkClick = () => {
    this.setState({ click: false });
  };

  render() {
    const { click } = this.state;

    return (
      <>
        <Head />
        
        <header>
          <nav className='flexSB'>
            <ul className={click ? "mobile-nav" : "flexSB "} onClick={this.handleLinkClick}>
              <li>
                <a href='/' onClick={this.handleLinkClick}>Home</a>
              </li>
              <li>
                <a href='/courses' onClick={this.handleLinkClick}>Tutorials</a>
              </li>
              <li>
                <a href='/exersice' onClick={this.handleLinkClick}>Exercises</a>
              </li>
              <li>
                <a href='/challenge' onClick={this.handleLinkClick}>Challenges</a>
              </li>
              <li>
                <a href='/pricing' onClick={this.handleLinkClick}>Feedback</a>
              </li>
              <li>
                <a href='/journal' onClick={this.handleLinkClick}>About Us</a>
              </li>
              <li>
                <a href='/contact' onClick={this.handleLinkClick}>Contact</a>
              </li>
            </ul>
            
            <div className='start'>
              <div className='button'>GET CERTIFICATE</div>
            </div>
            <button className='toggle' onClick={this.handleClick}>
              {click ? <i className='fa fa-times'></i> : <i className='fa fa-bars'></i>}
            </button>
          </nav>
        </header>
      </>
    );
  }
}

export default Header;
