# 💬 ChatLLM – AI-Powered Chat Platform

An intelligent full-stack chat platform powered by **LLM integration**, built with **React**, **Node.js**, and **PostgreSQL**.  
Users can sign up, chat with an AI assistant, manage organizations, and receive real-time notifications — all in one seamless interface.

---

##  Live App
[https://chatllm.vercel.app/](https://chat-l-lm-frontend.vercel.app/)

## GitHub Repository

https://github.com/Chandu5342/ChatLLmFrontend
---

## Features

###  Authentication & Onboarding
- Username/password and Google OAuth 2.0 login.
- Auto-creates a default organization for new users.
- Secure JWT-based authentication.

###  Chat Interface
- ChatGPT-style responsive UI.
- Persistent message history stored in PostgreSQL.
- Dynamic credit counter and notifications panel.

###  Credit System
- Deducts credits per AI interaction.
- Prevents new messages when credits are exhausted.
- Displays real-time balance in the header.

###  Organization Management
- Rename, create, and switch between organizations.
- Invite members (email record only, no actual send).
- Manage organization members and roles.

###  Real-Time Notifications
- Built with **WebSocket (Socket.IO)**.
- Supports both global and user-specific notifications.
- Notification history persisted in PostgreSQL.

---

##  Tech Stack

| Layer | Technologies |
|-------|---------------|
| **Frontend** | React.js, Vite, Axios, Context API |
| **Backend** | Node.js, Express.js |
| **Database** | PostgreSQL |
| **AI Integration** | OpenAI API (LLM) |
| **Auth & Security** | JWT, bcrypt |
| **Real-time** | Socket.IO |
| **Deployment** | Vercel (frontend), Render (backend) |

```
git clone https://github.com/Chandu5342/ChatLLmFrontend
cd ChatLLmFrontend

# Backend setup
cd server
npm install
npm start

# Frontend setup

npm install
npm run dev
```

<img width="1366" height="768" alt="image" src="https://github.com/user-attachments/assets/31f360d2-31dc-424a-93fb-a92e8bf607a1" />

<img width="1366" height="768" alt="image" src="https://github.com/user-attachments/assets/5277beff-9c88-4ed6-aa59-695132bd537a" />







