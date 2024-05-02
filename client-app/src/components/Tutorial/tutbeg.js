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
      searchInput: "" 
    };
    this.tableRef = React.createRef(); 
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
  
  handleFindInput = (e) => {
    const searchInput = e.target.value;
    this.setState({ searchInput }, () => {
      
      this.search();
    });
  };

  // generate PDF
  generatePDF = () => {
    const { tutbeg } = this.state;
    const pdf = new jsPDF();

    pdf.text("KiddoCodders", 70, 25);

    const columns = [
      { title: "Id", dataKey: "id" },
      { title: "Title", dataKey: "Title" },
      { title: "Description", dataKey: "Desc" },
      { title: "Syntax", dataKey: "Syntax" }
    ];

    pdf.autoTable({
      head: [columns.map(col => col.title)],
      body: tutbeg.map(item => columns.map(col => item[col.dataKey])),
      startY: 50,
      theme: 'grid'
    });

    pdf.setFontSize(16); 
    pdf.setTextColor("#00baa1");
    pdf.text("Tutorial For The Begginers", 55, 35);
    pdf.save("Begginers tutorial.pdf");
  };

  render() {
    return (
      <div>
        <div className='bg11'>
          <HeaderToPage/>
          <div style={{backgroundColor:"white"}}>
            <h3 style={{ color: "Light blue", marginTop: "25px", marginBottom: "20px" }}><center>Tutorials For Beginners</center></h3>

           
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
                  {this.state.tutbeg.map((item, index) => {
                    return (
                      <tr key={index}>
                        <td>{index + 1}</td>
                        <td>{item.Title}</td>
                        <td>{item.Desc}</td>
                        <td>{item.Syntax}</td>
                        <td>
                          
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
             <center> <button className='btn btn-primary' onClick={this.generatePDF}>Download Tutorial</button></center>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(tutbeg);
