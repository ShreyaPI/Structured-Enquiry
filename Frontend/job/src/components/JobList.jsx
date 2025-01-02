import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { fetchJobs, submitApplication } from "../../../../Backend/api";

const JobList = ({ userId }) => {
  const [jobs, setJobs] = useState([]);
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [searchLocation, setSearchLocation] = useState("");
  const [searchExperience, setSearchExperience] = useState("");
  const [salaryRange, setSalaryRange] = useState({ min: "", max: "" });
  const [selectedJob, setSelectedJob] = useState(null);
  const [applicationData, setApplicationData] = useState({
    education: "",
    experienceYears: "",
    skills: "",
    coverLetter: "",
  });
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const getJobs = async () => {
      const data = await fetchJobs();
      setJobs(data);
      setFilteredJobs(data);
    };
    getJobs();
  }, []);

  const handleFilter = () => {
    const filtered = jobs.filter((job) => {
      const matchesLocation =
        searchLocation === "" ||
        job.location.toLowerCase().includes(searchLocation.toLowerCase());
      const matchesExperience =
        searchExperience === "" ||
        job.experienceLevel.toLowerCase() === searchExperience.toLowerCase();
      const matchesSalary =
        (!salaryRange.min || job.salary >= parseFloat(salaryRange.min)) &&
        (!salaryRange.max || job.salary <= parseFloat(salaryRange.max));

      return matchesLocation && matchesExperience && matchesSalary;
    });
    setFilteredJobs(filtered);
  };
  const handleApply = (job) => {
    setSelectedJob(job);
    setApplicationData({
      education: "",
      experienceYears: "",
      skills: "",
      coverLetter: "",
    });
    setSuccessMessage("");
    setErrorMessage("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const userId = 4;
    try {
      const application = {
        jobId: selectedJob.jobId,
        userId, // Pass the userId
        ...applicationData,
      };

      await submitApplication(application);

      setSuccessMessage("Application submitted successfully!");
      setSelectedJob(null); // Close the form after submission
    } catch (err) {
      setErrorMessage("Failed to submit application. Please try again.");
    }
  };

  return (
    <div>
      <nav className="nav">
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/jobs">Job List</Link>
          </li>
          <li>
            <Link to="/view-applications">View Applications</Link>
          </li>
        </ul>
      </nav>
      <h1>Job Listings</h1>

      <div style={{ marginBottom: "20px" }}>
        <input
          type="text"
          placeholder="Search by location"
          value={searchLocation}
          onChange={(e) => setSearchLocation(e.target.value)}
          style={{ marginRight: "10px", padding: "5px" }}
        />
        <select
          value={searchExperience}
          onChange={(e) => setSearchExperience(e.target.value)}
          style={{ marginRight: "10px", padding: "5px" }}
        >
          <option value="">Select experience level</option>
          <option value="entry">Entry</option>
          <option value="mid">Mid</option>
          <option value="senior">Senior</option>
        </select>
        <input
          type="number"
          placeholder="Min Salary"
          value={salaryRange.min}
          onChange={(e) =>
            setSalaryRange({ ...salaryRange, min: e.target.value })
          }
          style={{ marginRight: "10px", padding: "5px" }}
        />
        <input
          type="number"
          placeholder="Max Salary"
          value={salaryRange.max}
          onChange={(e) =>
            setSalaryRange({ ...salaryRange, max: e.target.value })
          }
          style={{ marginRight: "10px", padding: "5px" }}
        />
        <button onClick={handleFilter} style={{ padding: "5px 10px" }}>
          Search
        </button>
      </div>

      {filteredJobs.length === 0 ? (
        <p>Sorry, no results found.</p>
      ) : (
        <ul>
          {filteredJobs.map((job) => (
            <li key={job.jobId}>
              <strong>{job.title}</strong> at {job.companyName} ({job.location})
              - Rs{job.salary}
              <button
                onClick={() => setSelectedJob(job)}
                style={{ marginLeft: "10px", padding: "5px 10px" }}
              >
                View Details
              </button>
              {selectedJob && selectedJob.jobId === job.jobId && (
                <div
                  style={{
                    marginTop: "10px",
                    padding: "10px",
                    border: "1px solid #ccc",
                  }}
                >
                  <p>
                    <strong>Description:</strong> {selectedJob.description}
                  </p>
                  <h3>Apply for this job:</h3>
                  {successMessage && (
                    <p style={{ color: "green" }}>{successMessage}</p>
                  )}
                  {errorMessage && (
                    <p style={{ color: "red" }}>{errorMessage}</p>
                  )}
                  <form onSubmit={handleSubmit}>
                    <div>
                      <label>
                        Education:
                        <input
                          type="text"
                          value={applicationData.education}
                          onChange={(e) =>
                            setApplicationData({
                              ...applicationData,
                              education: e.target.value,
                            })
                          }
                          required
                          style={{
                            width: "100%",
                            padding: "8px",
                            margin: "5px 0",
                          }}
                        />
                      </label>
                    </div>
                    <div>
                      <label>
                        Experience Years:
                        <input
                          type="number"
                          value={applicationData.experienceYears}
                          onChange={(e) =>
                            setApplicationData({
                              ...applicationData,
                              experienceYears: e.target.value,
                            })
                          }
                          required
                          style={{
                            width: "100%",
                            padding: "8px",
                            margin: "5px 0",
                          }}
                        />
                      </label>
                    </div>
                    <div>
                      <label>
                        Skills:
                        <input
                          type="text"
                          value={applicationData.skills}
                          onChange={(e) =>
                            setApplicationData({
                              ...applicationData,
                              skills: e.target.value,
                            })
                          }
                          required
                          style={{
                            width: "100%",
                            padding: "8px",
                            margin: "5px 0",
                          }}
                        />
                      </label>
                    </div>
                    <div>
                      <label>
                        Cover Letter:
                        <input
                          type="file"
                          accept=".pdf,.doc,.docx"
                          onChange={(e) => {
                            const file = e.target.files[0];
                            setApplicationData({
                              ...applicationData,
                              coverLetter: file,
                            });
                          }}
                          required
                          style={{
                            width: "100%",
                            padding: "8px",
                            margin: "5px 0",
                          }}
                        />
                      </label>
                    </div>

                    <button type="submit" style={{ padding: "10px 20px" }}>
                      Submit Application
                    </button>
                  </form>
                </div>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default JobList;
