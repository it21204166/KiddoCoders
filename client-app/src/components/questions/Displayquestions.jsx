import React, { Component } from 'react';
import axios from 'axios';
import '../questions/questions.css';

class Displayquestions extends Component {
  constructor(props) {
    super(props);
    this.state = {
      QuestionDetails: [],
      searchInput: ""
    };
    this.search = this.search.bind(this);
    this.handleFindInput = this.handleFindInput.bind(this);
    this.generatePDF = this.generatePDF.bind(this); // You need to define this function
  }

  componentDidMount() {
    axios.get("http://localhost:8000/tutorialGet/questionshow/get").then(res => {
      if (res.data.success) {
        this.setState({
          QuestionDetails: res.data.existingDetails
        });
      }
    });
  }

  handleFindInput = (e) => {
    const searchInput = e.target.value;
    this.setState({ searchInput }, () => {
      this.search();
    });
  }

  onSubmit(id) {
    axios.delete(`http://localhost:8000/tutorialDelete/question/delete/${id}`).then(res => {
      console.log("Deleted");
      // Update state after deletion if needed
      this.setState(prevState => ({
        QuestionDetails: prevState.QuestionDetails.filter(question => question._id !== id)
      }));
    });
  }

  generatePDF() {
    // Implement PDF generation logic here
  }

  render() {
    return (
      <div>
        <h2 style={{ marginLeft: "20px", marginTop: "65px" }}>Frequently Asked Questions</h2>
        <div><button style={{ marginLeft: "20px" }} className='searchQuestions'><i className="fa-solid fa-magnifying-glass"></i></button><input className='searchPayments' value={this.state.searchInput} onChange={this.handleFindInput} placeholder='Search payments'></input></div>
        <br />
        <div className='table-question'>
          <table className='table-question' id='allquestiondetails' >
            <thead>
              <tr>
                <th scope="col" className='table-question' style={{ borderTopLeftRadius: "10px" }}>First Name</th>
                <th scope="col" className='table-question'>Email</th>
                <th scope="col" className='table-question'>Question</th>
                <th scope="col" className='table-question' style={{ border: "none", borderTopRightRadius: "10px" }}>Options</th>
              </tr>
            </thead>
            <tbody scope="raw" >
              {this.state.QuestionDetails.map((results, index) => (
                <tr key={results._id}>
                  <td className='table-question' title={results.FirstName}>{results.FirstName}</td>
                  <td className='table-question' title={results.Email}>{results.Email}</td>
                  <td className='table-question' title={results.Questions}>{results.Question}</td>
                  <td className='table-question' style={{ padding: "5px", border: "none" }}>
                    <div className='btn-inline-table'>
                      <a href={`/questions/Updatequestions/${results._id}`}><button type="button" className="btn btn-warning">Update</button></a>
                      <button onClick={() => this.onSubmit(results._id)} type="button" className="btn btn-danger">Delete</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <button style={{ marginLeft: "450px", marginTop: "25px" }} className='btn btn-primary' onClick={this.generatePDF} type='button'>Download PDF</button>
      </div>
    );
  }
}

export default Displayquestions;
