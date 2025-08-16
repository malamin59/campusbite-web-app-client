import { useState } from "react";
import { questions } from "./questions";
import QuestionCard from "./QuestionCard";
import ResultPage from "./ResultPage";

const QuizPage = () => {
  const [current, setCurrent] = useState(0);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);

  const handleAnswer = (option) => {
    if (option === questions[current].correct) setScore(score + 1);
    if (current + 1 < questions.length) setCurrent(current + 1);
    else setFinished(true);
  };

  const handlePrevious = () => {
    if (current > 0) setCurrent(current - 1);
  };

  const handleQuizAgain = () => {
    setCurrent(0);
    setScore(0);
    setFinished(false);
  };

  return (
    <>
      {finished ? (
        <ResultPage score={score} total={questions.length} onRestart={handleQuizAgain} />
      ) : (
        <QuestionCard
          question={questions[current]}
          current={current}
          total={questions.length}
          onAnswer={handleAnswer}
          onPrevious={handlePrevious}
        />
      )}
    </>
  );
};

export default QuizPage;
