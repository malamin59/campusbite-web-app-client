import { useEffect } from "react";
import Swal from "sweetalert2";
import { FaSmile, FaStar, FaThumbsUp, FaFrown, FaSadTear, FaCheck } from "react-icons/fa";
import ReactDOMServer from "react-dom/server";

const ResultPage = ({ score, total, onRestart }) => {
  const wrong = total - score;
  const percentage = (score / total) * 100;

  const showAlert = () => {
    let title = "";
    let iconHTML = "";

    if (percentage === 100) {
      title = "Congratulations!";
      iconHTML = ReactDOMServer.renderToStaticMarkup(<FaSmile className="text-4xl text-green-500 mx-auto mb-2" />);
    } else if (percentage >= 80) {
      title = "Very Good!";
      iconHTML = ReactDOMServer.renderToStaticMarkup(<FaStar className="text-4xl text-yellow-400 mx-auto mb-2" />);
    } else if (percentage >= 50) {
      title = "Good!";
      iconHTML = ReactDOMServer.renderToStaticMarkup(<FaThumbsUp className="text-4xl text-blue-500 mx-auto mb-2" />);
    } else if (percentage >= 30) {
      title = "Try Next Time!";
      iconHTML = ReactDOMServer.renderToStaticMarkup(<FaFrown className="text-4xl text-orange-400 mx-auto mb-2" />);
    } else {
      title = "Very Bad!";
      iconHTML = ReactDOMServer.renderToStaticMarkup(<FaSadTear className="text-4xl text-red-500 mx-auto mb-2" />);
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

  // 🔹 Automatically show result popup when component mounts
  useEffect(() => {
    showAlert();
  }, []); // empty dependency → runs only once on mount

  return (
    <div className="text-center p-6">
      <h1 className="text-3xl font-bold mb-4">Quiz Finished!</h1>
      <p className="text-xl flex items-center justify-center gap-2">
        Your result is shown above <FaCheck className="text-info" />
      </p>
      <button
        onClick={onRestart}
        className="bg-info mt-6 text-white px-4 py-2 rounded hover:bg-sky-500"
      >
        Quiz Again
      </button>
    </div>
  );
};

export default ResultPage;
