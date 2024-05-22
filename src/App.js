import React,{useState} from "react";
import {QUESTIONS as questions} from "./questions";
import Questionnaire from "./components/Questionnaire";

const App = ()=> {
  // Will get scores stored in local storage and return scores
  const getStoredScores = () => {
    const scores = localStorage.getItem('scores');
    return scores ? JSON.parse(scores) : [];
  };

  // Will set updated scores in local storage
  const storeScores = (scores) => {
    localStorage.setItem('scores', JSON.stringify(scores));
  };

  //lazy initilization with localStorage 'scores'
  const [scores, setScores] = useState(()=>getStoredScores());

  // callback for submitted questions and will calculate, update and store scores
  const submittedData = (data)=>{
    const yesCount = data.filter(answer => answer === 'yes').length;
    const score = (100 * yesCount) / Object.keys(questions).length;
    const newScores = [...scores, score];
    setScores(newScores);
    storeScores(newScores);
  };

  // function to calculate average for scores
  const calculateAverageScore = () => {
    const total = scores.reduce((acc, score) => acc + score, 0);
    return scores.length ? total / scores.length : 0;
  };

  // function to reset all scores and will remove score from local store
  const resetAll = () => {
    setScores([]);
    storeScores([]);
    localStorage.removeItem('scores')
  };

return (
      <div className="main__wrap">
        <main className="container">
          <div>
            <Questionnaire onSubmit={submittedData}/>
          </div>
          <div>
        <h2>Latest Score: {scores.length ? scores[scores.length - 1] : 'N/A'}</h2>
        <h2>Average Score: {calculateAverageScore().toFixed(2)}</h2>
        <h2>Total re run: {scores.length}</h2>
        <div><button onClick={resetAll}>Reset</button></div>
      </div>
        </main>
      </div>
    );
  }

export default App;
