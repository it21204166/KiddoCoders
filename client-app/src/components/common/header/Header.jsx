import React, { Component } from "react";
import { Link } from "react-router-dom";
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
                <Link to='/' onClick={this.handleLinkClick}>Home</Link>
              </li>
              <li>
                <Link to='/courses' onClick={this.handleLinkClick}>Tutorials</Link>
              </li>
              <li>
                <Link to='/about' onClick={this.handleLinkClick}>Exercises</Link>
              </li>
              <li>
                <Link to='/team' onClick={this.handleLinkClick}>Quizes</Link>
              </li>
              <li>
                <Link to='/pricing' onClick={this.handleLinkClick}>Feedback</Link>
              </li>
              <li>
                <Link to='/journal' onClick={this.handleLinkClick}>About Us</Link>
              </li>
              <li>
                <Link to='/contact' onClick={this.handleLinkClick}>Contact</Link>
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
