const express = require("express");
const mysql = require("mysql2");
const bodyParser = require("body-parser");
const cors = require("cors"); // For React-Node.js communication
const nodemailer = require("nodemailer");
const cron = require("node-cron");
const multer = require("multer");
const upload = multer(); // No storage specified, defaults to memory storage

const app = express();
const PORT = 3000;

// Middleware
app.use(bodyParser.json());
app.use(cors()); // Enable Cross-Origin Resource Sharing for frontend access

// MySQL connection
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "shreya",
  database: "job",
});

// Connect to the database
db.connect((err) => {
  if (err) {
    console.error("Error connecting to the database:", err);
  } else {
    console.log("Connected to the database.");
  }
});

// GET /users - Fetch all user details
app.get("/users", (req, res) => {
  const query = "SELECT * FROM users";
  db.query(query, (err, results) => {
    if (err) {
      return res.status(500).json({ error: "Failed to fetch jobs" });
    }
    res.status(200).json(results);
  });
});

// GET /jobs - Fetch all job listings
app.get("/jobs", (req, res) => {
  const query = "SELECT * FROM Jobs";
  db.query(query, (err, results) => {
    if (err) {
      return res.status(500).json({ error: "Failed to fetch jobs" });
    }
    res.status(200).json(results);
  });
});

// GET /allappsview - Fetch all applications
app.get("/allappsview", (req, res) => {
  const query = `
    SELECT 
      applications.applicationId, 
      applications.jobId, 
      applications.userId, 
      applications.education, 
      applications.experienceYears, 
      applications.skills, 
      applications.status, 
      users.email 
    FROM applications
    INNER JOIN users ON users.userId = applications.userId;
  `;

  db.query(query, (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: "Failed to fetch applications" });
    }

    // Map results to remove the BLOB from the response
    const sanitizedResults = results.map((app) => ({
      applicationId: app.applicationId,
      jobId: app.jobId,
      userId: app.userId,
      education: app.education,
      experienceYears: app.experienceYears,
      skills: app.skills,
      status: app.status,
      email: app.email,
    }));

    res.status(200).json(sanitizedResults);
  });
});

// POST /jobs - Post a new job
app.post("/jobs", (req, res) => {
  const {
    title,
    description,
    companyName,
    location,
    experienceLevel,
    postedBy,
  } = req.body;
  const query = `
    INSERT INTO Jobs (title, description, companyName, location, experienceLevel, postedBy)
    VALUES (?, ?, ?, ?, ?, ?)
  `;
  db.query(
    query,
    [title, description, companyName, location, experienceLevel, postedBy],
    (err, results) => {
      if (err) {
        return res.status(500).json({ error: "Failed to post job" });
      }
      res
        .status(201)
        .json({ message: "Job posted successfully", jobId: results.insertId });
    }
  );
});

// POST /applications - Submit a job application
app.post("/applications", upload.single("coverLetterFile"), (req, res) => {
  const { jobId, userId, education, experienceYears, skills } = req.body;
  const coverLetter = req.file ? req.file.buffer : null; // Buffer for the uploaded file

  const query = `
    INSERT INTO Applications (jobId, userId, education, experienceYears, skills, coverLetter)
    VALUES (?, ?, ?, ?, ?, ?)
  `;

  db.query(
    query,
    [jobId, userId, education, experienceYears, skills, coverLetter],
    (err, results) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: "Failed to submit application" });
      }
      res.status(201).json({
        message: "Application submitted successfully",
        applicationId: results.insertId,
      });
    }
  );
});

// GET /applications/:userId - Fetch applications by a specific user
app.get("/applications/:userId", (req, res) => {
  const { userId } = req.params;

  const query = `
    SELECT 
      jobs.title, 
      jobs.companyName, 
      jobs.location, 
      Applications.applicationId, 
      Applications.education, 
      Applications.experienceYears, 
      Applications.skills, 
      Applications.coverLetter, 
      Applications.status 
    FROM 
      jobs 
    INNER JOIN 
      Applications 
    ON 
      jobs.jobId = Applications.jobId
    WHERE 
      Applications.userId = ?`;

  db.query(query, [userId], (err, results) => {
    if (err) {
      console.error("Error fetching applications:", err);
      return res.status(500).json({ error: "Failed to fetch applications" });
    }
    res.status(200).json(results);
  });
});

// GET /home - Redirect to options for applications or jobs
app.get("/home", (req, res) => {
  res.status(200).json({
    message: "Welcome to the Job Portal! Use the following options:",
    routes: {
      viewJobs: "/jobs",
      postJob: "/jobs (POST)",
      applyForJob: "/applications (POST)",
      viewApplications: "/applications/:userId",
    },
  });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
