import React, { Component } from "react";
import "./AuthAdmin.css";

class SignUpAdmin extends Component {
  render() {
    return (
      <div className='signup'>
        <div className='image-container'>
        <img style={{width:"900px",height:"695px"}} className='register_boy' src='../../adminregister.png'/>
        </div>
        <div className='form-containerr' style={{backgroundColor:"white", borderRadius:"10px", marginRight:"40px"}}>
        <h1 className="center-item" style={{fontFamily:"cursive", marginBottom:"35px", marginTop:"30px"}}>ADMIN REGISTER</h1>
          <form action=''>
            <div className='input-container' >
              <label className='primary' style={{fontFamily:"cursive"}}>Name</label>
              <input type='text' className='form-inputSignin' style={{fontFamily:"cursive"}} name='supName' onChange={this.haddleInputChanges} placeholder='Admin Name'/>
            </div>
            <div className='input-container'>
              <label className='primary' style={{fontFamily:"cursive"}}>Phone Number</label>
              <input type='text' className='form-inputSignin' style={{fontFamily:"cursive"}} name='supName' onChange={this.haddleInputChanges} placeholder='Admin Phone'/>
            </div>
            <div className='input-container'>
              <label className='primary' style={{fontFamily:"cursive"}}>E-mail</label>
              <input type='text' className='form-inputSignin' style={{fontFamily:"cursive"}} name='supName' onChange={this.haddleInputChanges} placeholder='admin@gmail.com'/>
            </div>
            <div className='input-container'>
              <label className='primary' style={{fontFamily:"cursive"}}>Age</label>
              <input type='text' className='form-inputSignin' style={{fontFamily:"cursive"}} name='supName' onChange={this.haddleInputChanges} placeholder='Admin Age'/>
            </div>
            <div className='input-container'>
              <label className='primary' style={{fontFamily:"cursive"}}>Password</label>
              <input type='text' className='form-inputSignin' style={{fontFamily:"cursive"}} name='supName' onChange={this.haddleInputChanges} placeholder='Admin Password'/>
            </div>
            <div className='input-container'>
            <a href='/'><button type='button' style={{marginLeft:"35%", fontFamily:"cursive", borderRadius:"10px"}}>REGISTER</button></a>
            </div>
            <div className='input-container'>
              <h4 className='primary' style={{fontFamily:"cursive"}}>Already have an account please <a href='/SignInAdmin'><button type='button' style={{fontFamily:"cursive", borderRadius:"10px"}}>Login</button></a></h4>
            </div>
          </form>
        </div>
      
      </div>
    );
  }
}

export default SignUpAdmin;
