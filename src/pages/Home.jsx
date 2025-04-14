import React from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const nav = useNavigate();
  const handleStart = () => {
    nav("/quiz");
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white text-gray-800 p-4">
      <div
        className="text-center max-w-lg p-6 border-2 border-purple-600 rounded-lg shadow-lg transition-all duration-300 hover:shadow-xl hover:border-purple-800 focus-within:ring-2 focus-within:ring-purple-300"
        tabIndex={0} // Makes the div focusable
      >
        <div className="text-3xl font-bold text-purple-800 mb-4">Sentence Construction</div>
        <p className="text-gray-500 break-words mb-6">
          Select the correct words to complete the sentence by arranging the
          provided options in the right order.
        </p>

        <div className="flex justify-around w-full max-w-md mb-6 text-sm text-gray-700">
          <div className="flex flex-col items-center">
            <span className="font-medium text-purple-600">Time Per Question</span>
            <span>30 sec</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="font-medium text-purple-600">Total Questions</span>
            <span>10</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="font-medium text-purple-600">Coins</span>
            <span className="text-black-500 ">● 0</span>
          </div>
        </div>

        <div className="flex justify-center">
          <button
            className="px-6 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 focus:ring-4 focus:ring-purple-300"
            onClick={handleStart}
          >
            Start
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;