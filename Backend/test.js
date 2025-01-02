// Importing packages
const cron = require("node-cron");
const express = require("express");
const nodemailer = require("nodemailer");
const mysql = require("mysql2");

const app = express();

// MySQL database connection
const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "shreya",
  database: "job",
});

connection.connect((err) => {
  if (err) {
    console.error("Error connecting to the database:", err);
    return;
  }
  console.log("Connected to the database.");
});

// Setting up the Nodemailer transporter
const mailTransporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "shreyai1724@gmail.com",
    pass: "dwgv hrlc qobo jnkz",
  },
});

// Cron job to process the email queue every 1 minute
cron.schedule("*/1 * * * *", () => {
  console.log("Checking email queue...");

  // Fetch emails from the queue with status 'pending'
  connection.query(
    'SELECT * FROM email_queue WHERE status = "pending"',
    (err, rows) => {
      if (err) {
        console.error("Error fetching emails from the queue:", err);
        return;
      }

      if (rows.length === 0) {
        console.log("No pending emails in the queue.");
        return;
      }

      console.log(`Found ${rows.length} pending emails.`);

      rows.forEach((row) => {
        const mailDetails = {
          from: "shreyai1724@gmail.com",
          to: "fardeenvaddo6@gmail.com",
          subject: "Job Application Sent",
          text: row.body,
        };

        // Send email
        mailTransporter.sendMail(mailDetails, (err) => {
          if (err) {
            console.error(`Error sending email to ${row.recipient}:`, err);
            // Update status to 'failed'
            connection.query(
              'UPDATE email_queue SET status = "failed" WHERE id = ?',
              [row.id],
              (err) => {
                if (err) {
                  console.error(
                    "Error updating email status to 'failed':",
                    err
                  );
                }
              }
            );
          } else {
            console.log(`Email sent to ${row.recipient}`);
            // Update status to 'sent'
            connection.query(
              'UPDATE email_queue SET status = "sent" WHERE id = ?',
              [row.id],
              (err) => {
                if (err) {
                  console.error("Error updating email status to 'sent':", err);
                }
              }
            );
          }
        });
      });
    }
  );
});

// Start the server
app.listen(3030, () => {
  console.log("Server running on http://localhost:3030");
});
