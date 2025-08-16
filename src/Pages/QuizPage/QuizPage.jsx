import { useState } from "react";
import Swal from "sweetalert2";
import {
  FaSmile,
  FaStar,
  FaThumbsUp,
  FaFrown,
  FaSadTear,
  FaCheck,
} from "react-icons/fa";
import ReactDOMServer from "react-dom/server";
import { questions } from "./questions";

const QuizPage = () => {
  const [current, setCurrent] = useState(0);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);

  const handleAnswer = (option) => {
    if (option === questions[current].correct) {
      setScore(score + 1);
    }

    if (current + 1 < questions.length) {
      setCurrent(current + 1);
    } else {
      setFinished(true);
      showResultAlert(
        score + (option === questions[current].correct ? 1 : 0),
        questions.length
      );
    }
  };

  const showResultAlert = (score, total) => {
    const percentage = (score / total) * 100;
    const wrong = total - score;
    let title = "";
    let iconHTML = "";

    if (percentage === 100) {
      title = "Congratulations!";
      iconHTML = ReactDOMServer.renderToStaticMarkup(
        <FaSmile className="text-4xl text-green-500 mx-auto mb-2" />
      );
    } else if (percentage >= 80) {
      title = "Very Good!";
      iconHTML = ReactDOMServer.renderToStaticMarkup(
        <FaStar className="text-4xl text-yellow-400 mx-auto mb-2" />
      );
    } else if (percentage >= 50) {
      title = "Good!";
      iconHTML = ReactDOMServer.renderToStaticMarkup(
        <FaThumbsUp className="text-4xl text-blue-500 mx-auto mb-2" />
      );
    } else if (percentage >= 30) {
      title = "Try Next Time!";
      iconHTML = ReactDOMServer.renderToStaticMarkup(
        <FaFrown className="text-4xl text-orange-400 mx-auto mb-2" />
      );
    } else {
      title = "Very Bad!";
      iconHTML = ReactDOMServer.renderToStaticMarkup(
        <FaSadTear className="text-4xl text-red-500 mx-auto mb-2" />
      );
    }

    Swal.fire({
      title: title,
      html: `
        ${iconHTML}
        <p>✅ Correct Answers: ${score}</p>
        <p>❌ Wrong Answers: ${wrong}</p>
        <p>Total Questions: ${total}</p>
      `,
      showConfirmButton: true,
    });
  };
  const handleQuizAgain = () => {
    setCurrent(0);
    setScore(0);
    setFinished(false);
  };

  if (finished) {
    return (
      <div className="text-center p-6">
        <h1 className="text-3xl font-bold mb-4">Quiz Finished!</h1>
        <p className="text-xl flex items-center justify-center gap-2">
          Check your result in the popup <FaCheck className="text-info" />
        </p>
        <button
          onClick={handleQuizAgain}
          className="bg-info  mt-6 text-white px-4 py-2 rounded hover:bg-sky-500"
        >
          Quiz Again
        </button>
      </div>
    );
  }

  const q = questions[current];

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h2 className="text-xl font-bold mb-4">{q.question}</h2>
      <div className="flex flex-col gap-3">
        {q.options.map((opt, idx) => (
          <button
            key={idx}
            onClick={() => handleAnswer(opt)}
            className="bg-info text-white p-2 rounded hover:bg-sky-500"
          >
            {opt}
          </button>
        ))}
      </div>
      {q.link && (
        <a
          href={q.link}
          target="_blank"
          rel="noopener noreferrer"
          className="block mt-4 text-sm text-blue-700 hover:underline"
        >
          See reference / real exam paper
        </a>
      )}
      <p className="mt-2 text-gray-600">
        Question {current + 1} of {questions.length}
      </p>
    </div>
  );
};

export default QuizPage;
