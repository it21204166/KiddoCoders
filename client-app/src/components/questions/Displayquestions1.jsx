import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import axios from "axios";
import HeaderToPage from "../common/header/HeaderToPage";
import 'jspdf-autotable';
import jsPDF from 'jspdf';

class Displayquestions1 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      question: [],
      searchInput: "" 
    };
    this.tableRef = React.createRef(); 
  }

  componentDidMount() {
    this.fetchItem();
  }

  fetchItem = async () => {
    try {
      const result = await axios.get("http://localhost:8000/ques/getQues");
      this.setState({ question: result.data.result });
    } catch (error) {
      console.log(error); 
    }
  };

  handleEdit = (clickedItem) => {
    const id = clickedItem._id;
    this.props.history.push(`/updatequestions/${id}`);
    window.location.reload();
  };

  handleDelete = async (clickedItem) => {
    const id = clickedItem._id;

    try {
      await axios.delete(`http://localhost:8000/ques/deleteQues/${id}`);
      this.setState((prevState) => ({
        question: prevState.question.filter((item) => item._id !== id),
      }));
    } catch (err) {
      console.log(err);
    }
  };

  // Search function
  search = () => {
    const { searchInput } = this.state;
    axios.get(`http://localhost:8000/ques/getQues/search?q=${searchInput}`)
      .then(res => {
        if (res.data.success) {
          this.setState({
            question: res.data.searchedDetails
          });
        }
      })
      .catch(error => {
        console.error(error);
        
      });
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
    pdf.text("Frequently Asked Questions Sheet", 55, 35);
    pdf.save("questions.pdf");
  };

  render() {
    return (
      <div>
        <div className='bg11'>
          <HeaderToPage/>
          <div style={{backgroundColor:"white"}}>
            <h3 style={{ color: "Light blue", marginTop: "25px", marginBottom: "20px" }}><center>Frequently Asked Questions</center></h3>

            <div>
              <button className='searchQuestions'><i className="fa-solid fa-magnifying-glass"></i></button>
              <input className='searchQuestions' value={this.state.searchInput} onChange={this.handleFindInput} placeholder='Search Questions'></input>
            </div>

            <div className="container table-container">
              <table ref={this.tableRef} className="table table-bordered">
                <thead className="table-info">
                  <tr>
                    <th scope="col">Id</th>
                    <th scope="col">First Name</th>
                    <th scope="col">Email</th>
                    <th scope="col">Question</th>
                    <th scope="col">Action</th>
                  </tr>
                </thead>

                <tbody>
                  {this.state.question.map((item, index) => {
                    return (
                      <tr key={index}>
                        <td>{index + 1}</td>
                        <td>{item.F_Name}</td>
                        <td>{item.Q_Email}</td>
                        <td>{item.Q_Question}</td>
                        <td>
                          <div className="action-btns">
                            <button style={{marginTop: "4px"}} className="btn btn-warning btn-sm" onClick={() => this.handleEdit(item)}>Edit</button>
                            <button style={{marginTop: "4px"}} className="btn btn-danger btn-sm" onClick={() => this.handleDelete(item)}>Delete</button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
             <center> <button className='btn btn-primary' onClick={this.generatePDF}>Download pdf</button></center>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(Displayquestions1);
