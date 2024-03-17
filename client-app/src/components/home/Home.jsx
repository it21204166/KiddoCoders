import React, { Component } from "react";
import HomeMain from "../home/HomeMain"
import Header from "../common/header/Header";
import Footer from "../common/footer/Footer";
// corrected the import name

class Home extends Component {
  render() {
    return (
      <>
      <Header />
       <HomeMain/> 
       <Footer />
      </>
    );
  }
}

export default Home;
