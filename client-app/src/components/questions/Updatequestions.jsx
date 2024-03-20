import React, { Component } from "react";
import "./questions.css";
import axios from 'axios';

class Updatequestions extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: this.props.match.params.id, // Extract id from props
      F_Name: "",
      Q_Email: "",
      Q_Question: ""
      
    };
  }

  componentDidMount() {
    const { id } = this.state;
    this.fetchItem(id);
  }

  fetchItem = async (id) => {
    const result = await axios.get(`http://localhost:8000/ques/getQues/${id}`);
    const item = result.data.result;
    this.setState({
      F_Name: item.F_Name,
      Q_Email: item.Q_Email,
      Q_Question: item.Q_Question
    });
  }

  handleInput = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  onSubmit = async (e) => {
    const { id, F_Name, Q_Email, Q_Question } = this.state;
    const Updatedata = {
      F_Name,
      Q_Email,
      Q_Question
    };
    await axios.put(`http://localhost:8000/ques/editQues/${id}`, Updatedata)
      .then(response => {
        console.log("success updated");
        this.props.history.push("/displayquestions");
        window.location.reload()
      }).catch(error => {
        console.error("Error:", error);
      });
  };

  render() {
    const { F_Name, Q_Email, Q_Question } = this.state;
    return (
      <div className='signup'>
        <div className='image-container'>
          <img style={{ width: "900px", height: "795px" }} className='register_boy' src='../../question.png' alt="Question"/>
        </div>
        <div className='form-container'>
          <h1 className="center-item" style={{ fontFamily: "cursive", marginBottom: "35px", marginTop: "30px" }}>Update the Question </h1>
          <form>
            <div className='input-container'>
              <label className='primary' style={{ fontFamily: "cursive" }}>First Name</label>
              <input type='text' className='form-inputSignin' style={{ fontFamily: "cursive" }} name='F_Name' value={F_Name} onChange={this.handleInput} placeholder='Edit Name' />
            </div>
            <div className='input-container'>
              <label className='primary' style={{ fontFamily: "cursive" }}>E-mail</label>
              <input type='text' className='form-inputSignin' style={{ fontFamily: "cursive" }} name='Q_Email' value={Q_Email} onChange={this.handleInput} placeholder='Edit mail' />
            </div>
            <div className='input-container'>
              <label className='primary' style={{ fontFamily: "cursive" }}>Question</label>
              <input type='text' className='form-inputSignin' style={{ fontFamily: "cursive" }} name='Q_Question' value={Q_Question} onChange={this.handleInput} placeholder='Edit the question' />
            </div>
            <div className='input-container'>
              <button type='button' onClick={this.onSubmit} style={{ marginLeft: "35%", fontFamily: "cursive", borderRadius: "10px" }}>Update Question</button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default Updatequestions;
