import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchUsers } from "../../../../Backend/api";

const Home = () => {
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !role) {
      setError("Please provide your email and select a role.");
      return;
    }

    try {
      // Fetch users from the database
      const users = await fetchUsers();

      // Find the user with the matching email and role
      const user = users.find((u) => u.email === email && u.role === role);

      if (user) {
        // Redirect based on role
        if (role === "employee") {
          navigate("/jobs", {
            state: { userId: user.id, username: user.username },
          });
        } else if (role === "employer") {
          navigate("/applications", {
            state: { userId: user.id, username: user.username },
          });
        }
      } else {
        setError("No user found with the provided email and role.");
      }
    } catch (err) {
      console.error("Error fetching users:", err);
      setError(
        "An error occurred while verifying your details. Please try again later."
      );
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>Job Quest</h1>
      <p>Please login to continue:</p>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <form
        onSubmit={handleSubmit}
        style={{ display: "inline-block", textAlign: "left" }}
      >
        <div style={{ marginBottom: "10px" }}>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            required
            style={{ width: "100%", padding: "8px", marginTop: "5px" }}
          />
        </div>
        <div style={{ marginBottom: "20px" }}>
          <label>Role:</label>
          <div>
            <label>
              <input
                type="radio"
                name="role"
                value="employee"
                onChange={(e) => setRole(e.target.value)}
                required
              />
              Employee
            </label>
            <label style={{ marginLeft: "10px" }}>
              <input
                type="radio"
                name="role"
                value="employer"
                onChange={(e) => setRole(e.target.value)}
                required
              />
              Employer
            </label>
          </div>
        </div>
        <button
          type="submit"
          style={{ padding: "10px 20px", cursor: "pointer" }}
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default Home;
