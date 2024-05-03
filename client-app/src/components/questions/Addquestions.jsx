import React, { Component } from "react";
import axios from 'axios';
import "./questions.css";
import HeaderToPage from "../common/header/HeaderToPage";
import { message } from "antd"; 


class Addquestions extends Component {
  constructor(props) {
    super(props);
    this.state = {
      F_Name: "",
      Q_Email: "",
      Q_Question: "",
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

  onFinish = async (event) => {
    event.preventDefault();
    const { formData } = this.state;
    const emailRegex = /^[A-Za-z0-9._%-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/;
    if (!emailRegex.test(formData.Q_Email)) {
      message.error("Please enter a valid email.");
      return;
    }
  }

  onSubmit(event) {
    event.preventDefault(); 
    const { F_Name, Q_Email, Q_Question } = this.state;
    const question = {
      F_Name: F_Name,
      Q_Email: Q_Email,
      Q_Question: Q_Question
    };

    axios.post("http://localhost:8000/ques/addQues", question)
      .then((response) => {
        console.log("Success");
        this.setState({ 
          successmsg : "Question Added Successfully!",
          F_Name: "", 
          Q_Email: "",
          Q_Question: ""
        });
      })
      .catch(error => {
        console.error("Error Occurred:", error);
        this.setState({ errmsg: "Something went wrong! Try Again" });
      });
  }

  render() {
    const { F_Name, Q_Email, Q_Question, successmsg, errmsg } = this.state;
    return ( 
      <div>
      <div className='bg11'>
      <HeaderToPage/>
      <div style={{backgroundColor: "white"}} className='signup' >
        <div className='image-container'>
          <img style={{ width: "900px", height: "810px" }} className='register_boy' src='../../question.png' alt="Question" />
        </div>
        <div className='form-container'>
          <h1 className="center-item" style={{ fontFamily: "cursive", marginBottom: "35px", marginTop: "30px" }}>Any Question? </h1>
          <form onSubmit={this.onSubmit}> 
            <div className='input-container'>
              <label className='primary' style={{ fontFamily: "cursive" }}>First Name</label>
              <input type='text' className='form-inputSignin' style={{ fontFamily: "cursive" }} name='F_Name' value={F_Name} onChange={this.handleInput} placeholder='First Name' />
            </div>
            <div className='input-container'>
              <label className='primary' style={{ fontFamily: "cursive" }}>E-mail</label>
              <input type='email' className='form-inputSignin' style={{ fontFamily: "cursive" }} name='Q_Email' value={Q_Email} onChange={this.handleInput} placeholder='E-mail'  />
            </div>
            <div className='input-container'>
              <label className='primary' style={{ fontFamily: "cursive" }}>Question</label>
              <input type='text' className='form-inputSignin' style={{ fontFamily: "cursive" }} name='Q_Question' value={Q_Question} onChange={this.handleInput} placeholder='Enter the question' />
            </div>
            <div className='input-container'>
            <button type='submit' style={{ marginLeft: "35%", fontFamily: "cursive", borderRadius: "10px" , backgroundColor: "#1eb2a6", color: "white"}}>Add Question</button>
            
            </div>


          </form>

          <a href="displayquestions"><button type='' style={{ marginLeft: "20%", marginTop: "7px" ,fontFamily: "cursive", borderRadius: "10px", backgroundColor: "#1eb2a6", color: "white" }}>View</button></a>
          {successmsg && <p style={{ color: "green", fontFamily: "cursive" }}>{successmsg}</p>}
          {errmsg && <p style={{ color: "red", fontFamily: "cursive" }}>{errmsg}</p>} {/* Display error message */}
        </div>
      </div>
      </div>
      </div>
      
    );
  }
}

export default Addquestions;
