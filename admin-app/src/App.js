import React from "react";
import Sidebar from "../src/components/Sidebar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Geeshan Imports
import ExersicePage from "./components/Exersice/Exersice";
import AddExercise from "./components/Exersice/AddExercise"
import Selflearning from "./components/Exersice/SelfLearning";

// Yoshitha Imports
import BeginnersPage from "./components/Tutorials/Beginners";
import IntermediatePage from "./components/Tutorials/Intermediate";

// Nethma Imports
import ChallengePage from "./components/Challenges/Challenge";

// Dhanuka Imports
import SignInAdmin from "./components/authadmin/SignInAdmin";
import SignUpAdmin from "./components/authadmin/SignUpAdmin";
import ProfileAdmin from "./components/authadmin/ProfileAdmin";

function App() {
  return (
    <Router>
      <Sidebar />
      <Routes>
        {/* Geeshan Routes */}
        <Route path="/exercisemanagement/exercise" element={<ExersicePage />} />
        <Route path="/exercisemanagement/exercise/addexercise" element={<AddExercise />} />
        <Route path="/exercisemanagement/selflearning" element={<Selflearning />} />

        {/* Yoshitha Routes */}
        <Route path="/tutorials/beginners" element={<BeginnersPage />} />
        <Route path="/tutorials/intermediate" element={<IntermediatePage />} />

        {/* Nethma Routes */}
        <Route path="/challenge" element={<ChallengePage />} />

        {/* Dhanuka Routes */}
        <Route path="/SignInAdmin" element={<SignInAdmin/>} />
        <Route path="/SignUpAdmin" element={<SignUpAdmin/>} />
        <Route path="/ProfileAdmin" element={<ProfileAdmin/>} />



      </Routes>
    </Router>
  );
}

export default App;
