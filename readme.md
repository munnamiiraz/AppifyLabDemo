# 🚀 Social Feed Application

A simple social feed platform built using **React**, **Redux Toolkit**, **RTK Query**, **Express**, and **PostgreSQL**.  
This project implements all required features: authentication, protected feed, posts with images, likes, comments, replies, and post visibility settings.

---

## ✨ Features Implemented

### 🔐 Authentication
- Secure **JWT-based** login and registration.
- Registration fields: **First Name, Last Name, Email, Password**.
- Only authenticated users can access the feed page.

---

### 📰 Feed (Protected Route)
- Feed is blocked for unauthenticated users.
- Users can:
  - Create posts with **text and/or image**.
  - Mark posts as **Public** (visible to all) or **Private** (visible only to the author).
  - View posts from all users.
  - See posts sorted with **newest first**.

---

### 🎯 User Interactions
- Like / Unlike posts.
- Comment on posts.
- Reply to comments.
- Like / Unlike comments and replies.
- View the list of users who liked a post, comment, or reply.

---

### ⚙️ Other Details
- Backend deployed on **Render**.
- Complete REST API built with Express.
- PostgreSQL used for scalable, relational data modeling.
- Supports image uploads.

---

## 🛠️ Tech Stack

### **Frontend**
- React.js  
- Redux Toolkit  
- RTK Query  
- React Router

### **Backend**
- Express.js  
- PostgreSQL  
- JWT Authentication  
- Cloudinary / Local Image Upload  
- Hosted on Render

---

## 🚀 Project Setup

### Backend
```bash
cd server
npm install
npm run dev


🚀 Project Setup
Backend
cd server
npm install
npm run dev

Frontend
cd client
npm install
npm start

Environment Variables (Backend .env)
PORT=5000
DATABASE_URL=postgres://<username>:<password>@localhost:5432/<dbName>
JWT_SECRET=<your-secret>

Environment Variables (Frontend .env)
REACT_APP_API_URL=http://localhost:5000/api

🧩 Main Endpoints (Simplified)
Auth

POST /api/auth/register

POST /api/auth/login

Posts

GET /api/posts

POST /api/posts

POST /api/posts/:id/like

Comments & Replies

POST /api/posts/:id/comments

POST /api/comments/:id/replies

POST /api/comments/:id/like

POST /api/replies/:id/like

🗄️ Database Overview

Tables implemented:

users

posts

comments

replies

likes

Indexes added for:

newest-first feeds

fast lookup on likes/comments

🧠 Challenges Faced

Handling image uploads and connecting them with post creation.

Keeping RTK Query cache updates in sync (especially for likes).

Managing nested comment → reply structure cleanly.

Ensuring private posts never leak into the public feed.

Deploying on Render (environment variables, CORS, routing).

Structuring a scalable schema for likes and thread interactions.

📹 Demo & Links

GitHub Repository: https://github.com/munnamiiraz/AppifyLabDemo.git


Live Deployment: No Link

YouTube Walkthrough: https://youtu.be/iHHtO6nD6mA

📄 Summary

This project fulfills all required features: secure authentication, a protected feed, posting with images, interaction features (likes, comments, replies), and post visibility controls. The stack is optimized for maintainability and scalability, and the codebase follows clean architecture principles.