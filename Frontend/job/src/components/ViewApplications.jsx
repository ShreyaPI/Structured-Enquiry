import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { fetchApplications } from "../../../../Backend/api"; // Ensure this API call is defined in your backend

const AllApplications = () => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getApplications = async () => {
      try {
        setLoading(true);
        const data = await fetchApplications(); // Fetch all applications from the backend
        setApplications(data);
      } catch (err) {
        setError(err.message || "An error occurred while fetching data.");
      } finally {
        setLoading(false);
      }
    };

    getApplications();
  }, []);

  if (loading) return <p>Loading applications...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!applications || applications.length === 0)
    return <p>No applications found.</p>;

  return (
    <div>
      <nav className="nav">
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/add-job">Post New Job</Link>
          </li>
        </ul>
      </nav>

      <h2>All Applications</h2>
      <div style={{ marginBottom: "20px" }}>
        <div
          style={{
            flexDirection: "column",
            gap: "15px",
            marginTop: "20px",
          }}
        >
          {applications.map((application, index) => (
            <div
              key={application.applicationId}
              style={{
                background: "#f9f9f9",
                border: "1px solid #ccc",
                borderRadius: "8px",
                padding: "15px",
                marginBottom: "15px",
                boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
              }}
            >
              <p>
                <strong>Application ID:</strong> {application.applicationId}
              </p>
              <p>
                <strong>Job ID:</strong> {application.jobId}
              </p>
              <p>
                <strong>User ID:</strong> {application.userId}
              </p>
              <p>
                <strong>Email:</strong> {application.email}
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
                <strong>Cover Letter:</strong>
                <button
                  onClick={() => {
                    const link = document.createElement("a");
                    link.href = application.coverLetter;
                    link.download = `Cover_Letter_${application.applicationId}.pdf`;
                    document.body.appendChild(link);
                    link.click();
                    document.body.removeChild(link);
                  }}
                  style={{
                    marginLeft: "10px",
                    padding: "5px 10px",
                    backgroundColor: "#007BFF",
                    color: "white",
                    border: "none",
                    borderRadius: "5px",
                    cursor: "pointer",
                  }}
                >
                  Download
                </button>
              </p>
              <p>
                <strong>Status:</strong> {application.status}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AllApplications;
