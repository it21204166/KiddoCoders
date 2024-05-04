import React, { Component } from 'react';
import axios from 'axios';
import swal from 'sweetalert';
import Tesseract from 'tesseract.js';
import AceEditor from "react-ace";
import "ace-builds/src-noconflict/theme-gob";

import "../Beginners/beginner.css";

export default class ExerciseDisplayPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      exercise: null,
      loading: true,
      userAnswers: {},
      showSubmitMessage: false,
      selectedImage: null, // Store the selected image
      extractedText: "", // Store the extracted text from OCR
      showAnswer: false, // Flag to control the visibility of the answer
      selectedCategory: null // Track the selected category
    };
  }

  componentDidMount() {
    const { exerciseId } = this.props.match.params;
    this.fetchExerciseDetails(exerciseId);
  }

  fetchExerciseDetails = async (exerciseId) => {
    try {
      const response = await axios.get(`http://localhost:8000/exercise/get/beginners/${exerciseId}`);
      this.setState({
        exercise: response.data.exercise,
        loading: false
      });
    } catch (error) {
      console.error('Error fetching exercise details:', error);
      this.setState({ loading: false });
    }
  };

  handleInputChange = (exerciseId, exerciseIndex, value) => {
    this.setState(prevState => ({
      userAnswers: {
        ...prevState.userAnswers,
        [exerciseId]: {
          ...prevState.userAnswers[exerciseId],
          [exerciseIndex]: value
        }
      }
    }));
  };

  handleFileChange = (event) => {
    const file = event.target.files[0];
    this.setState({ selectedImage: file });
  };

  handleSubmit = () => {
    const { userAnswers, exercise, extractedText } = this.state;

    // Check answers from input fields if OCR is not performed
    if (extractedText === "") {
      let isCorrect = true;

      exercise.exercises.forEach((ex, index) => {
        const userAnswer = userAnswers[exercise._id] && userAnswers[exercise._id][index];
        const fullAnswer = ex.eAnswer;

        // Split the full answer by spaces
        const answerParts = fullAnswer.split(' ');

        // Remove parts of the answer that are already present in the question
        const filteredAnswerParts = answerParts.filter(part => !ex.eQuestion.includes(part));

        // Join the remaining answer parts back into a string
        const remainingAnswer = filteredAnswerParts.join(' ');

        // Check if the user's input matches the remaining answer
        if (userAnswer !== remainingAnswer) {
          isCorrect = false;
        }
      });

      // Show appropriate message based on correctness
      if (isCorrect) {
        swal("Correct!", "Your answers are correct.", "success");
      } else {
        swal("Incorrect!", "One or more answers are incorrect.", "error");
      }

      // Update the state to show the submit message
      this.setState({ showSubmitMessage: true });
    } else {
      // Check OCR extracted text against answer
      let isCorrect = this.checkAnswer(extractedText, exercise, userAnswers);

      // Show appropriate message based on correctness
      if (isCorrect) {
        swal("Correct!", "Your answer is correct.", "success");
      } else {
        swal("Incorrect!", "Your answer is incorrect.", "error");
      }

      // Update the state to show the submit message
      this.setState({ showSubmitMessage: true });
    }
  };

  handleScan = async (event, exerciseIndex) => {
    const file = event.target.files[0];
    if (!file) return;
  
    const { data } = await Tesseract.recognize(file, "eng", {
      logger: (m) => console.log(m),
    });
    let extractedText = data.text; // Extracted text without any modifications
  
    // Convert all lines to lowercase and filter out empty lines
    extractedText = extractedText.toLowerCase().split('\n').filter(line => line.trim() !== '').join('\n');
  
    // Check if the extracted text contains keywords typical of a C program
    const isCProgram = this.isCProgramText(extractedText);
  
    if (!isCProgram) {
      // If the extracted text does not resemble a C program, display an error message
      swal("Error!", "Uploaded image does not contain a C program.", "error");
      return;
    }
  
    // Update the state with the extracted and processed text
    this.setState({ extractedText });
  }
  


  // Function to check answer against extracted text and user input
  checkAnswer = (text, exercise, userAnswers) => {
    let isCorrect = false;

    // Check extracted text against answer
    exercise.exercises.forEach((ex, index) => {
      const fullAnswer = ex.eAnswer;
      const userAnswer = userAnswers[exercise._id] && userAnswers[exercise._id][index];

      // Check if the extracted text matches the answer
      if (text.trim() === fullAnswer.trim() || text.trim() === userAnswer.trim()) {
        isCorrect = true;
      }
    });

    return isCorrect;
  };

  toggleAnswer = () => {
    this.setState(prevState => ({
      showAnswer: !prevState.showAnswer
    }));
  };

  handleCategorySelect = (category) => {
    this.setState({ selectedCategory: category });
  };

  render() {
    const { exercise, loading, showSubmitMessage, extractedText, showAnswer, selectedCategory } = this.state;
    const categories = [
      'C Syntax', 'C Comments', 'C Variables', 'C Data Types', 'C Constants',
      'C Operators', 'C Booleans', 'C If...Else', 'C Switch', 'C Loops',
      'C Arrays', 'C Strings', 'C Pointers', 'C Functions', 'C Structures'
    ];

    return (
      <div className="exercise-details">
        <div className="sidebar">
          <h3>Exercise Categories</h3>
          <ul className="category-list">
            {categories.map((category, index) => (
              <li key={index} onClick={() => this.handleCategorySelect(category)} className={selectedCategory === category ? 'selected' : ''}>
                {category}
              </li>
            ))}
          </ul>
        </div>
        <div className="main-content">
          {loading ? (
            <p>Loading...</p>
          ) : exercise ? (
            <>
              <div className={`container-exercise-beginner ${showAnswer ? 'green-bg' : ''}`}>
                <div className="flex-container">
                  <div className="right-container">
                    <div className="main-title-beg">
                      <h1 className="title-beg">Exercise Section For Beginners</h1>
                    </div>
                    <div className="title-beg-container">
                      {!showAnswer && selectedCategory && (
                        <>
                          <h2>{selectedCategory}</h2>
                          <div>
                            <h3>Exercises:</h3>
                            {exercise.exercises.map((ex, index) => (
                              <div key={index}>
                                <p>Paragraph: {ex.eParagraph}</p>
                                <pre>
                                  <React.Fragment>
                                    {ex.eQuestion.split('_').map((part, partIndex, array) => (
                                      <React.Fragment key={partIndex}>
                                        {partIndex < array.length - 1 && <input type="text" defaultValue={part} onChange={(e) => this.handleInputChange(exercise._id, index, e.target.value)} />}
                                        {partIndex === array.length - 1 && <span>{part}</span>}
                                        {partIndex < array.length - 1 && <span>&nbsp;</span>}
                                      </React.Fragment>
                                    ))}
                                  </React.Fragment>
                                </pre>
                              </div>
                            ))}
                          </div>
                          <div>
                            <input type="file" accept="image/*" onChange={this.handleFileChange} />
                            <button onClick={this.handleScan}>Scan</button>
                            {this.state.imagePreview && <img src={this.state.imagePreview} alt="Preview" />}
                            <button onClick={this.handleSubmit}>Submit Answer</button>
                            <button onClick={this.toggleAnswer}>Show Answer</button>
                            {showSubmitMessage && (
                              <p>Thank you for submitting your answers!</p>
                            )}
                            <div>
                              <h3>Extracted Text:</h3>

                              <div>
                                <AceEditor
                                  mode="c_cpp"
                                  theme="Gob"
                                  width="500px"
                                  height="150px"
                                  fontSize={18}
                                  value={extractedText} // Use editedText if available
                                  onChange={this.handleEdit} // Handle text editing
                                  readOnly={false} // Allow editing
                                  editorProps={{ $blockScrolling: Infinity }}
                                  style={{ marginBottom: "10px" }}
                                />
                              </div>
                            </div>
                          </div>
                        </>
                      )}
                      {showAnswer && exercise.exercises.map((ex, index) => (
                        <div key={index}>
                          <div>
                            <p>Answer:</p>
                            <AceEditor
                              mode="c_cpp"
                              theme="Gob"
                              width="500px"
                              height="150px"
                              fontSize={18}
                              value={ex.eAnswer}
                              readOnly={true}
                              name={`ace-editor-${index}`}
                              editorProps={{ $blockScrolling: Infinity }}
                              style={{ marginBottom: "10px" }}
                            />
                          </div>
                          <button onClick={this.toggleAnswer}>Hide Answer</button>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <p>No exercise found</p>
          )}
        </div>
      </div>
    );
  }
}
