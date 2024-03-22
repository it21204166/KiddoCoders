import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import axios from "axios";

class Displayfeedbacks extends Component {
  constructor(props) {
    super(props);
    this.state = {
      feedback: [],
    };
    
  }

  componentDidMount() {
    this.fetchItem();
  }

  fetchItem = async () => {
    try {
      const result = await axios.get("http://localhost:8000/feed/getFeed");
      this.setState({ feedback: result.data.result });
    } catch (error) {
      console.log(error); 
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

  render() {
    return (
      <div>
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
                        < button style={{margintop: "10px"}}
                          className="btn btn-warning btn-sm"
                          onClick={() => this.handleEdit(item)}
                        >
                          Edit
                        </button>
                        <button style={{margintop: "10px"}}
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

export default withRouter(Displayfeedbacks);

