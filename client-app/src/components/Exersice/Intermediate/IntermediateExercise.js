import React, { Component, useState } from "react";
import axios from "axios";
import Tesseract from "tesseract.js";
import "ace-builds/src-noconflict/theme-monokai";
import AceEditor from "react-ace";
import "ace-builds/src-noconflict/mode-c_cpp";
import "ace-builds/src-noconflict/theme-github";
import "../Beginners/beginner.css";
import swal from "sweetalert";
import HeaderToPage from "../../common/header/HeaderToPage";
import Loading from "../../../Loading";

// ace editor theme
import "ace-builds/src-noconflict/theme-ambiance";
import "ace-builds/src-noconflict/theme-chaos";
import "ace-builds/src-noconflict/theme-chrome";
import "ace-builds/src-noconflict/theme-clouds";
import "ace-builds/src-noconflict/theme-clouds_midnight";
import "ace-builds/src-noconflict/theme-cobalt";
import "ace-builds/src-noconflict/theme-crimson_editor";
import "ace-builds/src-noconflict/theme-dawn";
import "ace-builds/src-noconflict/theme-dracula";
import "ace-builds/src-noconflict/theme-dreamweaver";
import "ace-builds/src-noconflict/theme-eclipse";
import "ace-builds/src-noconflict/theme-github";
import "ace-builds/src-noconflict/theme-gob";
import "ace-builds/src-noconflict/theme-gruvbox";
import "ace-builds/src-noconflict/theme-idle_fingers";

// dark mood
import "ace-builds/src-noconflict/theme-chaos";
import "ace-builds/src-noconflict/theme-clouds_midnight";
import "ace-builds/src-noconflict/theme-dracula";
import "ace-builds/src-noconflict/theme-gob";
import "ace-builds/src-noconflict/theme-gruvbox";
import "ace-builds/src-noconflict/theme-idle_fingers";
import "ace-builds/src-noconflict/theme-merbivore";
import "ace-builds/src-noconflict/theme-merbivore_soft";
import "ace-builds/src-noconflict/theme-monokai";
import "ace-builds/src-noconflict/theme-pastel_on_dark";
import "ace-builds/src-noconflict/theme-solarized_dark";
import "ace-builds/src-noconflict/theme-tomorrow_night";



export default class IntermediateExercise extends Component {
    constructor(props) {
        super(props);
        this.state = {
          exerciseDetails: [],
          selectedCategory: "",
          selectedExercises: [],
    
          text: "",
          imageUrl: "",
          error: "",
          selectedExerciseIndex: null,
          inputValues: [],
          isCorrect: null,
          exerciseMainDetails: [],
          showAnswer: false,
          startButtonClicked: false, // Track whether the Start C Exercises button has been clicked
          loading: true,
        };
        this.leftContainerRef = React.createRef();
      }
    
      componentDidMount() {
        this.retrieveExerciseDetails();
        this.scrollToTop();
      }
    
      componentDidUpdate(prevProps, prevState) {
        if (prevState.selectedCategory !== this.state.selectedCategory) {
          this.scrollToTop();
        }
      }
    
      retrieveExerciseDetails() {
        axios
          .get(`http://localhost:8000/exercises/get/intermediate`)
          .then((res) => {
            if (res.data.success) {
              console.log("Exercise details:", res.data.existingDetails); // Check fetched exercise details
              const exercisesWithImageUrl = res.data.existingDetails.map(
                (exercise) => ({
                  ...exercise,
    
                  imageUrl: "", // Initialize imageUrl for each exercise
                })
              );
              this.setState({
                exerciseDetails: exercisesWithImageUrl,
                exerciseMainDetails: res.data.existingDetails,
                loading: false,
              });
            } else {
              console.error("Failed to fetch exercise details");
              this.setState({ loading: false }); // Set loading to false even if there's an error
            }
          })
          .catch((error) => {
            console.error("Error fetching exercise details:", error);
            this.setState({ loading: false }); // Set loading to false in case of an error
          });
    }
    
    
      clearImage = (exerciseIndex) => {
        this.setState((prevState) => {
            const updatedImageUrl = [...prevState.imageUrl];
            updatedImageUrl[exerciseIndex] = ""; // Clear imageUrl for the specific exercise
            return { imageUrl: updatedImageUrl };
        });
    };
    
      scrollToTop() {
        if (this.leftContainerRef.current) {
          const selectedButton = this.leftContainerRef.current.querySelector(
            ".selected-category-btn"
          );
          if (selectedButton) {
            const topPosition = selectedButton.offsetTop - 30; // Adjusted with a margin top of 30px
            this.leftContainerRef.current.scrollTop = topPosition;
          }
        }
      }
    
      handleInputChange = (event, exerciseIndex) => {
      const { value } = event.target;
      const { inputValues } = this.state;
    
      // Split the input value into words
      const words = value.split(/\s+/); // Split by whitespace
    
      // Ensure that each word in the input value does not exceed a certain length (e.g., 10 characters)
      const validatedWords = words.map(word => {
        if (word.length <= 10) {
          return word;
        } else {
          // Display an error message or handle the case where a word exceeds the allowed length
          // For example:
          swal("Error!", "One or more words exceed the maximum character limit.", "error");
          return ''; // Return an empty string for invalid words
        }
      });
    
      // Join the validated words back into a string
      const validatedValue = validatedWords.join(' ');
    
      // Update the inputValues array with the validated value for the specific exerciseIndex
      inputValues[exerciseIndex] = validatedValue;
      this.setState({ inputValues });
    };
    
      
    
      handleImageUpload = async (event, exerciseIndex) => {
        const file = event.target.files[0];
        if (!file) return;
    
        const { data } = await Tesseract.recognize(file, "eng", {
          logger: (m) => console.log(m),
        });
        let extractedText = data.text; // Extracted text without any modifications
    
        // Check if the extracted text contains keywords typical of a C program
        const isCProgram = this.isCProgramText(extractedText);
    
        if (!isCProgram) {
          // If the extracted text does not resemble a C program, display an error message
          swal("Error!", "Uploaded image does not contain a C program.", "error");
          return;
        }
    
        // Set the extracted text in the state
        this.setState({ text: extractedText });
    
        // Clear the imageUrl state
        this.setState((prevState) => {
          const updatedImageUrl = [...prevState.imageUrl];
          updatedImageUrl[exerciseIndex] = URL.createObjectURL(file); // Update imageUrl for the specific exercise
          return { imageUrl: updatedImageUrl };
        });
      };
    
      // Function to check if the extracted text resembles a C program
      isCProgramText = (text) => {
        // Check if the extracted text contains keywords typical of a C program
        const cKeywords = [
          "int",
          "void",
          "main",
          "printf",
          "scanf",
          "if",
          "else",
          "for",
          "while",
          "do",
          "#include",
          "#define",
          "return",
        ];
        for (let keyword of cKeywords) {
          if (text.toLowerCase().includes(keyword)) {
            return true;
          }
        }
        return false;
      };
    
      submitCheckAnswer = async () => {
        const {
          inputValues,
          selectedExercises,
          selectedExerciseIndex,
          imageUrl,
          text,
        } = this.state;
    
        if (
          !selectedExercises ||
          selectedExercises.length === 0 ||
          selectedExerciseIndex === null
        ) {
          console.error("No exercises selected or exercise index not set");
          return;
        }
    
        const currentExercise = selectedExercises[selectedExerciseIndex];
    
        if (!currentExercise) {
          console.error("Exercise not found");
          return;
        }
    
        // Check if both input field and image scan are empty
        if (
          (!inputValues[selectedExerciseIndex] ||
            inputValues[selectedExerciseIndex].trim() === "") &&
          !text &&
          !imageUrl[selectedExerciseIndex]
        ) {
          swal("Error!", "Please enter text or upload an image.", "error");
          return;
        }
    
        let userAnswer = currentExercise.eQuestion; // Initialize userAnswer with the exercise question
        let index = 0;
    
        // If input field is not empty, use its value
        if (
          inputValues[selectedExerciseIndex] &&
          inputValues[selectedExerciseIndex].trim() !== ""
        ) {
          // Replace placeholders (_) with user input values
          userAnswer = userAnswer.replace(/_/g, function () {
            const replacement = inputValues[selectedExerciseIndex][index];
            index = (index + 1) % inputValues[selectedExerciseIndex].length; // Move to the next element in the array
            return replacement;
          });
        } else if (text) {
          // If text is extracted from the image, use it
          userAnswer = text;
        } else {
          // If input field is empty, use the text extracted from the image upload
          const file = imageUrl[selectedExerciseIndex];
          const extractedText = await this.handleImageUpload(file);
          if (extractedText === null) {
            swal("Incorrect!", "Failed to recognize any text.", "error");
            return;
          }
          userAnswer = extractedText;
        }
    
        console.log("User Answer:", userAnswer);
    
        const correctAnswer = currentExercise.eAnswer.toLowerCase();
    
        console.log("Correct Answer:", correctAnswer);
    
        if (userAnswer.trim().toLowerCase() === correctAnswer) {
          swal("Correct!", "Your answer is correct.", "success");
          this.setState({ isCorrect: true });
        } else {
          // Display incorrect message when the input field values do not match the correct answer
          swal("Incorrect!", "Your answer is incorrect.", "error");
          this.setState({ isCorrect: false });
        }
      };
  render() {
    const {
        exerciseDetails,
        selectedCategory,
        selectedExercises,
        imageUrl,
        text,
        selectedExerciseIndex,
        isCorrect,
        showAnswer,
        startButtonClicked, // Destructure the startButtonClicked state variable
        loading,
      } = this.state;
  
      // Destructure loading from state
  
      // If loading, display the Loading component
      if (loading) {
        return <Loading loadingTime={6000} />;
      }
  
      console.log("Exercise details in state:", exerciseDetails);
      console.log("Selected exercises:", selectedExercises);
  
      const categoryOrder = [
        "C Syntax",
        "C Comments",
        "C Variables",
        "C Data Types",
        "C Constants",
        "C Operators",
        "C Booleans",
        "C If...Else",
        "C Switch",
        "C Loops",
        "C Arrays",
        "C Strings",
        "C Pointers",
        "C Functions",
        "C Structures",
      ];
    return (
        <div>
        <div className="bg">
          <HeaderToPage />
        </div>
        <div className="container-exercise-beginner">
          <div className="flex-container">
            <div className="left-container" ref={this.leftContainerRef}>
              <div className="scroll-list">
                {categoryOrder.map((category, index) => (
                  <div key={index}>
                    <button
                      className={
                        selectedCategory === category
                          ? "selected-category-btn"
                          : "category-btn"
                      }
                      onClick={() =>
                        this.setState({ selectedCategory: category })
                      }
                    >
                      {category}
                    </button>
                    {selectedCategory === category &&
                      exerciseDetails.map((exerciseDetail, exIndex) => {
                        if (exerciseDetail.eCategory === category) {
                          return (
                            <div key={exIndex}>
                              <button
                                className={
                                  selectedExerciseIndex === exIndex
                                    ? "exercise-btn-selected"
                                    : "exercise-btn"
                                }
                                onClick={() =>
                                  this.setState({
                                    selectedExercises: exerciseDetail.exercises,
                                    selectedExerciseIndex: exIndex,
                                  })
                                }
                              >
                                Exercise{" "}
                                {this.getExerciseIndex(category, exIndex) + 1}
                              </button>
                            </div>
                          );
                        }
                        return null;
                      })}
                  </div>
                ))}
              </div>
            </div>
            <div className="right-container">
              <div className="main-title-beg">
                <h1 className="title-beg">Exercise Section For Beginners</h1>
              </div>

              {!startButtonClicked && (
                <div className="start-full-dev">
                  <div>
                    <h4>
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
                      <button
                        className="start-btn-div"
                        onClick={() => {
                          const cSyntaxExercises =
                            this.state.exerciseDetails.find(
                              (category) => category.eCategory === "C Syntax"
                            );

                          if (
                            cSyntaxExercises &&
                            cSyntaxExercises.exercises.length > 0
                          ) {
                            this.setState({
                              selectedCategory: "C Syntax",
                              selectedExercises: cSyntaxExercises.exercises,
                              selectedExerciseIndex: 0,
                              startButtonClicked: true, // Update the state when the button is clicked
                            });
                          } else {
                            console.error(
                              "No exercises found for C Syntax category."
                            );
                          }
                        }}
                      >
                        Start C Exercises {">"}
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {selectedExercises.map((exercise, exerciseIndex) => (
                <div className="title-beg-container">
                  <div>
                    {/* Exercise Title */}
                    <h1 className="title-beg" style={{ textAlign: "center" }}>
                      {exercise.eTitle}
                    </h1>

                    {/* Question Section */}
                    <div className="sub-topic-beg">
                      <h3>Question :</h3>
                      <p className="exercise-p">{exercise.eParagrapgh}</p>
                      <hr/>
                    </div>
                    <div className="container-question">
                      <pre>
                        {exercise.eQuestion
                          .split("_")
                          .map((part, partIndex) => {
                            if (partIndex === 0) {
                              return <span key={partIndex}>{part}</span>;
                            } else {
                              return (
                                <React.Fragment key={partIndex}>
                                  <input
                                    type="text"
                                    placeholder=""
                                    className="q-input"
                                    onChange={(e) =>
                                      this.handleInputChange(e, exerciseIndex)
                                    }
                                    disabled={showAnswer} // Disable input when showAnswer is true
                                  />
                                  <span>&nbsp;</span>
                                  <span>{part}</span>
                                </React.Fragment>
                              );
                            }
                          })}
                      </pre>
                    </div>
                  </div>
                  <hr/>
                  <br />
                  <br />
                  <div className="scanned-answer">
    {/* Image Upload and Scanned Text Section */}
    <div className="right-top">
        <input
            type="file"
            accept="image/*"
            className="btn-success-choose"
            onChange={async (event) => {
                await this.handleImageUpload(event, exerciseIndex);
            }}
            disabled={showAnswer} // Disable image upload when showAnswer is true
        />
        {imageUrl[exerciseIndex] && (
            <div>
                <img
                    src={imageUrl[exerciseIndex]}
                    alt="Uploaded"
                    style={{
                        maxWidth: "300px",
                        borderRadius: "20px",
                        border: "2px solid #1a3f4b",
                        marginBottom: "10px",
                    }}
                />
                <button className="clear-answer-btn" onClick={() => this.clearImage(exerciseIndex)}>Clear Image</button>
            </div>
        )}
        <div className="scanned-text">
            <p>Scanned Text:</p>
            <pre>{text}</pre>
        </div>
    </div>
                    <div className="scanned-ace">
                      {/* Scanned Text Editor */}
                      <AceEditor
                        mode="c_cpp"
                        theme="Gob"
                        width="500px"
                        height="200px"
                        fontSize={18}
                        value={text}
                        onChange={(newValue) =>
                          this.setState({ text: newValue })
                        }
                        name={`ace-editor-${exerciseIndex}`}
                        editorProps={{ $blockScrolling: Infinity }}
                        style={{ marginBottom: "10px" }}
                        readOnly={showAnswer} // Make editor read-only when showAnswer is true
                      />
                    </div>
                  </div>
                  {/* Submit Answer and Show Answer Button */}
                  <button
                    className="submit-answer-btn"
                    onClick={this.submitCheckAnswer}
                    disabled={showAnswer} // Disable submit button when showAnswer is true
                  >
                    Submit Answer
                  </button>
                  <button
                    className="show-answer-btn"
                    onClick={() => this.setState({ showAnswer: !showAnswer })}
                  >
                    {showAnswer ? "Hide Answer" : "Show Answer"}
                  </button>
                  {/* Answer Display */}
                  {showAnswer && (
                    <div>
                      <AceEditor
                        mode="c_cpp"
                        theme="Gob"
                        width="500px"
                        height="150px"
                        fontSize={18}
                        value={exercise.eAnswer}
                        readOnly={true}
                        name={`ace-editor-${exerciseIndex}`}
                        editorProps={{ $blockScrolling: Infinity }}
                        style={{ marginBottom: "10px" }}
                      />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  getExerciseIndex(category, exIndex) {
    let index = 0;
    for (let i = 0; i < this.state.exerciseDetails.length; i++) {
      const detail = this.state.exerciseDetails[i];
      if (detail.eCategory === category) {
        if (i === exIndex) {
          return index;
        }
        index++;
      }
    }
    return -1;
  }
}

