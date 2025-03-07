# Job Portal - Full-Stack CRUD Application

## Overview
This project is a full-stack CRUD application that allows users to browse job listings, apply for jobs, and manage their applications. The application integrates both front-end and back-end systems to demonstrate full-stack development skills. It also features an automated email system triggered by database updates to notify users of their application status.

## Technologies Used
- **MySQL**: Database management system.
- **Express.js**: Backend framework for handling API routes and business logic.
- **React.js**: Front-end framework for creating a responsive and interactive user interface.
- **Node.js**: Server environment for running backend code.
- **Nodemailer**: For sending automated emails.
- **Cron Jobs**: For periodic email queue processing.

## Features
### User Authentication
- Secure user registration and login.
- Authentication using JWT or session-based login.

### CRUD Operations
#### **Create:**
- Users can register and apply for jobs.
#### **Read:**
- View job listings and application details.
#### **Update:**
- Edit user profiles and application statuses.
#### **Delete:**
- Remove applications or accounts.

### Email Automation with Triggers
- Emails are automatically sent when a new application is created.
- Database triggers update an `email_queue` table, which is periodically checked by a cron job.
- Nodemailer sends emails based on pending tasks in the queue.

## Usage
1. **Register/Login** as a user.
2. **Browse Jobs** and apply for open positions.
3. **Manage Applications** (view, edit, delete).
4. **Receive Email Notifications** about application status updates.

## Future Enhancements
- Implementing role-based access control for recruiters and job seekers.
- Adding resume parsing functionality.
- Enhancing job search with filters and recommendations.
- Deploying the application to a cloud service.



