import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import StudentsTable from "./components/StudentsTable";
import StudentProfile from "./components/StudentProfile";

const App = () => {
  return (
    <Router>
      <div className="container mx-auto p-4">
        <h1 className="text-center display-4 fw-bold mb-5">
          Student Management
        </h1>

        <Routes>
          <Route path="/" element={<StudentsTable />} />
          <Route path="/student/:id" element={<StudentProfile />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
