import React, { Component } from "react";
//import { withRouter } from "react-router-dom";
import axios from "axios";
import 'jspdf-autotable'
import jsPDF from 'jspdf'
import "./AuthAdmin.css";
import * as IoIcons from "react-icons/io5";


class AllKiddos extends Component {
    
    constructor(props){
        super(props)
        this.state ={
          currentMonth: null,
          kiddodetails: [],
          searchInput:""
        }
        this.search=this.search.bind(this)
        this.handlesearchInput=this.handlesearchInput.bind(this)
      }
    
      generatePDF() {
        const tableskiddo = document.getElementById("kiddoDetailsTable")
        const {height,width} = tableskiddo.getBoundingClientRect()
        const pdf = new jsPDF()
        
        pdf.setFontSize("20")
        pdf.text("Kiddo Coders",65,25)
      
        const columns = [];
        for(let i=0; i<5;i++){
          columns.push({header: `Column ${i+1}`,dataKey:`col${i}`});
        }
      
        const scaleFactor = pdf.internal.pageSize.width/width
      
        pdf.autoTable(
          {
            html: '#kiddoDetailsTable',
            startY: 50,
            theme: 'grid',
            margin: { left:25,top: 20, bottom: 20, },
            tableWidth:  900* scaleFactor,
            
            columnStyles: { 0: {fontStyles: 'bold'},
            },
            scaleFactor:scaleFactor,
            columns
          })
    
          pdf.setFontSize("16")
          pdf.setTextColor("#00baa1")
          pdf.text("Kiddo Details Table",60,35)
          pdf.save("Kiddo.pdf")
        }
    
      componentDidMount(){
    
        axios.get("http://localhost:8000/kiddoGet/kiddoavailable/get").then(res =>{
          if(res.data.success){
            this.setState({
                kiddodetails:res.data.existingDetails
            })
          }
        })
      }
    
      search(){
        axios.get(`http://localhost:8000/kiddoGet/kiddodetails/search?q=${this.state.searchInput}`).then(res => {
            if(res.data.success){
                this.setState({
                    kiddodetails: res.data.searchedDetails
                })
            }
          
    })
    
    }
    
    handlesearchInput = (e) => {
      const searchInput = e.target.value
      this.setState({searchInput},() => {
        this.search()
    })
  }


  render() {
    return (
        <div>
        <h2 className="center-item" style={{marginBottom:"35px", marginTop:"30px"}}>REJISTERED KIDDOS</h2>

        <div style={{marginLeft:"500px",width:"50%"}} >
          <button className='searchkiddo' ><IoIcons.IoSearchOutline  /></button><input className='searchkiddo' value={this.state.searchInput} onChange={this.handlesearchInput} placeholder='Search Details Here'></input>
          </div>
          <br/>
        <div className='table-kiddo'>
        <table className='content-tablekiddo' id='kiddoDetailsTable' >
          <thead className='content-table thead tr'>
            <tr className='content-table tbody tr'>
              <th className='content-table th' scope="col"  style={{borderTopLeftRadius:"7px"}}>Kiddo ID</th>
              <th className='content-table th' scope="col" >Kiddo Name</th>
              <th className='content-table th' scope="col" >Kiddo Mobile</th>
              <th className='content-table th' scope="col" >Kiddo Email</th>
              <th className='content-table th' scope="col" >Kiddo Age</th>
              <th className='content-table th' scope="col" >Earn Points</th>
              <th className='content-table th' scope="col" style={{border:"none",borderTopRightRadius:"7px"}}>Options</th>
            </tr>
          </thead>
          <tbody scope="raw" >      
          {this.state.kiddodetails.map((results,index)=>(
            <tr className='content-table tbody tr'>
              <td className='content-table td'>{index+1}</td>
              <td className='content-table td' title={results.kiddoName}>{results.kiddoName}</td>
              <td className='content-table td' title={results.kiddoPhone}>{results.kiddoPhone}</td>
              <td className='content-table td' title={results.kiddoEmail}>{results.kiddoEmail}</td>
              <td classname='content-table td' title={results.kiddoAge}>{results.kiddoAge}</td>
              <td classname='content-table td' title={results.null}>{results.null}</td>
              <td className='content-table td' style={{padding:"5px",border:"none"}}><a href='/ContactKiddo'><button className='btn btn-primary' type='primary'>CONTACT</button></a></td>
            </tr>
          ))}
          </tbody>
        </table>
        </div>
        <br></br>
        <center>
        <button className='btn btn-primary' onClick={this.generatePDF} type='primary'>Download</button>
        <a href='/'><button type='submit' className='btn btn-warningkiddo' style={{ marginLeft:"20px",marginTop:"20px"}}>BACK</button></a>
        </center>
        <br></br>
      </div>
    );
  }
}

export default AllKiddos;