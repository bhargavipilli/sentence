import React from "react"
import Home from './pages/Home';
import SentenceQuiz from "./pages/SentenceQuiz";
import Result from "./pages/Result";
import Quit from "./pages/Quit";
import { BrowserRouter as Router,Routes,Route } from "react-router-dom";
function App() {
  

  return (
   <Router>
    <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/quiz" element={<SentenceQuiz/>}/>
      <Route path="/score" element={<Result />} />
      <Route path="/quit" element={<Quit />} />
    </Routes>
   </Router>
  )
}

export default App
