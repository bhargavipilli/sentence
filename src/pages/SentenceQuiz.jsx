import React, { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import questionData from './questionData.json';
import { useNavigate } from 'react-router-dom';

const SentenceQuiz = () => {
  const nav = useNavigate();
  const questions = questionData.data.questions;
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [timer, setTimer] = useState(30);
  const [selectedWords, setSelectedWords] = useState([]);
  const [userAnswers, setUserAnswers] = useState({});
  
  const question = questions[currentQuestionIndex];

  
  useEffect(() => {
    const interval = setInterval(() => {
      setTimer((prev) => {
        if (prev === 1) {
          const updatedAnswers = {
            ...userAnswers,
            [question.questionId]: selectedWords
          };
          setUserAnswers(updatedAnswers);
          setSelectedWords([]);
          toast.warn("Time's up! Moving to next question.");
          handleNext();
          return 30;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [currentQuestionIndex]);

  const handleWordClick = (word) => {
    if (selectedWords.includes(word)) {
      const updated = selectedWords.filter((w) => w !== word);
      setSelectedWords(updated);
      toast.info(`"${word}" removed`);
    } else {
      if (selectedWords.length < question.correctAnswer.length) {
        const updated = [...selectedWords, word];
        setSelectedWords(updated);
        toast.success(`"${word}" selected`);
      } else {
        toast.error(`You can only select ${question.correctAnswer.length} words!`);
      }
    }
  };

  const handleNext = () => {
    const updatedAnswers = {
      ...userAnswers,
      [question.questionId]: selectedWords
    };
    setUserAnswers(updatedAnswers);
    setSelectedWords([]);

    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setTimer(30);
    } else {
      toast.success("Quiz Completed!");
      setTimeout(() => {
        nav("/score", { state: { userAnswers: updatedAnswers, questions } });
      }, 2000);
    }
  };

  const renderSentence = () => {
    const parts = question.question.split("_____________");
    return parts.map((part, i) => (
      <span key={i}>
        {part}
        {i < selectedWords.length ? (
          <span className="underline font-semibold text-purple-600 mx-1">
            {selectedWords[i]}
          </span>
        ) : (
          <span className="underline text-gray-400 mx-1">_</span>
        )}
      </span>
    ));
  };

  const handleQuit = () => {
    nav("/quit", {
      state: {
        userAnswers, // user’s selected answers
        questions,   // all quiz questions
      },
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6 relative">
      <ToastContainer autoClose={1000} />
      <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-2xl">
        <div className="flex justify-between items-center mb-4">
          <span className="text-gray-700 font-semibold text-lg">
            0:{timer.toString().padStart(2, '0')}
          </span>
          <button
            className="text-gray-400 hover:text-red-500 font-medium"
            onClick={handleQuit}
          >
            Quit
          </button>
        </div>

        <div className="flex space-x-1 mb-6">
          {questions.map((_, i) => (
            <div
              key={i}
              className={`h-1 flex-1 rounded ${i <= currentQuestionIndex ? 'bg-purple-500' : 'bg-gray-200'}`}
            />
          ))}
        </div>

        <p className="text-center text-gray-700 mb-4">
          Select the missing words in the correct order
        </p>

        <p className="text-lg text-center text-gray-800 font-medium mb-6">
          {renderSentence()}
        </p>

        <div className="flex flex-wrap gap-3 justify-center mb-4">
          {question.options.map((word) => (
            <button
              key={word}
              onClick={() => handleWordClick(word)}
              className={`px-4 py-2 rounded-lg border font-medium ${
                selectedWords.includes(word)
                  ? 'bg-purple-500 text-white border-purple-600'
                  : 'border-purple-500 text-purple-700 hover:bg-purple-100'
              }`}
            >
              {word}
            </button>
          ))}
        </div>

        <div className="flex justify-end">
          <button
            onClick={handleNext}
            className={`px-5 py-2 rounded-lg text-white font-medium transition ${
              timer <= 5 ? 'bg-red-600 hover:bg-red-700' : 'bg-purple-600 hover:bg-purple-700'
            }`}
          >
            →
          </button>
        </div>
      </div>

      
       
    </div>
  );
};

export default SentenceQuiz;
