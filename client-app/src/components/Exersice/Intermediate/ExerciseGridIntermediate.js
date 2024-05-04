import React, { Component } from 'react';
import axios from 'axios';
import { withRouter } from 'react-router-dom';

import '../Beginners/beginner.css';
import HeaderToPage from '../../common/header/HeaderToPage';
import swal from 'sweetalert';
import Tesseract from 'tesseract.js';
import AceEditor from "react-ace";
import "ace-builds/src-noconflict/mode-c_cpp";
import "ace-builds/src-noconflict/theme-gob";

class ExerciseGridIntermediate extends Component {
  constructor(props) {
    super(props);
    this.state = {
      exercisesByCategory: [],
      selectedCategory: null,
      exercise: null,
      loading: true,
      userAnswers: {},
      showSubmitMessage: false,
      selectedImage: null,
      extractedText: "",
      editedExtractedText: null, // Initialize editedExtractedText
      showAnswer: false,
      imagePreview: null
    };
  }

  componentDidMount() {
    this.fetchExercisesByCategory();
  }

  fetchExercisesByCategory = async () => {
    try {
      const response = await axios.get('http://localhost:8000/exercises/categories/intermediate');
      this.setState({ exercisesByCategory: response.data.exercisesByCategory });
    } catch (error) {
      console.error('Error fetching exercises grouped by category:', error);
    }
  };

  handleCategoryClick = async (category) => {
    try {
      const response = await axios.get(`http://localhost:8000/exercises/categories/intermediate/${category}`);
      const { exerciseDetails } = response.data;
      const cSyntaxExercises = exerciseDetails.find(category => category.eCategory === "C Syntax");
      const firstExercise = cSyntaxExercises?.exercises[0];

      if (firstExercise) {
        this.setState({ selectedCategory: category, exercise: firstExercise, loading: false });
      } else {
        console.error("No exercises found for C Syntax category.");
        this.setState({ selectedCategory: category, exercise: null, loading: false });
      }
    } catch (error) {
      console.error('Error fetching exercises for selected category:', error);
      this.setState({ selectedCategory: category, exercise: null, loading: false });
    }
  };

  handleExerciseClick = async (exerciseId) => {
    try {
      const response = await axios.get(`http://localhost:8000/exercise/get/intermediate/${exerciseId}`);
      this.setState({
        exercise: response.data.exercise,
        loading: false,
        selectedCategory: null
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

    // Extract text from all input fields
    const inputFieldValues = Object.values(userAnswers[exercise._id] || {}).join(' ');

    // Combine the extracted text and input field values
    const textToCheck = `${extractedText} ${inputFieldValues}`.trim();

    // Check the OCR-based answer
    let isCorrect = false;
    if (textToCheck === "") {
      // Check the user's text-based answers
      isCorrect = exercise.exercises.every((ex, index) => {
        const userAnswer = userAnswers[exercise._id] && userAnswers[exercise._id][index];
        const fullAnswer = ex.eAnswer;

        const answerParts = fullAnswer.split(' ');
        const filteredAnswerParts = answerParts.filter(part => !ex.eQuestion.includes(part));
        const remainingAnswer = filteredAnswerParts.join(' ');

        return userAnswer === remainingAnswer;
      });
    } else {
      // Check the OCR-based answer
      isCorrect = this.checkAnswer(textToCheck, exercise, userAnswers);
    }

    // Display appropriate message based on correctness
    if (isCorrect) {
      swal("Correct!", "Your answer is correct.", "success");
    } else {
      // Show an alert for incorrect extracted text
      swal("Incorrect Extracted Text!", "The extracted text does not match the correct answer.", "error");
    }

    this.setState({ showSubmitMessage: true });
  };

  handleScan = () => {
    const { selectedImage } = this.state;

    if (selectedImage) {
      const reader = new FileReader();

      reader.onload = (event) => {
        this.setState({ imagePreview: event.target.result });
      };

      reader.readAsDataURL(selectedImage);

      Tesseract.recognize(selectedImage, 'eng')
        .then(({ data: { text } }) => {
          // Check if the extracted text resembles a C program
          const isCProgram = this.isCProgramText(text);

          if (!isCProgram) {
            // If the text does not resemble a C program, display an error message
            swal("Not a C Program!", "The uploaded image does not contain a C program.", "error");
            return;
          }

          // Store the original extracted text
          const originalText = text.trim();
          console.log(originalText);

          // Store the extracted text in the state
          this.setState({ extractedText: originalText });
        })
        .catch(error => {
          console.error('Error performing OCR:', error);
          swal("Error!", "Failed to perform OCR.", "error");
        });
    } else {
      swal("No Image Selected!", "Please select an image first.", "warning");
    }
  };

  // Function to check if the extracted text resembles a C program
  isCProgramText = (text) => {
    // Implement your logic here to check if the text contains C programming keywords
    // This should be done while preserving comments
    // For example, you can check for the presence of common C syntax elements
    return text.includes("int") || text.includes("printf") || text.includes("return") || text.includes("//") || text.includes("/*") || text.includes("#include");
  };




  checkAnswer = (text, exercise, userAnswers) => {
    let isCorrect = false;

    exercise.exercises.forEach((ex, index) => {
      const fullAnswer = ex.eAnswer;
      const userAnswer = userAnswers[exercise._id] && userAnswers[exercise._id][index];

      if (text.trim() === fullAnswer.trim() || text.trim() === userAnswer.trim()) {
        isCorrect = true;
      }
    });

    return isCorrect;
  };

  handleStartExercise = async () => {
    const { exercisesByCategory } = this.state;
    const cSyntaxCategory = 'C Syntax';
    const cSyntaxExercises = exercisesByCategory.find(category => category._id === cSyntaxCategory)?.exercises;

    if (cSyntaxExercises && cSyntaxExercises.length > 0) {
      const firstExerciseId = cSyntaxExercises[0]._id;
      try {
        const response = await axios.get(`http://localhost:8000/exercise/get/intermediate/${firstExerciseId}`);
        this.setState({
          exercise: response.data.exercise,
          loading: false
        });
      } catch (error) {
        console.error('Error fetching exercise details:', error);
      }
    } else {
      console.error("No exercises found for C Syntax category.");
    }
  };

  toggleAnswer = () => {
    this.setState(prevState => ({
      showAnswer: !prevState.showAnswer
    }));
  };

  handleExtractedTextChange = (newText) => {
    this.setState({ extractedText: newText });
  };

  handleEdit = (newValue) => {
    this.setState({ editedExtractedText: newValue });
  };

  render() {
    const { exercisesByCategory, selectedCategory, exercise, loading, showSubmitMessage, extractedText, showAnswer, imagePreview } = this.state;
    const categories = [
      'C Syntax',
      'C Comments',
      'C Variables',
      'C Data Types',
      'C Constants',
      'C Operators',
      'C Booleans',
      'C If...Else',
      'C Switch',
      'C Loops',
      'C Arrays',
      'C Strings',
      'C Pointers',
      'C Functions',
      'C Structures'
    ];

    return (
      <div>
        <div className='bg'>
          <HeaderToPage />
        </div>
        <div className="sidebar">
          {categories.map((category, index) => {
            const categoryData = exercisesByCategory.find(item => item._id === category);
            return (
              <div key={index} className="category" onClick={() => this.handleCategoryClick(category)}>
                <h2>{category}</h2>
                <p>Exercise Count: {categoryData ? categoryData.exercises.length : 0}</p>
                {selectedCategory === category && (
                  <ul className="exercise-dropdown">
                    {exercisesByCategory.find((item) => item._id === category)?.exercises.map((exercise, index) => (
                      <li key={index} onClick={() => this.handleExerciseClick(exercise._id)}>
                        {exercise.eTitle}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            );
          })}
        </div>

        <div className="main-content-1">
          {loading ? (
            <div className="start-full-dev1">
              <div className="main-title-beg">
                <h1 className="title-beg">Exercise Section For Beginners</h1>
              </div>
              <div>
                <h4 style={{ marginTop: "10px" }}>
                  You can test your C skills with{" "}
                  <span>{"<KIDDO/CODERS>"}s' </span>Exercises.
                </h4>
                <hr />
                <h1>Exercises</h1>
                <p>
                  We have gathered a variety of C exercises (with answers)
                  for each C Chapter.
                </p>

                <p>
                  Try to solve an exercise by editing some code, or show the
                  answer to see what you've done wrong.
                </p>
                <hr />
                <h1>Count Your Score</h1>
                <p>
                  You will get 1 point for each correct answer. Your score
                  and total score will always be displayed.
                </p>

                <div className="start-div">
                  <div className="start-conte">
                    <h1>Start C Exercises</h1>
                    <p>Good luck!</p>
                  </div>
                  <button onClick={this.handleStartExercise}>Start Exercise</button>
                </div>
              </div>
            </div>
          ) : exercise ? (
            <div className='container-exercise-beginner '>
              <div className="flex-container">
                <div className="right-container">
                  <div className="main-title-beg">
                    <h1 className="title-beg">Exercise Section For Beginners</h1>
                  </div>
                  <div className={`title-beg-container ${showAnswer ? 'green-bg' : ''}`}>
                    {!showAnswer && exercise && (
                      <>
                        <h2>{exercise.eTitle}</h2>
                        <hr />
                        <div>
                          {exercise.exercises.map((ex, index) => (
                            <div key={index}>
                              <p>※ {ex.eParagraph}</p>
                              <hr />
                              <p>• Fill the blanks or choose the image</p>
                              <pre>
                                <React.Fragment>
                                  {ex.eQuestion.split('_').map((part, partIndex, array) => (
                                    <React.Fragment key={partIndex}>
                                      <span>{part}</span>
                                      {partIndex < array.length - 1 && <input type="text" defaultValue="" onChange={(e) => this.handleInputChange(exercise._id, index, e.target.value)} />}
                                    </React.Fragment>
                                  ))}
                                </React.Fragment>
                              </pre>
                            </div>
                          ))}
                        </div>
                        <div>
                          <hr />
                          <h3>Extracted Text:</h3>
                          <div className="container-row">

                            <div className='extracted-ace'>
                              <AceEditor
                                mode="c_cpp"
                                theme="Gob"
                                width="470px"
                                height="150px"
                                fontSize={18}
                                value={extractedText}
                                onChange={this.handleExtractedTextChange}
                                readOnly={false}
                                editorProps={{ $blockScrolling: Infinity }}
                                style={{ marginBottom: "10px" }}
                              />

                            </div>
                            <div className="file-upload-container">
                              <div className='img-prew-scan'>
                                {imagePreview && <img src={imagePreview} alt="Preview" />}
                              </div>
                              <input type="file" accept="image/*" className="input-file" onChange={this.handleFileChange} />


                            </div>
                            <div className='button-container'>
                              <button className="choose-button choose-button-overlay" onClick={() => document.querySelector('.input-file').click()}>Choose Image</button>
                              <button className='choose-button-scan' onClick={this.handleScan}>Scan The Image</button>
                            </div>



                          </div>








                          <div className='answer-dev-show'>

                            <button className='butn-show' onClick={this.toggleAnswer}>Show Answer</button>
                            <button className='butn' onClick={this.handleSubmit}>Submit Answer {'>'}</button>

                          </div>
                        </div>
                      </>
                    )}
                    {showAnswer && exercise && exercise.exercises.map((ex, index) => (
                      <div key={index}>
                        <div >
                          <div className='answer-dev-topic'>
                            <p>Answer:</p>
                          </div>
                          <div className='answer-dev'>
                            <AceEditor
                              mode="c_cpp"
                              theme="Gob"
                              width="750px"
                              height="235px"
                              fontSize={18}
                              value={ex.eAnswer}
                              readOnly={true}
                              name={`ace-editor-${index}`}
                              editorProps={{ $blockScrolling: Infinity }}
                              style={{ marginBottom: "10px" }}
                            />
                          </div>
                        </div>
                        <div className='answer-dev-hide'>
                          <button onClick={this.toggleAnswer}>Hide Answer</button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div style={{ display: "flex", justifyContent: "center" }}>
              <h1>Not Selected Exercise</h1>
              <h4>Loading...</h4>
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default withRouter(ExerciseGridIntermediate);
