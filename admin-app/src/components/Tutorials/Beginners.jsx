import React, { Component } from "react";
import "./tuteAdmin.css";

class Beginners extends Component {
  render() {
    return (
      <div className='signup'>
        <div className='image-container'>
        <img style={{width:"900px",height:"795px"}} className='register_boy' src='../../beginners.jpeg'/>
        </div>
        <div className='form-container' >
        <h1 className="center-item" style={{fontFamily:"cursive", marginBottom:"35px", marginTop:"30px"}}>Manage Tutorial for Beginners</h1>
          <form action='' style={{border:"solid"}}>
            <div className='input-container' >
              <label className='primary' style={{fontFamily:"cursive"}}>TITLE</label>
              <input type='text' className='form-inputSignin' style={{fontFamily:"cursive"}} name='supName' onChange={this.haddleInputChanges} placeholder='Add a title'/>
            </div>
            <div className='input-container'>
              <label className='primary' style={{fontFamily:"cursive"}}>DESCRIPTION</label>
              <input type='text' className='form-inputSignin' style={{fontFamily:"cursive"}} name='supName' onChange={this.haddleInputChanges} placeholder='Add a desc'/>
            </div>
            <div className='input-container'>
              <label className='primary' style={{fontFamily:"cursive"}}>SYNTAX</label>
              <input type='text' className='form-inputSignin' style={{fontFamily:"cursive"}} name='supName' onChange={this.haddleInputChanges} placeholder='Add the syntax'/>
            </div>
            <div className='input-container'>
              <label className='primary' style={{fontFamily:"cursive"}}>EXAMPLE</label>
              <input type='text' className='form-inputSignin' style={{fontFamily:"cursive"}} name='supName' onChange={this.haddleInputChanges} placeholder='Example'/>
            </div>
            
            <div className='input-container'>
            <a href='/'><button type='button' style={{marginLeft:"35%", fontFamily:"cursive", borderRadius:"10px"}}>CREATE</button></a>
            </div>
            
          </form>
        </div>
      
      </div>
    );
  }
}

export default Beginners;
