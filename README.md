"CHROME EXTENSION FOR TIME TRACKING AND PRODUCTIVITY ANALYTICS"

Company Name: CODTECH IT SOLUTIONS

Name: Shinde Shantanu Dasharath

Intern ID:  CTIS3019

Domain Name: Full Stack Web Development

Batch Duration: 4 Weeks

Mentor Name: Nila Santos

FocusFlow: Full-Stack Productivity Tracker 🚀
FocusFlow is a comprehensive tool designed to help users understand their digital habits. It consists of a Chrome Extension that tracks time spent on various websites, a Node.js/Express Backend for data persistence, and a React Dashboard for beautiful data visualization.

🛠️ Project Architecture
Chrome Extension: Monitors tab activity and sends "heartbeats" to the backend.

Backend (Node.js/Express): Provides an API to log activity and aggregate stats using MongoDB.

Dashboard (React): Fetches data and renders productivity analytics using Chart.js.

🧰 Tech Stack
Frontend: React.js, Chart.js, Axios

Backend: Node.js, Express.js, Mongoose

Database: MongoDB (Local/Atlas)

Browser Tech: Chrome Extension API (Manifest V3)

🚀 Getting Started
1. Prerequisites
Node.js (v16+)

MongoDB installed and running (Local or WSL)

2. Backend Setup
Bash
cd focus-backend
npm install
node server.js
The server will start on http://localhost:5000.

3. Dashboard Setup
Bash
cd focus-dashboard
npm install
npm start
The dashboard will open on http://localhost:3000.

4. Extension Installation
Open Chrome and navigate to chrome://extensions/.

Enable Developer Mode (top right toggle).

Click Load unpacked.

Select the focus-extension folder from this project.

📊 How it Works
The extension detects when you switch tabs or update a URL.

It calculates the time spent on the previous site and sends it to the /api/activity endpoint.

The backend classifies the site (e.g., github.com as Productive, facebook.com as Unproductive).

The React Dashboard fetches these logs to display a Pie Chart (Time Distribution) and a Line Chart (7-Day Trend).

📁 Folder Structure
Plaintext
.
├── focus-extension/   # Manifest V3 extension and background script
├── focus-backend/     # Node.js server and MongoDB models
└── focus-dashboard/   # React application for analytics
🌟 Future Improvements
[ ] Idle Detection: Pause tracking when the user is away from the keyboard.

[ ] Custom Category Management: Allow users to define their own productive sites via the dashboard.

[ ] Focus Mode: A feature to block "Unproductive" sites during set hours.

#Output


