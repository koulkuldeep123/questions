import React,{useState} from "react";
import {QUESTIONS as questions} from "./questions";
import Question from "./Question";

const App = ()=> {

  
  const getStoredScores = () => {
    const scores = localStorage.getItem('scores');
    return scores ? JSON.parse(scores) : [];
  };
  const storeScores = (scores) => {
    localStorage.setItem('scores', JSON.stringify(scores));
  };

  const [scores, setScores] = useState(()=>getStoredScores());
  const submittedData = (data)=>{
    const yesCount = data.filter(answer => answer === 'yes').length;
    const score = (100 * yesCount) / Object.keys(questions).length;
    const newScores = [...scores, score];
    setScores(newScores);
    storeScores(newScores);
  };

  const calculateAverageScore = () => {
    const total = scores.reduce((acc, score) => acc + score, 0);
    return scores.length ? total / scores.length : 0;
  };

  const resetAll = () => {
    setScores([]);
    storeScores([]);
    localStorage.removeItem('scores')
  };

return (
      <div className="main__wrap">
        <main className="container">
          <div>
            <Question onSubmit={submittedData}/>
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
