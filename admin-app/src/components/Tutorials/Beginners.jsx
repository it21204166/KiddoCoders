import React, { Component } from "react";
import axios from 'axios';
import "./tuteAdmin.css";


class Beginners extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Title: "",
      Desc: "",
      Syntax: "",
      successmsg:"",
      errmsg: ""
    };
    this.handleInput = this.handleInput.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  handleInput(event) {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  }

  onSubmit(event) {
    event.preventDefault(); 
    const { Title, Desc, Syntax } = this.state;
    const tutbeg = {
      Title: Title,
      Desc: Desc,
      Syntax: Syntax
    };

    axios.post("http://localhost:8000/tute/addTut", tutbeg)
      .then((response) => {
        console.log("Success");
        this.setState({ 
          successmsg : "Tute Added Successfully!",
          Title: "", 
          Desc: "",
          Syntax: ""
        });
      })
      .catch(error => {
        console.error("Error Occurred:", error);
        this.setState({ errmsg: "Something went wrong! Try Again" });
      });
  }

  render() {
    const { Title, Desc, Syntax, successmsg, errmsg } = this.state;
    return ( 
      <div>
      <div className='bg11'>
      
      <div style={{backgroundColor: "white"}} className='signup' >
        <div className='image-container'>
          <img style={{ width: "900px", height: "810px" }} className='register_boy' src='../../beginners.jpeg' alt="Question" />
        </div>
        <div className='form-container'>
          <h1 className="center-item" style={{ fontFamily: "cursive", marginBottom: "35px", marginTop: "30px" }}>Create Tutorial For Beginners </h1>
          <form onSubmit={this.onSubmit}> 
            <div className='input-container'>
              <label className='primary' style={{ fontFamily: "cursive" }}>Title</label>
              <input type='text' className='form-inputSignin' style={{ fontFamily: "cursive" }} name='Title' value={Title} onChange={this.handleInput} placeholder='Title' />
            </div>
            <div className='input-container'>
              <label className='primary' style={{ fontFamily: "cursive" }}>Description</label>
              <input type='text' className='form-inputSignin' style={{ fontFamily: "cursive" }} name='Desc' value={Desc} onChange={this.handleInput} placeholder='Description'  />
            </div>
            <div className='input-container'>
              <label className='primary' style={{ fontFamily: "cursive" }}>Syntax</label>
              <input type='text' className='form-inputSignin' style={{ fontFamily: "cursive" }} name='Syntax' value={Syntax} onChange={this.handleInput} placeholder='Syntax' />
            </div>
            <div className='input-container'>
            <button type='submit' style={{ marginLeft: "35%", fontFamily: "cursive", borderRadius: "10px" , backgroundColor: "#1eb2a6", color: "white"}}>Create</button>
            
            </div>


          </form>

          
          {successmsg && <p style={{ color: "green", fontFamily: "cursive" }}>{successmsg}</p>}
          {errmsg && <p style={{ color: "red", fontFamily: "cursive" }}>{errmsg}</p>} {/* Display error message */}
        </div>
      </div>
      </div>
      </div>
      
    );
  }
}

export default Beginners;
