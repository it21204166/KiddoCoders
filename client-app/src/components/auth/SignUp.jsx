import React, { Component } from "react";
import "./auth.css";

class Signup extends Component {
  render() {
    return (
      <div className='signup'>
        <div className='image-container'>
          <img style={{width:"900px",height:"695px"}} className='register_boy' src='../../register.png'/>
        </div>
        <div className='form-container' >
        <h1 className="center-item" style={{fontFamily:"cursive", marginBottom:"35px", marginTop:"30px"}}>REGISTER</h1>
          <form action=''>
            <div className='input-container' >
              <label className='primary' style={{fontFamily:"cursive"}}>Full Name</label>
              <input type='text' className='form-inputSignin' style={{fontFamily:"cursive"}} name='supName' onChange={this.haddleInputChanges} placeholder='kiddo Name'/>
            </div>
            <div className='input-container'>
              <label className='primary' style={{fontFamily:"cursive"}}>Phone Number</label>
              <input type='text' className='form-inputSignin' style={{fontFamily:"cursive"}} name='supName' onChange={this.haddleInputChanges} placeholder='kiddo Phone'/>
            </div>
            <div className='input-container'>
              <label className='primary' style={{fontFamily:"cursive"}}>E-mail</label>
              <input type='text' className='form-inputSignin' style={{fontFamily:"cursive"}} name='supName' onChange={this.haddleInputChanges} placeholder='kiddo@gmail.com'/>
            </div>
            <div className='input-container'>
              <label className='primary' style={{fontFamily:"cursive"}}>Age</label>
              <input type='text' className='form-inputSignin' style={{fontFamily:"cursive"}} name='supName' onChange={this.haddleInputChanges} placeholder='kiddo Age'/>
            </div>
            <div className='input-container'>
              <select className='form-select' name='supType' style={{fontFamily:"cursive"}} onChange={this.haddleInputChanges} >
                <option>kiddo Country</option>
                <option>Sri Lanka</option>
                <option>India</option>
                <option>Canada</option>
                <option>Australia</option>
                <option>Newseland</option>
                <option>England</option>
              </select>
              </div>
            <div className='input-container'>
              <label className='primary' style={{fontFamily:"cursive"}}>Password</label>
              <input type='text' className='form-inputSignin' style={{fontFamily:"cursive"}} name='supName' onChange={this.haddleInputChanges} placeholder='kiddo Password'/>
            </div>
            <div className='input-container'>
            <a href='/'><button type='button' style={{marginLeft:"35%", fontFamily:"cursive", borderRadius:"10px"}}>REGISTER</button></a>
            </div>
            <div className='input-container'>
              <h4 className='primary' style={{fontFamily:"cursive"}}>Already have an account please <a href='/SignIn'><button type='button' style={{fontFamily:"cursive", borderRadius:"10px"}}>Login</button></a></h4>
            </div>
          </form>
        </div>
      
      </div>
    );
  }
}

export default Signup;
