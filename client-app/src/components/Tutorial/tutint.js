import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import axios from "axios";
import HeaderToPage from "../common/header/HeaderToPage";
import 'jspdf-autotable';
import jsPDF from 'jspdf';

class tutint extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tutint: [],
      currentIndex: 0 
    };
  }

  componentDidMount() {
    this.fetchItem();
  }

  fetchItem = async () => {
    try {
      const result = await axios.get("http://localhost:8000/tute2/getTut2");
      this.setState({ tutint: result.data.result });
    } catch (error) {
      console.log(error); 
    }
  };


  handleNext = () => {
    this.setState(prevState => ({
      currentIndex: prevState.currentIndex < this.state.tutint.length - 1 ? prevState.currentIndex + 1 : prevState.currentIndex
    }));
  };

 
  handlePrev = () => {
    this.setState(prevState => ({
      currentIndex: prevState.currentIndex > 0 ? prevState.currentIndex - 1 : 0
    }));
  };

  generatePDF = () => {
    const { tutint, currentIndex } = this.state;
    const tutorial = tutint[currentIndex]; 
    const pdf = new jsPDF();

    pdf.text("KiddoCodders", 70, 25);
    pdf.text("Tutorial For The Intermediates", 55, 35);

    const columns = [
      { title: "Id", dataKey: "id" },
      { title: "Title", dataKey: "Title_i" },
      { title: "Description", dataKey: "Desc_i" },
      { title: "Syntax", dataKey: "Syntax_i" }
    ];

    const rows = columns.map(col => tutorial[col.dataKey]); 

    pdf.autoTable({
      head: [columns.map(col => col.title)],
      body: [rows], 
      startY: 50,
      theme: 'grid'
    });

    pdf.setFontSize(16); 
    pdf.setTextColor("#00baa1");
    pdf.save("Intermediates tutorial.pdf");
  };

  render() {
    const { tutint, currentIndex } = this.state;
    const tutorial = tutint[currentIndex];

    return (
      <div>
        <div className='bg11'>
          <HeaderToPage />
          <div style={{backgroundColor:"white"}}>
            <h3 style={{ color: "Light blue", marginTop: "25px", marginBottom: "20px" }}><center>Tutorials For Intermediates</center></h3>
            <div className="but-con">
            <button className='begbut' onClick={this.handlePrev}>Previous</button>
            <button className='begbut' onClick={this.handleNext}>Next</button>
            </div>
            
            {tutorial && (
              <div className="container">
                {/* <table className="table table-bordered">
                  <thead className="table-info">
                    <tr>
                      <th scope="col">Id</th>
                      <th scope="col">Title</th>
                      <th scope="col">Description</th>
                      <th scope="col">Syntax</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>{currentIndex + 1}</td>
                      <td>{tutorial.Title}</td>
                      <td>{tutorial.Desc}</td>
                      <td>{tutorial.Syntax}</td>
                    </tr>
                  </tbody>
                </table> */}
                <h2>{tutorial.Title_i}</h2>
                <hr></hr>
        
                <p>{tutorial.Desc_i}</p>
                <hr></hr>
                <div className="con-syntax">
                <h3>Syntax:</h3>
                <hr></hr>
                <br></br>
                <p>{tutorial.Syntax_i}</p>
                </div>
                <center><button className='btn btn-primary' onClick={this.generatePDF}>Print</button></center>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(tutint);
