import React, { Component } from "react";
import "./feedback.css";
import axios from 'axios';

class Updatefeedbacks extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: this.props.match.params.id, 
      Fu_Name: "",
      F_Email: "",
      F_Visit: "",
      F_Service: "",
      F_Feedback: ""
      
    };
  }

  componentDidMount() {
    const { id } = this.state;
    this.fetchItem(id);
  }

  fetchItem = async (id) => {
    const result = await axios.get(`http://localhost:8000/feed/getFeed/${id}`);
    const item = result.result;
    this.setState({
      Fu_Name: item.Fu_Name,
      F_Email: item.F_Email,
      F_Visit: item.F_Visit,
      F_Service: item.F_Service,
      F_Feedback: item.F_Feedback
    });
  }

  handleInput = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  onSubmit = async (e) => {
    const { id, Fu_Name, F_Email, F_Visit, F_Service, F_Feedback } = this.state;
    const Updatedata = {
      Fu_Name,
      F_Email,
      F_Visit,
      F_Service,
      F_Feedback
    };
    await axios.put(`http://localhost:8000/feed/editFeed/${id}`, Updatedata)
      .then(response => {
        console.log("success updated");
        this.props.history.push("/displayfeedbacks");
        window.location.reload()
      }).catch(error => {
        console.error("Error:", error);
      });
  };

  render() {
    const { Fu_Name, F_Email, F_Visit, F_Service,F_Feedback } = this.state;
    return (
      <div className='signup'>
        <div className='image-container'>
          <img style={{ width: "900px", height: "810px" }} className='register_boy' src='../../feedback.png' alt="Feedback"/>
        </div>
        <div className='form-container'>
          <h1 className="center-item" style={{ fontFamily: "cursive", marginBottom: "35px", marginTop: "30px" }}>Change your mind</h1>
          <form>
            <div className='input-container'>
              <label className='primary' style={{ fontFamily: "cursive" }}>Name</label>
              <input type='text' className='form-inputSignin' style={{ fontFamily: "cursive" }} name='Fu_Name' value={Fu_Name} onChange={this.handleInput} placeholder='Edit Name' />
            </div>
            <div className='input-container'>
              <label className='primary' style={{ fontFamily: "cursive" }}>E-mail</label>
              <input type='text' className='form-inputSignin' style={{ fontFamily: "cursive" }} name='F_Email' value={F_Email} onChange={this.handleInput} placeholder='Edit mail' />
            </div>
            <div className='input-container'>
              <label className='primary' style={{ fontFamily: "cursive" }}>Is this the first time you have visited</label>
              <select className='form-select' style={{ fontFamily: "cursive" }} name='F_Visit' value={F_Visit} onChange={this.handleInput} placeholder=''  >
              <option>Yes</option>
              <option>No</option>
              </select>
            </div>
            <div className='input-container'>
              <label className='primary' style={{ fontFamily: "cursive" }}>Rate our service</label>
              <select className='form-select' style={{ fontFamily: "cursive" }} name='F_Service' value={F_Service} onChange={this.handleInput} placeholder='' >
              <option>Excellent</option>
              <option>Good</option>
              <option>Average</option>
              <option>Not Satisfying</option>
              </select>
            </div>
            <div className='input-container'>
              <label className='primary' style={{ fontFamily: "cursive" }}>Feedback</label>
              <input type='text' className='form-inputSignin' style={{ fontFamily: "cursive" }} name='F_Feedback' value={F_Feedback} onChange={this.handleInput} placeholder='Edit the feedback' />
            </div>
            <div className='input-container'>
              <button type='button' onClick={this.onSubmit} style={{ marginLeft: "35%", fontFamily: "cursive", borderRadius: "10px" }}>Update Feedback</button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default Updatefeedbacks;
