// src/components/Questionnaire.js
import React, { useState } from 'react';
import {QUESTIONS as questions} from './questions'

const Question = ({ onSubmit }) => {
  const [answers, setAnswers] = useState([]);

  const handleAnswer = (index, answer) => {
    const newAnswers = [...answers];
    newAnswers[index] = answer;
    setAnswers(newAnswers);
  };

  const handleSubmit = () => {
      onSubmit(answers);
  };

  return (
    <div>
      {Object.entries(questions).map(([key, question], index) => (
        <div key={key}>
          <p>{question}</p>
          <label>
            <input
              type="radio"
              name={`question-${index}`}
              value="yes"
              checked={answers[index] === 'yes'}
              onChange={() => handleAnswer(index, 'yes')}
            />
            Yes
          </label>
          <label>
            <input
              type="radio"
              name={`question-${index}`}
              value="no"
              checked={answers[index] === 'no'}
              onChange={() => handleAnswer(index, 'no')}
            />
            No
          </label>
        </div>
      ))}
      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
};

export default Question;
