<<<<<<< HEAD
# Feedback Collection Tool

A full-stack web application for collecting and managing user feedback with real-time updates and an admin dashboard.

## Overview

This application allows end users to submit feedback with a star rating and additional comments, while administrators can review submissions, analyze feedback statistics, and monitor trends in real-time. The app uses modern web technologies to provide a responsive, secure, and interactive experience.

## Features

- **User Interface**: 
  - Feedback submission form with star ratings.
  - Responsive design built with React.
  
- **Real-Time Updates**:
  - Immediate feedback updates using Socket.io.
  
- **Admin Dashboard**:
  - Secure login using JWT authentication.
  - Analytics and data visualization using Chart.js.
  
- **Security**:
  - Password hashing with bcrypt.
  - JWT for authentication and authorization.
  
- **API Endpoints**:
  - Public endpoint for feedback submission.
  - Protected endpoints for admin operations (login, retrieving feedback, and statistics).

## Tech Stack

### Frontend
- **React**: For building interactive UIs.
- **React Router**: For handling routing in the single-page application.
- **Axios**: For making HTTP API calls.
- **Chart.js**: For data visualization on the admin dashboard.
- **Socket.io-client**: For real-time communication with the backend.
  
### Backend
- **Node.js**: The runtime environment for running the server.
- **Express**: Web framework for building APIs.
- **MongoDB**: NoSQL database for storing user feedback.
- **Mongoose**: ORM/ODM for MongoDB.
- **Socket.io**: For real-time bidirectional communication.
- **JWT**: For secure authentication.
- **bcrypt**: For securely hashing passwords.

### Additional Tools & Libraries
- **NPM**: Package manager to manage dependencies.
- **dotenv**: To manage environment variables in backend.
- **Cors**: To allow cross-origin requests between frontend and backend.
- **Concurrent** (optional): To run frontend and backend simultaneously during development.
- **Redux** (optional): If state management grows complex (not implemented initially but considered for scale).

## Project Structure

```
feedback-collection/
├── frontend/          # React frontend application
└── backend/           # Node.js backend application
    └── README.md      # Additional backend documentation (if needed)
└── README.md          # This file
```

## Setup Instructions

### Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file with the following variables:
   ```
   MONGODB_URI=your_mongodb_uri
   JWT_SECRET=your_jwt_secret
   PORT=5000
   ```

4. Start the server:
   ```bash
   npm start
   ```

### Frontend Setup

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file with:
   ```
   REACT_APP_API_URL=http://localhost:5000
   ```

4. Start the development server:
   ```bash
   npm start
   ```

## API Endpoints

### Public Endpoints
- **POST /api/feedback**  
  Submit new feedback.

### Protected Endpoints (Admin)
- **POST /api/admin/login**  
  Admin login.

- **GET /api/admin/feedback**  
  Retrieve all feedback submissions.

- **GET /api/admin/stats**  
  Get analytics and feedback statistics.

## Dependencies Recap

- **Frontend**:
  - react, react-dom, react-router-dom
  - axios
  - chart.js, react-chartjs-2
  - socket.io-client
- **Backend**:
  - express, mongoose
  - socket.io
  - jsonwebtoken (JWT)
  - bcrypt
  - dotenv
  - cors
- **Development**:
  - nodemon (for auto-reload during development)
  - Optional: concurrently for running multiple services
=======
# TapFeed
>>>>>>> 5e5a5024b30c50eba684852d728e05d1bbd5eec0
