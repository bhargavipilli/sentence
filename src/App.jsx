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
      
      <Route path="/quiz" element={<SentenceQuiz/>}/>
      <Route path="/score" element={<Result />} />
      <Route path="/quit" element={<Quit />} />
      <Route path="/sentence/" element={<Home />} /> 

    </Routes>
   </Router>
  )
}

export default App
