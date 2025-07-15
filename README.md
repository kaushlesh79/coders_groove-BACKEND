# 🛠 Coders Groove – Backend

This is the backend server for **Coders Groove**, a real-time collaborative code editor.  
It handles WebSocket connections using **Socket.io** and provides basic REST API support (optional) for persisting code sessions.

---

## 📁 Folder Structure
```
server/
├── index.js           --> Entry point for the backend
├── routes/            --> (Optional) REST API route handlers
├── .env               --> Environment config file
└── package.json       --> Backend dependencies and scripts
```
---

## 🚀 Tech Stack

- Node.js
- Express.js
- Socket.io
- dotenv (for environment variables)
- CORS + middleware handling

---

------------------------------
Tech Stack
------------------------------

- Node.js
- Express.js
- Socket.io
- dotenv
- CORS

------------------------------
Installation & Setup
------------------------------

1. Navigate to the server folder:
   cd server

2. Install the required packages:
   npm install

3. Create a .env file in the server folder with the following content:
   PORT=4000

4. Start the backend server:
   npm run dev   (if using nodemon)
   OR
   node index.js

The backend will run at:
http://localhost:4000

------------------------------
WebSocket Events (Socket.io)
------------------------------

The backend uses Socket.io to manage real-time collaboration.  

Events:
- 'join'        --> When a user joins a room
- 'code-change' --> When code is updated and needs to be broadcast
- 'sync-code'   --> Send current code to new user
- 'disconnect'  --> Handle user exit and cleanup

------------------------------
Optional REST API Endpoints
------------------------------

GET    /session/:roomId   --> Retrieve saved code for a room  
POST   /session/:roomId   --> Save or update code for a room

(You can implement these inside the /routes folder and connect them to a database if needed.)

------------------------------
Scripts
------------------------------

npm install     --> Install all dependencies  
npm run dev     --> Run backend with auto-restart (using nodemon)  
node index.js   --> Start server normally

------------------------------
Notes
------------------------------

- CORS is enabled to accept frontend requests from http://localhost:5173
- This backend is designed to be lightweight and focused on real-time sync
- You can extend it with database support and authentication if required

------------------------------
Next Improvements
------------------------------

- Add database support (e.g., MongoDB or Redis)
- Add user authentication with JWT or OAuth
- Auto-cleanup empty rooms on user exit
- Rate limiting and basic error handling
