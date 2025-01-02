import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { fetchApplicationsByUser } from "../../../../Backend/api";

const UserApplications = ({ userId }) => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getApplications = async () => {
      try {
        setLoading(true);
        const data = await fetchApplicationsByUser(userId);

        if (!data) {
          throw new Error("No data returned from server");
        }

        setApplications(data);
      } catch (err) {
        setError(err.message || "An error occurred");
      } finally {
        setLoading(false);
      }
    };

    if (userId) {
      getApplications();
    }
  }, [userId]);

  if (loading) return <p>Loading applications...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!applications || applications.length === 0)
    return <p>No applications found.</p>;

  const downloadFile = (fileBlob, fileName) => {
    const url = window.URL.createObjectURL(new Blob([fileBlob]));
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", fileName);
    document.body.appendChild(link);
    link.click();
    link.parentNode.removeChild(link);
  };

  return (
    <div>
      {/* Navigation Bar */}
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

      {/* Application List */}
      <h2>User Applications</h2>
      <ul>
        {applications.map((application) => (
          <li key={application.applicationId}>
            <p>
              <strong>Application ID:</strong> {application.applicationId}
            </p>
            <p>
              <strong>Job Title:</strong> {application.title}
            </p>
            <p>
              <strong>Company Name:</strong> {application.companyName}
            </p>
            <p>
              <strong>Location:</strong> {application.location}
            </p>
            <p>
              <strong>Education:</strong> {application.education}
            </p>
            <p>
              <strong>Experience Years:</strong> {application.experienceYears}
            </p>
            <p>
              <strong>Skills:</strong> {application.skills}
            </p>
            <p>
              <strong>Status:</strong> {application.status}
            </p>
            <p>
              <strong>Cover Letter:</strong>{" "}
              <button
                onClick={() =>
                  downloadFile(application.coverLetter, "coverLetter.pdf")
                }
                style={{ padding: "5px 10px", cursor: "pointer" }}
              >
                Download
              </button>
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserApplications;
