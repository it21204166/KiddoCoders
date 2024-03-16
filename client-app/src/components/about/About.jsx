import React, { Component } from "react";
import "./about.css";
import Back from "../common/back/Back";
import AboutCard from "./AboutCard";

class About extends Component {
  render() {
    return (
      <>
        <Back title='About Us' />
        <AboutCard />
      </>
    );
  }
}

export default About;
