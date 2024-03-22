import React, { Component } from 'react'
import "./auth.css";
import { LoginUser } from "./apiCalls/users";
import { message } from "antd";



class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      formData: {
        kiddoEmail: "",
        kiddoPassword: "",
      },
    };
  }

  handleInputFocus = (e) => {
    e.target.parentNode.classList.add("active-label");
  };

  handleInputBlur = (e) => {
    if (e.target.value === "") {
      e.target.parentNode.classList.remove("active-label");
    }
  };

  onInputChange = (e) => {
    const { name, value } = e.target;
    this.setState((prevState) => ({
      formData: {
        ...prevState.formData,
        [name]: value,
      },
    }));
  };

  onFinish = async (event) => {
    event.preventDefault(); // Prevent the default form submission behavior
    const { formData } = this.state;
    try {
      const response = await LoginUser(formData);
      console.log("Response:", response);
      if (response.success) {
        message.success("response.message");
        localStorage.setItem("AuthToken", response.data);
        window.location.href="/"  // ---------------- Use navigate to redirect within the app-----------
      } else {
        message.error(response.message);
      }
    } catch (error) {
      console.error("Error:", error);
      message.error(error.message);
    }
  };

  render() {
    const { formData } = this.state;

    return (
      <div>
        <div className='signup'>
        <div className='image-container'>
          <img style={{width:"900px",height:"695px"}} className='register_boy' src='../../register.png'/>
        </div>
        <div className='form-container' >
        <h1 className="center-item" style={{fontFamily:"cursive", marginBottom:"30px"}}>LOGIN</h1>
        <form onSubmit={this.onFinish}>
            <div className='input-container'>
              <label className='primary' style={{fontFamily:"cursive"}}>E-mail</label>
              <input 
                    type="email"
                    id="kiddoEmail"
                    name="kiddoEmail"
                    value={formData.kiddoEmail}
                    onChange={this.onInputChange}
                    onFocus={this.handleInputFocus}
                    onBlur={this.handleInputBlur}
                    required
                    className='form-inputSignin'
                    style={{fontFamily:"cursive"}}
                    placeholder='kiddo@gmail.com'/>
            </div>
            <div className='input-container'>
              <label className='primary' style={{fontFamily:"cursive"}}>Password</label>
              <input
                    type="password"
                    id="kiddoPassword"
                    name="kiddoPassword"
                    value={formData.kiddoPassword}
                    onChange={this.onInputChange}
                    onFocus={this.handleInputFocus}
                    onBlur={this.handleInputBlur}
                    required className='form-inputSignin'
                    style={{fontFamily:"cursive"}}
                    placeholder='kiddo Password'/>
            </div>
            <div className='input-container'>
            <a href='/'><button type='submit' style={{marginLeft:"35%", fontFamily:"cursive", borderRadius:"10px"}}>LOGIN</button></a>
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
export default Login;
