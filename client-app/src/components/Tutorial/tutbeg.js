import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import axios from "axios";
import HeaderToPage from "../common/header/HeaderToPage";
import 'jspdf-autotable';
import jsPDF from 'jspdf';

class tutbeg extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tutbeg: [],
      currentIndex: 0 
    };
  }

  componentDidMount() {
    this.fetchItem();
  }

  fetchItem = async () => {
    try {
      const result = await axios.get("http://localhost:8000/tute/getTut");
      this.setState({ tutbeg: result.data.result });
    } catch (error) {
      console.log(error); 
    }
  };

  // Navigate to the next tutorial
  handleNext = () => {
    this.setState(prevState => ({
      currentIndex: prevState.currentIndex < this.state.tutbeg.length - 1 ? prevState.currentIndex + 1 : prevState.currentIndex
    }));
  };

  // Navigate to the previous tutorial
  handlePrev = () => {
    this.setState(prevState => ({
      currentIndex: prevState.currentIndex > 0 ? prevState.currentIndex - 1 : 0
    }));
  };

  generatePDF = () => {
    const { tutbeg, currentIndex } = this.state;
    const tutorial = tutbeg[currentIndex]; // Only get the current tutorial
    const pdf = new jsPDF();

    pdf.text("KiddoCodders", 70, 25);
    pdf.text("Tutorial For The Beginners", 55, 35);

    const columns = [
      { title: "Id", dataKey: "id" },
      { title: "Title", dataKey: "Title" },
      { title: "Description", dataKey: "Desc" },
      { title: "Syntax", dataKey: "Syntax" }
    ];

    const rows = columns.map(col => tutorial[col.dataKey]); // Adapt to single item

    pdf.autoTable({
      head: [columns.map(col => col.title)],
      body: [rows], // Adapt to single item
      startY: 50,
      theme: 'grid'
    });

    pdf.setFontSize(16); 
    pdf.setTextColor("#00baa1");
    pdf.save("Begginers tutorial.pdf");
  };

  render() {
    const { tutbeg, currentIndex } = this.state;
    const tutorial = tutbeg[currentIndex];

    return (
      <div>
        <div className='bg11'>
          <HeaderToPage />
          <div style={{backgroundColor:"white"}}>
            <h3 style={{ color: "Light blue", marginTop: "25px", marginBottom: "20px" }}><center>Tutorials For Beginners</center></h3>
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
                <h2>{tutorial.Title}</h2>
                <hr></hr>
        
                <p>{tutorial.Desc}</p>
                <hr></hr>
                <div className="con-syntax">
                <h3>Syntax:</h3>
                <hr></hr>
                <br></br>
                <p>{tutorial.Syntax}</p>
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

export default withRouter(tutbeg);
