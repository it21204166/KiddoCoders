import React, { Component } from "react";
import AboutCard from "../about/AboutCard";
import Hblog from "./Hblog";
import HAbout from "./HAbout";
import Hero from "./hero/Hero";
import Hprice from "./Hprice";
import Testimonial from "./testimonal/Testimonal"; // corrected the import name

class Home extends Component {
  render() {
    return (
      <>
        <Hero />
        <AboutCard />
        <HAbout />
        <Testimonial />
        <Hblog />
        <Hprice />
      </>
    );
  }
}

export default Home;
