import React, { Component } from "react";
import axios from 'axios';
import "./questions.css";

class Addquestions extends Component {
  constructor(props) {
    super(props);
    this.state = {
      FirstName: "",
      Email: "",
      Question: "",
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

  onSubmit() {
    const { FirstName, Email, Question } = this.state;
    const question = {
      F_Name: FirstName,
      Q_Email: Email,
      Q_Question: Question
    };

    axios.post("http://localhost:8000/tutorialPost/questionshow/post", question)
      .then((response) => {
        console.log("Success");
        this.setState({ errmsg: "Question Added Successfully!" });
      })
      .catch(error => {
        console.error("Error Occurred:", error);
        this.setState({ errmsg: "Something went wrong! Try Again" });
      });
  }

  render() {
    const { FirstName, Email, Question } = this.state;
    return (
      <div className='signup'>
        <div className='image-container'>
          <img style={{ width: "900px", height: "810px" }} className='register_boy' src='../../question.png' alt="Question" />
        </div>
        <div className='form-container'>
          <h1 className="center-item" style={{ fontFamily: "cursive", marginBottom: "35px", marginTop: "30px" }}>Any Question? </h1>
          <form>
            <div className='input-container'>
              <label className='primary' style={{ fontFamily: "cursive" }}>First Name</label>
              <input type='text' className='form-inputSignin' style={{ fontFamily: "cursive" }} name='FirstName' value={FirstName} onChange={this.handleInput} placeholder='First Name' />
            </div>
            <div className='input-container'>
              <label className='primary' style={{ fontFamily: "cursive" }}>E-mail</label>
              <input type='text' className='form-inputSignin' style={{ fontFamily: "cursive" }} name='Email' value={Email} onChange={this.handleInput} placeholder='E-mail' />
            </div>
            <div className='input-container'>
              <label className='primary' style={{ fontFamily: "cursive" }}>Question</label>
              <input type='text' className='form-inputSignin' style={{ fontFamily: "cursive" }} name='Question' value={Question} onChange={this.handleInput} placeholder='Enter the question' />
            </div>
            <div className='input-container'>
              <button type='button' style={{ marginLeft: "35%", fontFamily: "cursive", borderRadius: "10px" }} onClick={this.onSubmit}>Add Question</button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default Addquestions;
