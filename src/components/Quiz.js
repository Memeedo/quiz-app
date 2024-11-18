import React, { useState, useEffect } from 'react';
import Question from './Question';
import Result from './Result';
import Progressbar from './Progressbar';
import './Quiz.css';

const questions = [
  {
    questionText: 'Which team won the NBA Championship in 2024?',
    options: [
      { answerText: 'Denver Nuggets', isCorrect: false },
      { answerText: 'Miami Heat', isCorrect: false },
      { answerText: 'Golden State Warriors', isCorrect: false },
      { answerText: 'Boston Celtics', isCorrect: true },
    ],
  },
  {
    questionText: 'Which team won the NBA Championship in 2023?',
    options: [
      { answerText: 'Denver Nuggets', isCorrect: true },
      { answerText: 'Miami Heat', isCorrect: false },
      { answerText: 'Golden State Warriors', isCorrect: false },
      { answerText: 'Boston Celtics', isCorrect: false },
    ],
  },
  {
    questionText: 'Which team claimed the NBA title in 2022?',
    options: [
      { answerText: 'Golden State Warriors', isCorrect: true },
      { answerText: 'Boston Celtics', isCorrect: false },
      { answerText: 'Milwaukee Bucks', isCorrect: false },
      { answerText: 'Phoenix Suns', isCorrect: false },
    ],
  },
  {
    questionText: 'Which team won the NBA Championship in 2021?',
    options: [
      { answerText: 'Milwaukee Bucks', isCorrect: true },
      { answerText: 'Phoenix Suns', isCorrect: false },
      { answerText: 'Los Angeles Lakers', isCorrect: false },
      { answerText: 'Atlanta Hawks', isCorrect: false },
    ],
  },
  {
    questionText: 'Which team won the NBA title in 2020?',
    options: [
      { answerText: 'Los Angeles Lakers', isCorrect: true },
      { answerText: 'Miami Heat', isCorrect: false },
      { answerText: 'Toronto Raptors', isCorrect: false },
      { answerText: 'Boston Celtics', isCorrect: false },
    ],
  },
  {
    questionText: 'Which team was the runner-up in the NBA Finals in 2022?',
    options: [
      { answerText: 'Boston Celtics', isCorrect: true },
      { answerText: 'Golden State Warriors', isCorrect: false },
      { answerText: 'Miami Heat', isCorrect: false },
      { answerText: 'Milwaukee Bucks', isCorrect: false },
    ],
  },
];

function Quiz() {
  const [answers, setAnswers] = useState(Array(questions.length).fill(null));
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(120); // Timer state (120 seconds)
  const [isDisabled, setIsDisabled] = useState(false); // State for disabling the submit button

  const answeredCount = answers.filter((answer) => answer !== null).length;
  const progress = Math.round((answeredCount / questions.length) * 100);

  // Timer logic using useEffect
  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      setIsDisabled(true); // Disable the submit button when the time runs out
    }
  }, [timeLeft]);

  const handleAnswerOptionClick = (questionIndex, isCorrect) => {
    const newAnswers = [...answers];
    if (newAnswers[questionIndex] === null) {
      newAnswers[questionIndex] = isCorrect;
      setAnswers(newAnswers);
    }
  };

  const handleSubmit = () => {
    const newScore = answers.filter((answer) => answer === true).length;
    setScore(newScore);
    setShowResult(true);
  };

  return (
    <div className="quiz">
      {showResult ? (
        <Result score={score} totalQuestions={questions.length} />
      ) : (
        <div>
          <h2>NBA Quiz</h2>
          <Progressbar progress={progress} />
          <p>Time Left: {timeLeft} seconds</p> {/* Display remaining time */}
          {questions.map((question, index) => (
            <Question
              key={index}
              question={question}
              questionIndex={index}
              handleAnswerOptionClick={handleAnswerOptionClick}
            />
          ))}
          <button
            className="submit-button"
            onClick={handleSubmit}
            disabled={isDisabled} // Disable button when time runs out
          >
            Submit
          </button>
          {isDisabled && <p style={{ color: 'red' }}>Time is up! You cannot submit the quiz.</p>}
        </div>
      )}
    </div>
  );
}

export default Quiz;
