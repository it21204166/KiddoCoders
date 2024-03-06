import "./App.css";
import Sidebar from "../src/components/Sidebar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";


// Geeshan Imports
import ExersicePage from "./components/Exersice/Exersice";
import Selflearning from "./components/Exersice/SelfLearning"


// Yoshitha Imports
import BeginnersPage from "./components/Tutorials/Beginners"
import IntermediatePage from "./components/Tutorials/Intermediate";

// Dhanuka Imports


// Nethma Imports
import ChallengePage from "./components/Challenges/Challenge"



function App(){
  return(
    <Router>
        <Sidebar />
        <Routes>
            

            {/* Geeshan Routes */}
            <Route path='/exersice' element={<ExersicePage/>} />
            <Route path='/selflearning' element={<Selflearning/>} />


            {/* Yoshitha Routes */}
            <Route path='/tutorials/beginners' element={<BeginnersPage/>} />
            <Route path='/tutorials/intermediate' element={<IntermediatePage/>} />


            {/* Nethma Routes */}
            <Route path='/challenge' element={<ChallengePage/>} />


            {/* Dhanuka Routes */}
            
        </Routes>

    </Router>
  );
}

export default App;