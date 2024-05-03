import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom

class Exercise extends Component {
  constructor(props) {
    super(props);
    this.state = {
      allExercisesDetaild: [],
    };
  }

  componentDidMount() {
    this.retrieveExerciseDetails();
  }

  retrieveExerciseDetails() {
    axios.get("http://localhost:8000/exercises/get")
      .then(res => {
        if (res.data.success) {
          this.setState({
            allExercisesDetaild: res.data.existingDetails
          });
        }
      })
      .catch(error => {
        console.error('Error fetching exercise details:', error);
      });
  }

  onDelete = (id) => {
    axios.delete(`http://localhost:8000/exercises/delete/${id}`)
      .then(() => {
        this.retrieveExerciseDetails();
      })
      .catch(error => {
        console.error('Error deleting exercise:', error);
      });
  }

  render() {
    return (
      <div className='exercise-container'>
        <Link to='/exercisemanagement/exercise/addexercise'>
          <button className='btn btn-success'>Add Exercise</button>
        </Link>
        <table className='content-table'>
          <thead className='tData'>
            <tr>
              <th scope="col" style={{ borderTopLeftRadius: "10px" }}>C/No</th>
              <th scope="col">Exercise Title</th>
              <th scope="col">Exercise Category</th>
              <th scope="col">About Exercise</th>
              <th scope="col">Exercise (Beginners/Intermediate)</th>
              <th scope="col" style={{ border: "none", borderTopRightRadius: "10px" }}>Options</th>
            </tr>
          </thead>
          <tbody scope="raw">
            {this.state.allExercisesDetaild.map((exercise, index) => (
              <tr key={exercise._id}>
                <td>{exercise.eTitle}</td>
                <td>{exercise.eCategory}</td>
                <td>{exercise.eAbout}</td>
                <td>{exercise.eUnder}</td>
                <td>
                  <Link to={`/exercises/edit/${exercise._id}`}>
                    <button className="btn btn-warning">Edit</button>
                  </Link>
                  <button className="btn btn-danger" onClick={() => this.onDelete(exercise._id)}>Delete</button>
                  <Link to={`/exercises/view/${exercise._id}`}>
                    <button className="btn btn-primary">View</button>
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}

export default Exercise;
