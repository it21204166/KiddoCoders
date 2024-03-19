import React, { Component } from "react";
import "./auth.css";
import axios from 'axios'



class Signup extends Component {


  constructor(props){
    super(props)
    this.state = {
      kiddoName: "",
      kiddoPhone: "",
      kiddoEmail: "",
      kiddoAge: "",
      kiddoCountry: "",
      kiddoPassword: "",
    }
    this.onSubmitDetails=this.onSubmitDetails.bind(this)
    this.haddleInputChanges=this.haddleInputChanges.bind(this)
  }

  haddleInputChanges = (event) => {
    const { name, value } = event.target
    let errorMsg = ""
    const mobileRegex = /^[0][0-9]{9}$/ //Sri Lankan mobile numbers starting with 0 and with 10 digits
    const emailRegex = /^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i // Regex for email format validation

    // Check if mobile number input matches the desired pattern
    if (name === "kiddoPhone" && !mobileRegex.test(value)) {
      errorMsg = "Invalid mobile number format. Please enter a valid number starting with 0 and with 10 digits."
    }

    // Check if email input matches the desired pattern
  if (name === "kiddoEmail" && !emailRegex.test(value)) {
    errorMsg = "Invalid email format. Please enter a valid email address with (@)"
  }

    this.setState({
      ...this.setState,
      [name]: value,
      errorMsg: errorMsg
    })
}

  onSubmitDetails(){

    const { kiddoName, kiddoEmail, kiddoPhone, kiddoAge, kiddoCountry, kiddoPassword} = this.state

    const data = {
      
      kiddoName:kiddoName,
      kiddoPhone:kiddoPhone,
      kiddoEmail:kiddoEmail,
      kiddoAge:kiddoAge,
      kiddoCountry:kiddoCountry,
      kiddoPassword:kiddoPassword,
    }

    axios.post("http://localhost:8000/kiddoPost/kiddoavailable/post",data).then((res) => {
      this.setState({
        kiddoName: "",
        kiddoPhone: "",
        kiddoEmail: "",
        kiddoAge: "",
        kiddoCountry: "",
        kiddoPassword: "",
      })
    })
  }


  render() {
    return (
      <div className='signup'>
        <div className='image-container'>
          <img style={{width:"900px",height:"760px"}} className='register_boy' src='../../register.png'/>
        </div>
        <div className='form-container' >
        <h1 className="center-item" style={{fontFamily:"cursive", marginBottom:"35px", marginTop:"30px"}}>REGISTER</h1>
          <form action=''>
            <div className='input-container' >
              <label className='primary' style={{fontFamily:"cursive"}}>Full Name</label>
              <input type='text' className='form-inputSignin' style={{fontFamily:"cursive"}} name='kiddoName' value={this.state.kiddoName} onChange={this.haddleInputChanges} placeholder='kiddo Name'/>
            </div>
            <div className='input-container'>
              <label className='primary' style={{fontFamily:"cursive"}}>Phone Number</label>
              <input type='text' className='form-inputSignin' style={{fontFamily:"cursive"}} name='kiddoPhone' value={this.state.kiddoPhone} onChange={this.haddleInputChanges} placeholder='kiddo Phone'/>
            </div>
            <div className='input-container'>
              <label className='primary' style={{fontFamily:"cursive"}}>E-mail</label>
              <input type='text' className='form-inputSignin' style={{fontFamily:"cursive"}} name='kiddoEmail' value={this.state.kiddoEmail} onChange={this.haddleInputChanges} placeholder='kiddo@gmail.com'/>
            </div>
            <div className='input-container'>
              <label className='primary' style={{fontFamily:"cursive"}}>Age</label>
              <input type='text' className='form-inputSignin' style={{fontFamily:"cursive"}} name='kiddoAge' value={this.state.kiddoAge} onChange={this.haddleInputChanges} placeholder='kiddo Age'/>
            </div>
            <div className='input-container'>
              <select className='form-select' name='kiddoCountry' style={{fontFamily:"cursive"}} value={this.state.kiddoCountry} onChange={this.haddleInputChanges} >
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
              <input type='text' className='form-inputSignin' style={{fontFamily:"cursive"}} name='kiddoPassword' value={this.state.kiddoPassword} onChange={this.haddleInputChanges} placeholder='kiddo Password'/>
            </div>
            <div className='input-container'>
            <a href='/'><button type='submit' onClick={this.onSubmitDetails} style={{marginLeft:"35%", fontFamily:"cursive", borderRadius:"10px", marginTop:"0px"}}>REGISTER</button></a>
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
