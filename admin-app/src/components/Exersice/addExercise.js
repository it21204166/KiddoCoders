import React from 'react'

export default function addExercise() {
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
              
           
          </div>
        </div>
      </div>
  )
}
