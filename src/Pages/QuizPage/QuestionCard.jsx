import { FaCheck } from "react-icons/fa";

const QuestionCard = ({ question, current, total, onAnswer, onPrevious }) => {
  return (
    <div className="p-6 max-w-xl mx-auto">
      <h2 className="text-xl font-bold mb-4">{question.question}</h2>
      <div className="flex flex-col gap-3">
        {question.options.map((opt, idx) => (
          <button key={idx} onClick={() => onAnswer(opt)} className="bg-info text-white p-2 rounded hover:bg-sky-500">
            {opt}
          </button>
        ))}
      </div>

      <div className="flex gap-4 mt-4">
        {current > 0 && (
          <button onClick={onPrevious} className="bg-gray-300 text-black px-4 py-2 rounded hover:bg-gray-400">
            Previous
          </button>
        )}
      </div>

      {question.link && (
        <a href={question.link} target="_blank" rel="noopener noreferrer" className="block mt-4 text-sm text-blue-700 hover:underline">
          See reference / real exam paper
        </a>
      )}

      <p className="mt-2 text-gray-600">
        Question {current + 1} of {total}
      </p>
    </div>
  );
};

export default QuestionCard;
