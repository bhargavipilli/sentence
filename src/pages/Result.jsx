import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

const Result = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const userAnswers = location.state?.userAnswers || [];
  const questions = location.state?.questions || [];
  //const { userAnswers, questions } = location.state || { userAnswers: {}, questions: [] };

  const score = questions.reduce((total, question) => {
    const correctAnswer = question.correctAnswer;
    const userAnswer = userAnswers[question.questionId] || [];
    if (JSON.stringify(correctAnswer) === JSON.stringify(userAnswer)) {
      return total + 1;
    }
    return total;
  }, 0);

  const percentage = Math.round((score / questions.length) * 100);
  const radius = 45;
  const stroke = 10;
  const normalizedRadius = radius - stroke / 2;
  const circumference = 2 * Math.PI * normalizedRadius;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  const correctAnswers = questions.filter((q) =>
    JSON.stringify(userAnswers[q.questionId] || []) === JSON.stringify(q.correctAnswer)
  );
  const incorrectAnswers = questions.filter((q) =>
    JSON.stringify(userAnswers[q.questionId] || []) !== JSON.stringify(q.correctAnswer)
  );

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-6">
      <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-3xl text-center">
        <h1 className="text-3xl font-bold text-purple-600 mb-6">Quiz Results</h1>

        {/* Score Circle */}
        <div className="relative w-32 h-32 mx-auto mb-6">
          <svg height="100%" width="100%" viewBox="0 0 100 100" className="rotate-[-90deg]">
            <circle
              cx="50"
              cy="50"
              r={normalizedRadius}
              fill="transparent"
              stroke="#e5e7eb"
              strokeWidth={stroke}
            />
            <circle
              cx="50"
              cy="50"
              r={normalizedRadius}
              fill="transparent"
              stroke="#8b5cf6"
              strokeWidth={stroke}
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              strokeLinecap="round"
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-xl font-bold text-purple-700">
              {score} / {questions.length}
            </div>
          </div>
        </div>

        <p className="text-gray-600 mb-6">
          You got <span className="font-medium text-purple-700">{percentage}%</span> correct!
        </p>

        {/* Correct Answers Section */}
        <div className="text-left mb-6">
          <h2 className="text-lg font-semibold text-green-600 mb-2">✔️ Correct Answers</h2>
          {correctAnswers.length === 0 ? (
            <p className="text-sm text-gray-500">No correct answers</p>
          ) : (
            correctAnswers.map((question, index) => (
              <div key={question.questionId} className="mb-4 bg-green-50 p-3 rounded-md">
                <p className="font-medium text-gray-800">
                  {index + 1}. {question.question}
                </p>
                <p className="text-sm text-green-600">
                  Your Answer: {userAnswers[question.questionId].join(", ")}
                </p>
              </div>
            ))
          )}
        </div>

        {/* Incorrect Answers Section */}
        <div className="text-left mb-6">
          <h2 className="text-lg font-semibold text-red-600 mb-2">❌ Incorrect Answers</h2>
          {incorrectAnswers.length === 0 ? (
            <p className="text-sm text-gray-500">No incorrect answers</p>
          ) : (
            incorrectAnswers.map((question, index) => (
              <div key={question.questionId} className="mb-4 bg-red-50 p-3 rounded-md">
                <p className="font-medium text-gray-800">
                  {index + 1}. {question.question}
                </p>
                <p className="text-sm text-red-600">
                  Your Answer: {(userAnswers[question.questionId] || []).join(", ")}
                </p>
                <p className="text-sm text-gray-600">
                  Correct Answer: {question.correctAnswer.join(", ")}
                </p>
              </div>
            ))
          )}
        </div>

        <button
          onClick={() => navigate("/")}
          className="mt-4 px-6 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700"
        >
          Go to Home
        </button>
      </div>
    </div>
  );
};

export default Result;
