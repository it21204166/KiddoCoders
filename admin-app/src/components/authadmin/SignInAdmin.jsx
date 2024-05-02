import React, { Component } from 'react'
import "./AuthAdmin.css";

class SignInAdmin extends Component {
  render() {
    return (
      <div>
        <div className='signup'>
        <img style={{width:"700px",height:"650px"}} className='register_boy' src='../../AdminLogin.png'/>
        <div className='image-container'>
        </div>
        <div className='form-containerr' style={{marginRight:"15%", backgroundColor:"white", marginBottom:"5%", borderRadius:"10px"}} >
        <h1 className="center-item" style={{fontFamily:"cursive", marginBottom:"10px"}}>ADMIN LOGIN</h1>
          <form action=''>
            <div className='input-container' style={{marginTop:"20px"}}>
              <label className='primary' style={{fontFamily:"cursive"}}>E-mail</label>
              <input type='text' className='form-inputSignin' style={{fontFamily:"cursive"}} name='supName' onChange={this.haddleInputChanges} placeholder='admin@gmail.com'/>
            </div>
            <div className='input-container'>
              <label className='primary' style={{fontFamily:"cursive"}}>Password</label>
              <input type='text' className='form-inputSignin' style={{fontFamily:"cursive"}} name='supName' onChange={this.haddleInputChanges} placeholder='admin Password'/>
            </div>
            <div className='input-container'>
            <a href='/ProfileAdmin'><button className='btn btn-successKiddo' type='button' style={{marginLeft:"35%", fontFamily:"cursive", borderRadius:"10px"}}>LOGIN</button></a>
            </div>
            <div className='input-container'>
              <h4 className='primary' style={{fontFamily:"cursive"}}>New Admin <a href='/SignUpAdmin'><button type='button' style={{fontFamily:"cursive", borderRadius:"10px"}}>Register</button></a></h4>
            </div>
          </form>
        </div>
      
      </div>
      </div>
    )
  }
}
export default SignInAdmin;