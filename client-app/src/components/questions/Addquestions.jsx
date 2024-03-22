import React, { Component } from "react";
import axios from 'axios';
import "./questions.css";

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
    
      <div className='signup'>
        <div className='image-container'>
          <img style={{ width: "900px", height: "810px" }} className='register_boy' src='../../question.png' alt="Question" />
        </div>
        <div className='form-container'>
          <h1 className="center-item" style={{ fontFamily: "cursive", marginBottom: "35px", marginTop: "30px" }}>Any Question? </h1>
          <form onSubmit={this.onSubmit}> {/* Attach onSubmit handler to form */}
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
            <button type='submit' style={{ marginLeft: "35%", fontFamily: "cursive", borderRadius: "10px" }}>Add Question</button>
            
            </div>


          </form>

          <a href="displayquestions"><button type='' style={{ marginLeft: "20%", fontFamily: "cursive", borderRadius: "10px" }}>View</button></a>
          {successmsg && <p style={{ color: "green", fontFamily: "cursive" }}>{successmsg}</p>}
          {errmsg && <p style={{ color: "red", fontFamily: "cursive" }}>{errmsg}</p>} {/* Display error message */}
        </div>
      </div>
      
    );
  }
}

export default Addquestions;
