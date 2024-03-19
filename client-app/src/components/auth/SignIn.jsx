import React, { Component } from 'react'
import "./auth.css";

class SignIn extends Component {
  render() {
    return (
      <div>
        <div className='signup'>
        <div className='image-container'>
          <img style={{width:"900px",height:"695px"}} className='register_boy' src='../../register.png'/>
        </div>
        <div className='form-container' >
        <h1 className="center-item" style={{fontFamily:"cursive", marginBottom:"30px"}}>LOGIN</h1>
          <form action=''>
            <div className='input-container'>
              <label className='primary' style={{fontFamily:"cursive"}}>E-mail</label>
              <input type='text' className='form-inputSignin' style={{fontFamily:"cursive"}} name='supName' onChange={this.haddleInputChanges} placeholder='kiddo@gmail.com'/>
            </div>
            <div className='input-container'>
              <label className='primary' style={{fontFamily:"cursive"}}>Password</label>
              <input type='text' className='form-inputSignin' style={{fontFamily:"cursive"}} name='supName' onChange={this.haddleInputChanges} placeholder='kiddo Password'/>
            </div>
            <div className='input-container'>
            <a href='/ProfileKiddo'><button type='button' style={{marginLeft:"35%", fontFamily:"cursive", borderRadius:"10px"}}>LOGIN</button></a>
            </div>
            <div className='input-container'>
              <h4 className='primary' style={{fontFamily:"cursive"}}>Do not have an Account please <a href='/SignUp'><button type='button' style={{fontFamily:"cursive", borderRadius:"10px"}}>Register</button></a></h4>
            </div>
          </form>
        </div>
      
      </div>
      </div>
    )
  }
}
export default SignIn;