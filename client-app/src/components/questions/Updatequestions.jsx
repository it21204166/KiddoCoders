import React, { Component } from "react";
import "./questions.css";

class Updatequestions extends Component {

  constructor(props){
    super(props)
    this.state = {
      
      FirstName: "",
      Email:"",
      Question:"", 
    }
    this.handleinput = this.handleinput.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
  }

  componentDidMount(){
    axios.get(`http://localhost:8000/tutorialGet/questionshow/getSpec/${this.state.id}`).then(res =>{
    if(res.data.success){
      this.setState({
        FirstName:res.data.existingDetails.F_Name,
        Email:res.data.existingDetails.Q_Email,
        Question:res.data.existingDetails.Q_Question,
        
        
      })
    }
  })
  }

  handleinput = (e) =>{
    const {value,name} = e.target
    this.setState({
      ...this.state, [name]:value
    })
  }

  onSubmit(){
    const { FirstName,Email,Question} = this.state
    const data = {
      F_Name:FirstName,
      Q_Email:Email,
      Q_Question:Question,
      
    }
    
    axios.put(`http://localhost:8000/tutorialPut/otherquestion/put/${this.state.id}`,data).then((response)=>{
      console.log("success updated")
      
    }).catch(error=>{
       console.error("Error:",error)
    })

  }
  render() {
    return (
      <div className='signup'>
        <div className='image-container'>
          <img style={{width:"900px",height:"795px"}} className='register_boy' src='../../question.png'/>
        </div>
        <div className='form-container' >
        <h1 className="center-item" style={{fontFamily:"cursive", marginBottom:"35px", marginTop:"30px"}}>Update the Question </h1>
          <form action=''>
            <div className='input-container' >
              <label className='primary' style={{fontFamily:"cursive"}}>First Name</label>
              <input type='text' className='form-inputSignin' style={{fontFamily:"cursive"}} name='supName' onChange={this.haddleInputChanges} placeholder='Edit Name'/>
            </div>
            <div className='input-container'>
              <label className='primary' style={{fontFamily:"cursive"}}>E-mail</label>
              <input type='text' className='form-inputSignin' style={{fontFamily:"cursive"}} name='supName' onChange={this.haddleInputChanges} placeholder='Edit mail '/>
            </div>
            <div className='input-container'>
              <label className='primary' style={{fontFamily:"cursive"}}>Question</label>
              <input type='text' className='form-inputSignin' style={{fontFamily:"cursive"}} name='supName' onChange={this.haddleInputChanges} placeholder='Edit the question'/>
            </div>
            <div className='input-container'>
            <a href='/'><button type='button' style={{marginLeft:"35%", fontFamily:"cursive", borderRadius:"10px"}}>Update Question</button></a>
            </div>
            
          </form>
        </div>
      </div>
    );
  }
}

export default Updatequestions;
