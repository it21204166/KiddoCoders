import React, { Component } from "react";
import "./AuthAdmin.css";

class ProfileAdmin extends Component {
  render() {
    return(
      <div className='signup'>
        <div className='image-containerprofile'>
        <img style={{width:"450px",height:"650px", marginLeft:"5%"}}  src='../../adminprofile.png'/>
        </div>
        <div className='form-containerprofile' style={{border:"solid", backgroundColor:"#f2f2f2", borderRadius:"10PX", marginTop:"1%", marginRight:"8%", marginBottom:"20px"}}>
        <h1 className="center-item" style={{fontFamily:"cursive",marginBottom:"35px", marginTop:"30px"}}>EDIT ADMIN PROFILE</h1>
        <form>
          <br></br>
            <div className='input-container'>
              <label className='primary' style={{backgroundColor:"#f2f2f2", fontFamily:"cursive"}}>Full Name</label>
              <input type='text' className='form-inputSignin' style={{fontFamily:"cursive", backgroundColor:"#f2f2f2"}} name='supName' onChange={this.haddleInputChanges} placeholder='admin Name'/>
            </div>
            <div className='input-container'>
              <label className='primary' style={{backgroundColor:"#f2f2f2", fontFamily:"cursive"}}>Phone Number</label>
              <input type='text' className='form-inputSignin' style={{fontFamily:"cursive",backgroundColor:"#f2f2f2"}} name='supName' onChange={this.haddleInputChanges} placeholder='admin Phone'/>
            </div>
            <div className='input-container'>
              <label className='primary'style={{backgroundColor:"#f2f2f2", fontFamily:"cursive"}}>Age</label>
              <input type='text' className='form-inputSignin' style={{backgroundColor:"#f2f2f2",fontFamily:"cursive"}} name='supName' onChange={this.haddleInputChanges} placeholder='admin Age'/>
            </div>
              <div className='input-container' style={{marginTop:'20px'}}>
              <label className='primary' style={{backgroundColor:"#f2f2f2", fontFamily:"cursive"}}>Upload Profile Photo</label>
              <input type='file' className='form-inputSignin' style={{fontFamily:"cursive", height:"50px"}} name='profilePhoto' onChange={this.handlePhotoUpload}/>
              </div>
            <div className='input-container'>
            <a href='/'><button className="btn btn-successKiddo" type='button' style={{marginLeft:"40%", fontFamily:"cursive", marginRight:"40%", borderRadius:"10px"}} >SAVE</button></a>
            </div>
          </form>
        </div>

      </div>
    )
  }
}
export default ProfileAdmin;