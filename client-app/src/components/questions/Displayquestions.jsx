import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import axios from "axios";

class Displayquestions extends Component {
  constructor(props) {
    super(props);
    this.state = {
      question: [],
    };
    
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
    window.location.reload()
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

  render() {
    return (
      <div>
        <h3>Frequently Ask Questions</h3>

        <div className="container table-container">
          <table className="table table-borded">
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
                        <button
                          className="btn btn-warning btn-sm"
                          onClick={() => this.handleEdit(item)}
                        >
                          Edit
                        </button>
                        <button
                          className="btn btn-danger btn-sm"
                          onClick={() => this.handleDelete(item)}
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

export default withRouter(Displayquestions);
