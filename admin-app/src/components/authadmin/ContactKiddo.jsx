import React, { Component } from "react";
import axios from "axios";
import "./AuthAdmin.css";

class sendEmailKiddo extends Component {

    constructor(props){
        super(props)
        this.state={
           sender:'kiddocoders@gmail.com',
           kiddoreciever:'',
           kiddoSubject:'',
           kiddomsg:''
      }
      this.onSubmit=this.onSubmit.bind(this)
      
      }   
      
      handleinput = (event) => {
        const {name,value}=event.target
        this.setState({
            ...this.state,[name]:value
        })
      }
      
      onSubmit(){
        const {kiddoreciever,kiddoSubject,kiddomsg}=this.state
       const mail={
        kiddoreciever:kiddoreciever,
        kiddoSubject:kiddoSubject, 
        kiddomsg:kiddomsg
       } 
      
       axios.post("http://localhost:8000/kiddoPost/sendEmailKiddo",mail).then((response)=>{
        console.log("success")
        this.state({success:true})
      }).catch(error=>{
         console.error("Error Occured:",error)
        })
      
        }
      

    render() {
        return (
            <div>
            <h2 style={{marginLeft:"20px",marginTop:"65px"}}>Contact Kiddo</h2>
            <br/>
            <div id="EmailSupplierrectangle">
            <br/>
            <center>
            <label>Send an Email</label>
            </center>
            <br/>
            <br/>
            <br/>
            <input type='text' className='inputSupplieremail' name='sender' value={this.state.sender} readOnly/>
            <br/>
            <input type='text' className='inputSupplieremail' name='kiddoreciever' value={this.state.kiddoreciever} onChange={this.handleinput} placeholder='To'/>
            <br/>
            <input type='text' className='inputSupplieremail' name='kiddoSubject' value={this.state.kiddoSubject} onChange={this.handleinput} placeholder='Subject'/>
            <br/>
            <textarea  rows="15" cols="50" name='kiddomsg' value={this.state.kiddomsg} onChange={this.handleinput} placeholder='Message...' style={{marginLeft:'40px',border: '2px solid #1eb2a6',width:'90%',borderRadius:'10px'}} required></textarea>
            <br/>
            <center>
            <a href='/supplier/AllKiddos'><button  className='btn btn-warning' style={{ marginTop:"20px"}}>BACK</button></a>
            <a href='/supplier/ContactKiddo'><button  onClick={this.onSubmit} className='btn btn-success' style={{ marginTop:"20px",marginLeft:'20px'}}>SEND</button></a>
            </center>
            <br/>
            </div>
            <br/>
</div>
)}
}

export default sendEmailKiddo;