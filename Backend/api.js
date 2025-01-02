import axios from "axios";

const API_URL = "http://localhost:3000";

// Fetch all job listings
export const fetchJobs = async () => {
  const response = await axios.get(`${API_URL}/jobs`);
  return response.data;
};

// Fetch all user details
export const fetchUsers = async () => {
  const response = await axios.get(`${API_URL}/users`);
  return response.data;
};

// Fetch all job applications
export const fetchApplications = async () => {
  const response = await axios.get(`${API_URL}/allappsview`);
  return response.data;
};

// Post a new job
export const postJob = async (jobData) => {
  const response = await axios.post(`${API_URL}/jobs`, jobData);
  return response.data;
};

// Submit a job application
export const submitApplication = async (applicationData) => {
  const response = await axios.post(`${API_URL}/applications`, applicationData);
  return response.data;
};

// Fetch applications for a specific user
export const fetchApplicationsByUser = async (userId) => {
  try {
    const response = await axios.get(`${API_URL}/applications/${userId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching applications:", error);
    throw error;
  }
};

// Download a cover letter by application ID
export const downloadCoverLetter = async (applicationId) => {
  try {
    const response = await axios.get(
      `${API_URL}/applications/${applicationId}/coverLetter`,
      { responseType: "blob" } // Ensure blob response for file download
    );

    // Create a download link and trigger download
    const url = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", `coverLetter_${applicationId}.pdf`); // Set filename
    document.body.appendChild(link);
    link.click();
    link.parentNode.removeChild(link);
  } catch (error) {
    console.error("Error downloading cover letter:", error);
    throw error;
  }
};
