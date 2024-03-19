import React, { Component } from "react";
import "./auth.css";

class ProfileKiddo extends Component {
  render() {
    return(
      <div className='signup'>
        <div className='image-containerprofile'>
        <h1 className="center-item" style={{fontFamily:"cursive", marginLeft:"45%"}}>Hey Kiddo!</h1>
          <img style={{width:"300px",height:"500px", marginTop:"5%", marginLeft:"30%"}} className='register_boy' src='../../register_boy.png'/>
        </div>
        <div className='form-containerprofile' style={{border:"solid", backgroundColor:"#f2f2f2", borderRadius:"10PX", marginTop:"2%", marginRight:"10%", marginBottom:"20px"}}>
        <h1 className="center-item" style={{fontFamily:"cursive",marginBottom:"35px", marginTop:"30px"}}>EDIT KIDDO PROFILE</h1>
        <form>
          <br></br>
            <div className='input-container'>
              <label className='primary' style={{backgroundColor:"#f2f2f2", fontFamily:"cursive"}}>Full Name</label>
              <input type='text' className='form-inputSignin' style={{fontFamily:"cursive", backgroundColor:"#f2f2f2"}} name='supName' onChange={this.haddleInputChanges} placeholder='kiddo Name'/>
            </div>
            <div className='input-container'>
              <label className='primary' style={{backgroundColor:"#f2f2f2", fontFamily:"cursive"}}>Phone Number</label>
              <input type='text' className='form-inputSignin' style={{fontFamily:"cursive",backgroundColor:"#f2f2f2"}} name='supName' onChange={this.haddleInputChanges} placeholder='kiddo Phone'/>
            </div>
            <div className='input-container'>
              <label className='primary'style={{backgroundColor:"#f2f2f2", fontFamily:"cursive"}}>Age</label>
              <input type='text' className='form-inputSignin' style={{backgroundColor:"#f2f2f2",fontFamily:"cursive"}} name='supName' onChange={this.haddleInputChanges} placeholder='kiddo Age'/>
            </div>
            <div className='input-container'>
              <select className='form-select' name='supType' style={{backgroundColor:"#f2f2f2",fontFamily:"cursive"}} onChange={this.haddleInputChanges} >
                <option>kiddo Country</option>
                <option>Sri Lanka</option>
                <option>India</option>
                <option>Canada</option>
                <option>Australia</option>
                <option>Newseland</option>
                <option>England</option>
              </select>
              </div>
              <div className='input-container' style={{marginTop:'20px'}}>
              <label className='primary' style={{backgroundColor:"#f2f2f2", fontFamily:"cursive"}}>Upload Kiddo Photo</label>
              <input type='file' className='form-inputSignin' style={{fontFamily:"cursive", height:"50px"}} name='profilePhoto' onChange={this.handlePhotoUpload}/>
              </div>
              <div className='input-container'>
              <label style={{fontFamily:"cursive"}}>Successfully Completed Tutorials - <input type='text' style={{fontFamily:"cursive", fontSize:"17px", width:"40px", height:"30px", marginLeft:"20px"}} name='supName' onChange={this.haddleInputChanges} placeholder=' 01'/></label>
            </div>
            <div className='input-container'>
            <button type='submit' style={{marginLeft:"40%", fontFamily:"cursive", marginRight:"40%", borderRadius:"10px"}} >SAVE</button>
            </div>
          </form>
        </div>

      </div>
    )
  }
}
export default ProfileKiddo;