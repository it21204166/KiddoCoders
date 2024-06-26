import React, { Component } from "react";
import axios from 'axios';
import "./tuteAdmin.css";


class Intermediate extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Title_i: "",
      Desc_i: "",
      Syntax_i: "",
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
    const { Title_i, Desc_i, Syntax_i } = this.state;
    const tutint = {
      Title_i: Title_i,
      Desc_i: Desc_i,
      Syntax_i: Syntax_i
    };

    axios.post("http://localhost:8000/tute2/addTut2", tutint)
      .then((response) => {
        console.log("Success");
        this.setState({ 
          successmsg : "Tute Added Successfully!",
          Title_i: "", 
          Desc_i: "",
          Syntax_i: ""
        });
      })
      .catch(error => {
        console.error("Error Occurred:", error);
        this.setState({ errmsg: "Something went wrong! Try Again" });
      });
  }

  render() {
    const { Title_i, Desc_i, Syntax_i, successmsg, errmsg } = this.state;
    return ( 
      <div>
      <div className='bg11'>
      
      <div style={{backgroundColor: "white"}} className='signup' >
        <div className='image-container'>
          <img style={{ width: "900px", height: "810px" }} className='register_boy' src='../../intermediate.jpeg' alt="Question" />
        </div>
        <div className='form-container'>
          <h1 className="center-item" style={{ fontFamily: "cursive", marginBottom: "35px", marginTop: "30px" }}>Create Tutorial For Intermediates </h1>
          <form onSubmit={this.onSubmit}> 
            <div className='input-container'>
              <label className='primary' style={{ fontFamily: "cursive" }}>Title</label>
              <input type='text' className='form-inputSignin' style={{ fontFamily: "cursive" }} name='Title_i' value={Title_i} onChange={this.handleInput} placeholder='Title' />
            </div>
            <div className='input-container'>
              <label className='primary' style={{ fontFamily: "cursive" }}>Description</label>
              <input type='text' className='form-inputSignin' style={{ fontFamily: "cursive" }} name='Desc_i' value={Desc_i} onChange={this.handleInput} placeholder='Description'  />
            </div>
            <div className='input-container'>
              <label className='primary' style={{ fontFamily: "cursive" }}>Syntax</label>
              <input type='text' className='form-inputSignin' style={{ fontFamily: "cursive" }} name='Syntax_i' value={Syntax_i} onChange={this.handleInput} placeholder='Syntax' />
            </div>
            <div className='input-container'>
            <button type='submit' style={{ marginLeft: "35%", fontFamily: "cursive", borderRadius: "10px" , backgroundColor: "#1eb2a6", color: "white"}}>Create</button>
            
            </div>


          </form>

          
          {successmsg && <p style={{ color: "green", fontFamily: "cursive" }}>{successmsg}</p>}
          {errmsg && <p style={{ color: "red", fontFamily: "cursive" }}>{errmsg}</p>} 
        </div>
      </div>
      </div>
      </div>
      
    );
  }
}

export default Intermediate;
