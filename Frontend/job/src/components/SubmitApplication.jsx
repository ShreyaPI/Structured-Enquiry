import React, { useState } from "react";
import axios from "axios";

const SubmitApplication = () => {
  const [formData, setFormData] = useState({
    userId: "",
    jobId: "",
    education: "",
    experience: "",
  });

  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:5000/applications",
        formData
      );
      setMessage("Application submitted successfully!");
      setFormData({ userId: "", jobId: "", education: "", experience: "" });
    } catch (error) {
      setMessage("Error submitting application. Please try again.");
      console.error(error);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Submit Job Application</h2>
      {message && <p>{message}</p>}
      <form onSubmit={handleSubmit} style={{ maxWidth: "400px" }}>
        <div>
          <label>User ID:</label>
          <input
            type="number"
            name="userId"
            value={formData.userId}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Job ID:</label>
          <input
            type="number"
            name="jobId"
            value={formData.jobId}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Education:</label>
          <input
            type="text"
            name="education"
            value={formData.education}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Experience:</label>
          <input
            type="text"
            name="experience"
            value={formData.experience}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" style={{ marginTop: "10px" }}>
          Submit Application
        </button>
      </form>
    </div>
  );
};

export default SubmitApplication;
