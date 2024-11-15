import React from 'react';
import './Quiz.css'; // Make sure to import the new CSS file

const Quiz = () => {
  return (
    <div className="quiz-container">
      <h1 className="quiz-title">Quiz Time!</h1>
      
      <div className="question-section">
        <p className="question-text">What is the capital of France?</p>
        <div className="options">
          <button className="option">A. Berlin</button>
          <button className="option">B. Madrid</button>
          <button className="option">C. Paris</button>
          <button className="option">D. Rome</button>
        </div>
      </div>

      <div className="quiz-footer">
        <span className="progress-text">Question 1 of 10</span>
        <button className="submit-button">Submit Answer</button>
      </div>
    </div>
  );
};

export default Quiz;
