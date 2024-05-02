import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import axios from "axios";
import HeaderToPage from "../common/header/HeaderToPage";
import 'jspdf-autotable';
import jsPDF from 'jspdf';

class Displayfeedback2 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      feedback: [],

    };
    this.tableRef = React.createRef(); 
  }

  componentDidMount() {
    this.fetchItem();
  }

  fetchItem = async () => {
    try {
      const result = await axios.get("http://localhost:8000/feed/getFeed");
      this.setState({ feedback: result.data.result });
    } catch (error) {
     
    }
  };

  handleEdit = (clickedItem) => {
    const id = clickedItem._id;
    this.props.history.push(`/updatefeedbacks/${id}`);
    window.location.reload()
  };

  handleDelete = async (clickedItem) => {
    const id = clickedItem._id;

    try {
      await axios.delete(`http://localhost:8000/feed/deleteFeed/${id}`);
      this.setState((prevState) => ({
        feedback: prevState.feedback.filter((item) => item._id !== id),
      }));
    } catch (err) {
      console.log(err);
    }
  };

  generatePDF = () => {
    const { feedback } = this.state;
    const pdf = new jsPDF();

    pdf.text("KiddoCodders", 70, 25);

    const columns = [
      { title: "Id", dataKey: "id" },
      { title: "Name", dataKey: "Fu_Name" },
      { title: "Email", dataKey: "F_Email" },
      { title: "First Visit", dataKey: "F_Visit" },
      { title: "Rating", dataKey: "F_Service" },
      { title: "Feedback", dataKey: "F_Feedback" }

    ];

    pdf.autoTable({
      head: [columns.map(col => col.title)],
      body: feedback.map(item => columns.map(col => item[col.dataKey])),
      startY: 50,
      theme: 'grid'
    });

    pdf.setFontSize(16); 
    pdf.setTextColor("#00baa1");
    pdf.text("Feedbacks", 76, 35);
    pdf.save("feedback.pdf");
  };


  render() {
    return (
        <div>
      <div className='bg11'>
      <HeaderToPage/>
      <div style={{backgroundColor:"white"}}> 
        <h3 style={{ color: "Light blue", marginTop: "25px", marginBottom: "20px" }}><center>All Feedbacks</center></h3>

        <div className="container table-container">
          <table className="table table-borded">
            <thead className="table-info">
              <tr>
                <th scope="col">Id</th>
                <th scope="col">Name</th>
                <th scope="col">Email</th>
                <th scope="col">Fisrt Visit</th>
                <th scope="col">Rating</th>
                <th scope="col">Feedback</th>
                <th scope="col">Action</th>
              </tr>
            </thead>

            <tbody>
              {this.state.feedback.map((item, index) => {
                return (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{item.Fu_Name}</td>
                    <td>{item.F_Email}</td>
                    <td>{item.F_Visit}</td>
                    <td>{item.F_Service}</td>
                    <td>{item.F_Feedback}</td>
                    <td>
                      <div className="action-btns">
                        < button style={{margintop: "10px"}} className="btn btn-warning btn-sm" onClick={() => this.handleEdit(item)}>Edit</button>
                        <button style={{margintop: "10px"}} className="btn btn-danger btn-sm" onClick={() => this.handleDelete(item)}>Delete</button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          <center><button className='btn btn-primary' onClick={this.generatePDF}>Download pdf</button></center>
        </div>
      </div>
      </div>
      </div>
    );
  }
}

export default withRouter(Displayfeedback2);

