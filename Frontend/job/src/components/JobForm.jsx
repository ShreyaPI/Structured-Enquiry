import React, { useState } from "react";
import { Link } from "react-router-dom";
import { postJob } from "../../../../Backend/api";

const JobForm = () => {
  const [jobData, setJobData] = useState({
    title: "",
    description: "",
    companyName: "",
    location: "",
    experienceLevel: "Entry",
    postedBy: 1,
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    await postJob(jobData);
    alert("Job posted successfully!");
    setJobData({
      title: "",
      description: "",
      companyName: "",
      location: "",
      experienceLevel: "Entry",
      postedBy: 1,
    });
  };

  return (
    <div>
      <nav className="nav">
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/applications">View all Applications</Link>
          </li>
        </ul>
      </nav>
      <form onSubmit={handleSubmit}>
        <h1>Post a Job</h1>
        <input
          type="text"
          placeholder="Job Title"
          value={jobData.title}
          onChange={(e) => setJobData({ ...jobData, title: e.target.value })}
          required
        />
        <input
          type="text"
          placeholder="Company Name"
          value={jobData.companyName}
          onChange={(e) =>
            setJobData({ ...jobData, companyName: e.target.value })
          }
          required
        />
        <input
          type="text"
          placeholder="Location"
          value={jobData.location}
          onChange={(e) => setJobData({ ...jobData, location: e.target.value })}
          required
        />
        <select
          value={jobData.experienceLevel}
          onChange={(e) =>
            setJobData({ ...jobData, experienceLevel: e.target.value })
          }
        >
          <option value="Entry">Entry</option>
          <option value="Mid">Mid</option>
          <option value="Senior">Senior</option>
        </select>
        <textarea
          placeholder="Job Description"
          value={jobData.description}
          onChange={(e) =>
            setJobData({ ...jobData, description: e.target.value })
          }
          required
        ></textarea>
        <button type="submit">Post Job</button>
      </form>
    </div>
  );
};

export default JobForm;
