Listify – Productivity and Budget Management Platform
Listify is a full-stack web application designed to help users efficiently manage their tasks, productivity, and personal budgets within a single, unified platform.
The application focuses on clean user experience, secure authentication, and scalable architecture, making it suitable for real-world use cases.

Overview
Listify combines task organization, expense tracking, and an AI-assisted interface to improve daily planning and financial awareness.
It is developed as a portfolio project to demonstrate full-stack development skills, state management, and practical feature implementation.

Key Features
Task and Productivity Management
Create and manage tasks with priority handling
Monthly and daily task organization
Intuitive and minimal user interface
Budget Tracking
Monthly budget allocation
Daily expense tracking
Automatic calculation of remaining balance
Date-wise and month-wise expense organization
AI Chatbot Interface
Assistant interface for productivity guidance
Chat UI with message scrolling and response states
Currently implemented with static logic (API integration planned)
Authentication and Security
Secure user registration and login
JWT-based authentication with cookies
Centralized authentication state using Zustand
Responsive Design
Optimized for desktop, tablet, and mobile devices
Technology Stack
Frontend
React
Zustand (state management)
Axios
Tailwind CSS / CSS
Backend
Node.js
Express.js
MongoDB with Mongoose
JSON Web Tokens (JWT)

Project Structure
Listify/
├── client/          # React frontend
├── server/          # Express backend
├── models/          # Database schemas
├── routes/          # API routes
├── store/           # Zustand state stores
├── components/      # Reusable UI components
└── README.md

Installation and Setup
Clone the Repository
git clone https://github.com/your-username/listify.git

Frontend Setup
cd client
npm install
npm run dev

Backend Setup
cd server
npm install
npm start

Planned Enhancements
Integration of AI APIs for dynamic chatbot responses
Advanced analytics and data visualization for expenses
Calendar-based task scheduling
Email notifications and reminders
Vision board and sticky notes features
Purpose of the Project
This project was developed to:
Demonstrate full-stack web development capabilities
Showcase secure authentication and state management
Highlight scalable backend design and clean frontend architecture
Serve as a strong portfolio project for software engineering roles

Author
Pratyusha Nandi
Aspiring Software Engineer
Focused on building scalable, user-centric web applications
