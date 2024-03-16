import React, { Component } from 'react';
import axios from 'axios';
import '../Exersice/exersice.css';

class Exercise extends Component {
  constructor(props) {
    super(props);
    this.state = {
      questions: [
        { questionText: '', blankQuestion: [''], blankAnswer: [''] } // Initial state with one question
      ]
    };
  }

  handleAddQuestion = () => {
    this.setState((prevState) => ({
      questions: [...prevState.questions, { questionText: '', blankQuestion: [''], blankAnswer: [''] }]
    }));
  };

  handleInputChange = (index, field, value,) => {
    const newQuestions = [...this.state.questions];
    newQuestions[index][field] = value;
    this.setState({ questions: newQuestions });

  };

  handleBlankSpaceChange = (questionIndex, type, blankSpaceIndex, value) => {
    const newQuestions = [...this.state.questions];
    newQuestions[questionIndex][type][blankSpaceIndex] = value;
    this.setState({ questions: newQuestions });
  };

  handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:8000/exersice/post', { questions: this.state.questions });
      alert('Questions added successfully');
      // Reset to one empty question after submission
      this.setState({ questions: [{ questionText: '', blankQuestion: [''], blankAnswer: [''] }] });
    } catch (error) {
      console.error('Error adding questions:', error);
      alert('Failed to add questions');
    }
  };

  renderReplacedQuestion = (question) => {
    let replacedQuestion = question.questionText;
    // Replace underscores with input fields
    const parts = replacedQuestion.split(/(_+)/);
    let output = [];
    parts.forEach((part, index) => {
      if (part === '_') {
        output.push(
          <div key={index}>
            <input
              type='text'
              value={question.blankQuestion[index] || ''}
              onChange={(e) => this.handleBlankSpaceChange(this.state.questions.indexOf(question), 'blankQuestion', index, e.target.value)}
              required
            />
            <br />
          </div>
        );
      } else {
        output.push(<span key={index}>{part}</span>);
        if (index < parts.length - 1 && parts[index + 1] !== '_') {
          output.push(<br key={index + '-br'} />);
        }
      }
    });
    return output;
  };

  renderQuestions = () => {
    return this.state.questions.map((question, index) => (
      <div key={index}>
        <label>{index + 1}:</label><br />
        {this.renderQuestionSpaces(index)}
        <label>Question :</label><br />
        <input
          type='text'
          value={question.questionText}
          onChange={(e) => this.handleInputChange(index, 'questionText', e.target.value)}
          placeholder='Enter question'
          required
        /><br />
        {this.renderAnswerSpaces(index)}
      </div>
    ));
  };

  renderQuestionSpaces = (questionIndex) => {
    return this.state.questions[questionIndex].blankQuestion.map((blankQuestion, index) => (
      <div key={index}>
        <label>Question Topic:</label><br />
        {blankQuestion.includes('_') ? ( // Check if '_' is present in the blankQuestion
          this.renderReplacedQuestion({ questionText: blankQuestion, blankQuestion: [''] }) // Render input fields
        ) : (
          <input
            type='text'
            value={blankQuestion}
            onChange={(e) => this.handleBlankSpaceChange(questionIndex, 'blankQuestion', index, e.target.value)}
            placeholder='Question Topic'
            required
          />
        )}
        <br />
      </div>
    ));
  };

  renderAnswerSpaces = (questionIndex) => {
    return this.state.questions[questionIndex].blankAnswer.map((blankAnswer, index) => (
      <div key={index}>
        <label>Answer :</label><br />
        <input
          type='text'
          value={blankAnswer}
          onChange={(e) => this.handleBlankSpaceChange(questionIndex, 'blankAnswer', index, e.target.value)}
          placeholder='Answer'
          required
        /><br />
      </div>
    ));
  };

  render() {
    return (
      <div>
        <div className='topic'>
          <h2 className='topic-txt'>Exercise Management</h2>
        </div>
        <div className='main-exercise'>
          <div className='left-container'>
            <form onSubmit={this.handleSubmit}>
              {this.renderQuestions()}
              <button type='button' onClick={this.handleAddQuestion}>Add Question</button><br />
              <button type='submit'>Add Questions</button>
            </form>
          </div>
          <div className='right-container'>
            <h3>Exercise:</h3>
            {/* Display entered details here */}
            {this.state.questions.map((question, index) => (
              <div key={index}>
                <h4>{index + 1}:</h4>
                <p>Question Topic:<br/> {question.blankQuestion.join(', ')}</p>
                <p>Question:<br/> {this.renderReplacedQuestion(question)}</p>
                <p>Answers:<br/> {question.blankAnswer.join(', ')}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }
}

export default Exercise;
