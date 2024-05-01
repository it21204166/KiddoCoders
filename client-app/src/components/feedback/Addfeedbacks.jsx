import React, { Component } from "react";
import axios from 'axios';
import "./feedback.css";
import HeaderToPage from "../common/header/HeaderToPage";


class Addfeedbacks extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Fu_Name: "",
      F_Email: "",
      F_Visit: "",
      F_Service: "",
      F_Feedback: "",
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
    const { Fu_Name, F_Email, F_Visit, F_Service, F_Feedback } = this.state;
    const feedback = {
      Fu_Name: Fu_Name,
      F_Email: F_Email,
      F_Visit: F_Visit,
      F_Service: F_Service,
      F_Feedback: F_Feedback
    };

    axios.post("http://localhost:8000/feed/addFeed", feedback)
      .then((response) => {
        console.log("Success");
        this.setState({ 
          successmsg : "The feedback Added Successfully!",
          Fu_Name: "", 
          F_Email: "",
          F_Visit: "",
          F_Service: "",
          F_Feedback: ""
        });
      })
      .catch(error => {
        console.error("Error Occurred:", error);
        this.setState({ errmsg: "Invalid! Try Again" });
      });
  }

  render() {
    const { Fu_Name, F_Email, F_Visit, F_Service, F_Feedback, successmsg, errmsg } = this.state;
    return (
      <div>
      <div className='bg11'>
      <HeaderToPage/>
      <div style={{backgroundColor: "white"}}className='signup'>
        <div className='image-container'>
          <img style={{ width: "900px", height: "810px" }} className='register_boy' src='../../feedback.png' alt="Feedback" />
        </div>
        <div className='form-container'>
          <h1 className="center-item" style={{ fontFamily: "cursive", marginBottom: "35px", marginTop: "30px" }}>FEEDBACK </h1>
          <form onSubmit={this.onSubmit}> {/* Attach onSubmit handler to form */}
            <div className='input-container'>
              <label className='primary' style={{ fontFamily: "cursive" }}> Name</label>
              <input type='text' className='form-inputSignin' style={{ fontFamily: "cursive" }} name='Fu_Name' value={Fu_Name} onChange={this.handleInput} placeholder='Name' />
            </div>
            <div className='input-container'>
              <label className='primary' style={{ fontFamily: "cursive" }}>E-mail</label>
              <input type='email' className='form-inputSignin' style={{ fontFamily: "cursive" }} name='F_Email' value={F_Email} onChange={this.handleInput} placeholder='E-mail'  />
            </div>
            <div className='input-container'>
              <label className='primary' style={{ fontFamily: "cursive" }}>Is this the first time you have visited</label>
              <select className='form-select' style={{ fontFamily: "cursive" }} name='F_Visit' value={F_Visit} onChange={this.handleInput} placeholder='E-mail'  >
              <option>Yes</option>
              <option>No</option>
              </select>
            </div>
            <div className='input-container'>
              <label className='primary' style={{ fontFamily: "cursive" }}>Rate our service</label>
              <select className='form-select' style={{ fontFamily: "cursive" }} name='F_Service' value={F_Service} onChange={this.handleInput} placeholder='E-mail' >
              <option>Excellent</option>
              <option>Good</option>
              <option>Average</option>
              <option>Not Satisfying</option>
              </select>
            </div>
            <div className='input-container'>
              <label className='primary' style={{ fontFamily: "cursive" }}>Feeback</label>
              <input type='text' className='form-inputSignin' style={{ fontFamily: "cursive" }} name='F_Feedback' value={F_Feedback} onChange={this.handleInput} placeholder='Enter the question' />
            </div>
            <div className='input-container'>
            <button type='submit' style={{ marginLeft: "35%", fontFamily: "cursive", borderRadius: "10px", backgroundColor: "#1eb2a6" , color: "white"}}>Submit</button>
            
            </div>



          </form>

          <a href="displayfeedback2"><button type='' style={{ marginLeft: "10%", marginTop: "7px", fontFamily: "cursive", borderRadius: "10px" , backgroundColor: "#1eb2a6", color:"white" }}>View</button></a>
          {successmsg && <p style={{ color: "green", fontFamily: "cursive" }}>{successmsg}</p>}
          {errmsg && <p style={{ color: "red", fontFamily: "cursive" }}>{errmsg}</p>} {/* Display error message */}
        </div>
      </div>
      </div>
      </div>
    );
  }
}

export default Addfeedbacks;
