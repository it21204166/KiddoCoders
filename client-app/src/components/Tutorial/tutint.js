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
      searchInput: "" 
    };
    this.tableRef = React.createRef(); 
  }

  componentDidMount() {
    this.fetchItem();
  }

  fetchItem = async () => {
    try {
      const result = await axios.get("http://localhost:8000/tute/getTut2");
      this.setState({ tutint: result.data.result });
    } catch (error) {
      console.log(error); 
    }
  };
  
  handleFindInput = (e) => {
    const searchInput = e.target.value;
    this.setState({ searchInput }, () => {
      
      this.search();
    });
  };

  // generate PDF
  generatePDF = () => {
    const { question } = this.state;
    const pdf = new jsPDF();

    pdf.text("KiddoCodders", 70, 25);

    const columns = [
      { title: "Id", dataKey: "id" },
      { title: "First Name", dataKey: "F_Name" },
      { title: "Email", dataKey: "Q_Email" },
      { title: "Question", dataKey: "Q_Question" }
    ];

    pdf.autoTable({
      head: [columns.map(col => col.title)],
      body: question.map(item => columns.map(col => item[col.dataKey])),
      startY: 50,
      theme: 'grid'
    });

    pdf.setFontSize(16); 
    pdf.setTextColor("#00baa1");
    pdf.text("Tutorial", 55, 35);
    pdf.save("Begginers tutorial.pdf");
  };

  render() {
    return (
      <div>
        <div className='bg11'>
          <HeaderToPage/>
          <div style={{backgroundColor:"white"}}>
            <h3 style={{ color: "Light blue", marginTop: "25px", marginBottom: "20px" }}><center>Tutorials For Intermediates</center></h3>

           
            <div className="container table-container">
              <table ref={this.tableRef} className="table table-bordered">
                <thead className="table-info">
                  <tr>
                    <th scope="col">Id</th>
                    <th scope="col">Title</th>
                    <th scope="col">Description</th>
                    <th scope="col">Syntax</th>
                   
                  </tr>
                </thead>

                <tbody>
                  {this.state.tutint.map((item, index) => {
                    return (
                      <tr key={index}>
                        <td>{index + 1}</td>
                        <td>{item.Title2}</td>
                        <td>{item.Desc2}</td>
                        <td>{item.Syntax2}</td>
                        <td>
                          
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
             <center> <button className='btn btn-primary' onClick={this.generatePDF}>Print</button></center>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(tutint);
