import React, { Component } from 'react';
import axios from 'axios';
import '../../components/Exersice/addexercise.css';
import { FaBars, FaTimes } from 'react-icons/fa'; // Import FaBars and FaTimes
import Swal from 'sweetalert';

export default class YourComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      eTitle: "",
      eAbout: "",
      eUnder: "",
      eCategory: "",
      exercises: [{ eParagrapgh: "", eQuestion: "", eAnswer: "" }]
    };
  }

  handleInputChange = (e) => {
    const { name, value } = e.target;
    this.setState({
      [name]: value
    });
  };

  handleExerciseInputChange = (e, index) => {
    const { name, value } = e.target;
    const exercises = [...this.state.exercises];
    exercises[index][name] = value;
    this.setState({ exercises });
  };

  addExercise = () => {
    this.setState(prevState => ({
      exercises: [...prevState.exercises, { eParagrapgh: "", eQuestion: "", eAnswer: "" }]
    }));
  };

  removeExercise = (index) => {
    const exercises = [...this.state.exercises];
    exercises.splice(index, 1);
    this.setState({ exercises });
  };

  onSubmit = (e) => {
    e.preventDefault();
    const { eTitle,eUnder, eAbout, eCategory, exercises } = this.state;

    const requestData = {
      eTitle,
      eUnder,
      eAbout,
      eCategory,
      exercises
    };

    axios.post("http://localhost:8000/addexercise/post", requestData)
      .then((res) => {
        if (res.data.success) {
          // Handle success as needed
          console.log("Exercises added successfully!");
          Swal({
            title: "Success!",
            text: "Exercise added successfully!",
            icon: "success",
          });
          // Clear input fields after successful submission
          this.clearInputFields();
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  clearInputFields = () => {
    this.setState({
      eTitle: "",
      eUnder: "",
      eAbout: "",
      eCategory: "",
      exercises: [{ eParagrapgh: "", eQuestion: "", eAnswer: "" }]
    });
  };

  render() {
    const { eTitle, eUnder, eAbout, eCategory, exercises } = this.state;
    return (
      <div className='main-container'>
        <div className='container'>
          <div className='left-container'>
            <div>
              <div>
                <div className='title-h2' style={{ alignItems: 'center' }}>
                  <h2>Add New Exercise</h2>
                </div>
                <form className='form-in' onSubmit={this.onSubmit}>
                  <div className='inline-form'>
                    {/* Your existing input fields */}
                    <div className='containe-field'>
                      <div className='input-container'>
                        <label className='primary'>Exercise Title</label><br />
                        <input type='text' className='form-input' name='eTitle' placeholder='Enter Title' value={eTitle} onChange={this.handleInputChange} /><br />
                      </div>

                      <div className='input-container'>
                      <label className='primary' htmlFor="exercise_category">Exercise Category</label><br />
                        <select className='form-select' name='eCategory' placeholder='Select Category' value={eCategory} onChange={this.handleInputChange}>
                          <option>Select</option>
                          <option value="C Syntax">C Syntax</option>
                          <option value="C Comments">C Comments</option>

                          <option value="C Variables">C Variables</option>

                          <option value="C Data Types">C Data Types</option>

                          <option value="C Constants">C Constants</option>

                          <option value="C Operators">C Operators</option>

                          <option value="C Booleans">C Booleans</option>

                          <option value="C If...Else">C If...Else</option>

                          <option value="C Switch">C Switch</option>

                          <option value="C Loops">C Loops</option>

                          <option value="C Arrays">C Arrays</option>

                          <option value="C Strings">C Strings</option>

                          <option value="C Pointers">C Pointers</option>

                          <option value="C Functions">C Functions</option>

                          <option value="C Structures">C Structures</option>
                          
                        </select><br />
                      </div>

                      <div className='input-container'>
                        <label className='primary'>Exercise About</label><br />
                        <input type='text' className='form-input' name='eAbout' placeholder='Enter About' value={eAbout} onChange={this.handleInputChange}></input><br />
                      </div>

                      <div className='input-container'>
                        <label className='primary' htmlFor="exercise_category">Exercise Under</label><br />
                        <select className='form-select' name='eUnder' placeholder='Select Category' value={eUnder} onChange={this.handleInputChange}>
                          <option>Select</option>
                          <option value="Beginners">Beginners</option>
                          <option value="Intermediate">Intermediate</option>
                        </select><br />
                      </div>
                    </div>

                    
                    {exercises.map((exercise, index) => (
                      <div className='containe-field' key={index}>
                        
                        <div className='close-btn-container'>
                        {index !== 0 && (
                          <FaTimes onClick={() => this.removeExercise(index)} className='close-container'/>
                        )}
                        </div>

                        {/* Exercise fields */}
                        <h5>Exercise {index + 1}</h5>


                        <div className='input-container'>
                        <label className='primary'>Exercise Question Paragraph </label><br />
                        <textarea
                          type='text'
                          className='form-textarea'
                          name='eParagrapgh'
                          placeholder='Enter Question Paragrapgh'
                          value={exercise.eParagrapgh}
                          onChange={(e) => this.handleExerciseInputChange(e, index)}
                        ></textarea><br />
                        </div>

                        <label>Exercise Question</label><br />
                        <textarea
                          type='text'
                          className='form-textarea'
                          name='eQuestion'
                          placeholder='Enter Question'
                          value={exercise.eQuestion}
                          onChange={(e) => this.handleExerciseInputChange(e, index)}
                        ></textarea><br />

                        <label>Exercise Answer</label><br />
                        <textarea
                          type='text'
                          className='form-textarea'
                          name='eAnswer'
                          placeholder='Enter Answer'
                          value={exercise.eAnswer}
                          onChange={(e) => this.handleExerciseInputChange(e, index)}
                        ></textarea><br />
                      </div>
                    ))}
                    <div className='button-success-1'>
                      <button className="btn btn-success" type='button' style={{ marginTop: "15px" }} onClick={this.addExercise}>
                        <i className="fa-regular fa-square-check" style={{ marginRight: "10px" }}></i>Add Another Exercise
                      </button>
                      <button className="btn btn-success" type='submit' style={{ marginTop: "15px", marginLeft: "10px" }}>
                        Submit
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>

          <div className='right-container'>
            <div>
              <div className='title-h2' style={{ alignItems: 'center' }}>
                <h2>Entered Details</h2>
              </div>
              <form className='form-in'>

                <p> {eTitle}</p>
                <p>{eCategory}</p>
                <p> {eAbout}</p>
                <p>{eUnder}</p>
                {/* Iterate over exercises to display entered details */}
                {exercises.map((exercise, index) => (
                  <div key={index}>
                    <h3>Exercise {index + 1}</h3>
                    <p>{exercise.eParagrapgh}</p>
                    <p> {exercise.eQuestion}</p>
                    <p>{exercise.eAnswer}</p>
                  </div>
                ))}
              </form>
            </div>
          </div>

        </div>
      </div>
    );
  }
}
