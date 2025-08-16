import Marquee from "react-fast-marquee";
import { FaCheckCircle, FaLightbulb, FaTrophy, FaBookOpen } from "react-icons/fa";

const QuestionCard = ({ question, current, total, onAnswer, onPrevious }) => {
  return (
    <div className="p-6 mt-4 max-w-xl mx-auto border rounded-xl shadow-md bg-white">
      {/* 🔥 Marquee Section */}
      <Marquee
        gradient={false}
        speed={50}
        className="mb-4 text-lg font-semibold text-sky-700"
      >
        <span className="flex items-center gap-2 mr-10">
          <FaCheckCircle className="text-green-500" /> Welcome to the Quiz!
        </span>
        <span className="flex items-center gap-2 mr-10">
          <FaLightbulb className="text-yellow-500" /> Try your best and think
          smart
        </span>
        <span className="flex items-center gap-2 mr-10">
          <FaTrophy className="text-orange-500" /> Good luck champion!
        </span>
      </Marquee>

      {/* Question */}
      <h2 className="text-xl font-bold mb-4 text-gray-800">
        {question.question}
      </h2>

      {/* Options */}
      <div className="flex flex-col gap-3">
        {question.options.map((opt, idx) => (
          <button
            key={idx}
            onClick={() => onAnswer(opt)}
            className="flex items-center gap-2 bg-sky-500 text-white p-3 rounded-lg hover:bg-sky-600 transition-colors duration-200"
          >
            <FaCheckCircle className="opacity-80" /> {opt}
          </button>
        ))}
      </div>

      {/* Navigation */}
      <div className="flex gap-4 mt-6">
        {current > 0 && (
          <button
            onClick={onPrevious}
            className="bg-gray-300 text-black px-4 py-2 rounded hover:bg-gray-400 transition-colors duration-200"
          >
            Previous
          </button>
        )}
      </div>

      {/* Reference Link */}
      {question.link && (
        <a
          href={question.link}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 mt-4 text-sm text-blue-600 hover:underline"
        >
          <FaBookOpen /> See reference / real exam paper
        </a>
      )}

      {/* Progress */}
      <p className="mt-3 text-gray-700 font-medium">
        Question {current + 1} of {total}
      </p>
    </div>
  );
};

export default QuestionCard;
