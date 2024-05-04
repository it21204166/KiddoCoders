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
              <center>
            <h2 style={{marginLeft:"20px",marginTop:"25px"}}>CONTACT KIDDO</h2>
            </center>
            <div id="EmailKiddorectangle">
            <br/>
            <center>
            <label>Send an Email</label>
            </center>
            <br/>
            <br/>
            <input type='text' className='inputkiddoemail' name='sender' value={this.state.sender} readOnly/>
            <br/>
            <input type='text' className='inputkiddoemail' name='kiddoreciever' value={this.state.kiddoreciever} onChange={this.handleinput} placeholder='To'/>
            <br/>
            <input type='text' className='inputkiddoemail' name='kiddoSubject' value={this.state.kiddoSubject} onChange={this.handleinput} placeholder='Subject'/>
            <br/>
            <textarea  rows="15" cols="50" name='kiddomsg' value={this.state.kiddomsg} onChange={this.handleinput} placeholder=' Message...' style={{marginLeft:'40px',border: '2px solid #1eb2a6',width:'90%',borderRadius:'10px'}} required></textarea>
            <br/>
            <center>
            <a href='/AllKiddos'><button  className='btn btn-warningkiddo' style={{ marginTop:"20px"}}>BACK</button></a>
            <a href='/ContactKiddo'><button  onClick={this.onSubmit} className='btn btn-successKiddo ' style={{ marginTop:"20px",marginLeft:'20px'}}>SEND</button></a>
            </center>
            <br/>
            </div>
            <br/>
</div>
)}
}

export default sendEmailKiddo;