import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { submitApplication } from "../../../../Backend/api";

const ApplyJob = () => {
  const { id: jobId } = useParams(); // Extract the jobId from the route
  const navigate = useNavigate();

  const [education, setEducation] = useState("");
  const [experienceYears, setExperienceYears] = useState("");
  const [skills, setSkills] = useState("");
  const [coverLetter, setCoverLetter] = useState("");
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const applicationData = {
        jobId,
        education,
        experienceYears,
        skills,
        coverLetter,
      };
      await submitApplication(applicationData);
      setSuccess(true);
      setTimeout(() => navigate("/"), 2000); // Redirect to homepage or jobs list after success
    } catch (err) {
      setError("Failed to submit application. Please try again.");
    }
  };

  return (
    <div style={{ maxWidth: "600px", margin: "0 auto", padding: "20px" }}>
      <h1>Apply for Job</h1>
      <p>
        <strong>Job ID:</strong> {jobId}
      </p>

      {success ? (
        <p style={{ color: "green" }}>Application submitted successfully!</p>
      ) : (
        <form onSubmit={handleSubmit}>
          {error && <p style={{ color: "red" }}>{error}</p>}
          <div style={{ marginBottom: "10px" }}>
            <label>
              Education:
              <input
                type="text"
                value={education}
                onChange={(e) => setEducation(e.target.value)}
                required
                style={{ width: "100%", padding: "8px", margin: "5px 0" }}
              />
            </label>
          </div>
          <div style={{ marginBottom: "10px" }}>
            <label>
              Experience Years:
              <input
                type="number"
                value={experienceYears}
                onChange={(e) => setExperienceYears(e.target.value)}
                required
                style={{ width: "100%", padding: "8px", margin: "5px 0" }}
              />
            </label>
          </div>
          <div style={{ marginBottom: "10px" }}>
            <label>
              Skills:
              <input
                type="text"
                value={skills}
                onChange={(e) => setSkills(e.target.value)}
                required
                style={{ width: "100%", padding: "8px", margin: "5px 0" }}
              />
            </label>
          </div>
          <div style={{ marginBottom: "10px" }}>
            <label>
              Cover Letter:
              <textarea
                value={coverLetter}
                onChange={(e) => setCoverLetter(e.target.value)}
                required
                style={{
                  width: "100%",
                  padding: "8px",
                  margin: "5px 0",
                  minHeight: "100px",
                }}
              />
            </label>
          </div>
          <button type="submit" style={{ padding: "10px 20px" }}>
            Submit Application
          </button>
        </form>
      )}
    </div>
  );
};

export default ApplyJob;
