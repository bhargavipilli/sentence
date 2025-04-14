import { useLocation, useNavigate } from "react-router-dom";

const Quit = () => {
  const navigate = useNavigate();
  const state=useLocation();
  const userAnswers = location.state?.userAnswers || [];
  const questions = location.state?.questions || [];

  const handleViewResults = () => {
    navigate("/score", {
      state: {
        userAnswers,
        questions,
      },
    });
  };


  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-purple-100">
      <h1 className="text-3xl font-bold text-purple-700 mb-8">Are you sure you want to quit?</h1>
      <div className="space-x-4">
      <button
          onClick={handleViewResults}
          className="px-6 py-2 bg-gray-300 text-gray-700 rounded-2xl shadow hover:bg-gray-400 transition"
        >
          View Results
        </button>
        <button
          onClick={() => navigate("/")}
          className="px-6 py-2 bg-gray-300 text-gray-700 rounded-2xl shadow hover:bg-gray-400 transition"
        >
          Go to Home Page
        </button>
      </div>
    </div>
  );
};

export default Quit;
