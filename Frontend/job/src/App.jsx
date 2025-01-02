import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "../src/components/Home";
import JobList from "../src/components/JobList";
import JobForm from "../src/components/JobForm";
import UserApplications from "../src/components/UserApplications";
import ViewApplications from "../src/components/ViewApplications";
const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/jobs" element={<JobList />} />
        <Route path="/applications" element={<ViewApplications />} />
        <Route path="/add-job" element={<JobForm />} />
        <Route
          path="/view-applications"
          element={<UserApplications userId="4" />}
        />
      </Routes>
    </Router>
  );
};

export default App;
