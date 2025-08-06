
<div align="center">

# 🚀 Collaborative Coding Platform

*Real-time collaborative coding platform built with Docker microservices architecture*

[![Docker](https://img.shields.io/badge/Docker-20.10+-blue.svg)](https://www.docker.com/)
[![Node.js](https://img.shields.io/badge/Node.js-16+-green.svg)](https://nodejs.org/)
[![React](https://img.shields.io/badge/React-18+-61DAFB.svg)](https://reactjs.org/)

 • [📚 Documentation](docs/) • [🐛 Report Bug](issues/) • [💡 Request Feature](issues/)

</div>

---

## ✨ Features

| Feature | Description |
|---------|-------------|
| 🔥 **Real-time Code Editing** | Multiple developers can code together simultaneously with instant synchronization |
| 💬 **Live Chat ** | Built-in communication tools for seamless collaboration |
| 🐳 **Docker Integration** | Run and test code in isolated, secure containers |
| 🌈 **Multi-language Support** | Syntax highlighting and IntelliSense for 50+ programming languages |
| 🔄 **Version Control** | Integrated Git with branch management and conflict resolution |
| 🎨 **Custom Themes** | Multiple editor themes and customizable workspace layouts |
| 🔒 **Secure Collaboration** | Role-based access control and encrypted communications |

## 🛠️ Tech Stack

<div align="center">

### Frontend
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![Socket.io](https://img.shields.io/badge/Socket.io-black?style=for-the-badge&logo=socket.io&badgeColor=010101)

### Backend
![Node.js](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)
![Express.js](https://img.shields.io/badge/Express.js-404D59?style=for-the-badge)
![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white)
![Redis](https://img.shields.io/badge/Redis-DC382D?style=for-the-badge&logo=redis&logoColor=white)

### Infrastructure
![Docker](https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white)


</div>

## 🚀 Quick Start

### 📋 Prerequisites

Before you begin, ensure you have the following installed:
- 🔧 **Docker Compose** 2.0+ (included with Docker Desktop)
- 📝 **Git** ([Download](https://git-scm.com/))

### ⚡ Installation

1. **📥 Clone the Repository**
   ```bash
   git clone https://github.com/yourusername/collaborative-coding-platform.git
   cd collaborative-coding-platform
   ```

2. **⚙️ Environment Setup**
   ```bash
   cp .env.example .env
   # 📝 Configure your environment variables in .env
   ```

3. **🚀 Start the Platform**
   ```bash
   docker-compose up -d
   ```

4. **🎉 Access the Platform**
   - 🌐 **Frontend:** [http://localhost:3000](http://localhost:3000)
   - 🔧 **API:** [http://localhost:8000](http://localhost:8000)
   - 📊 **MongoDB:** `localhost:27017`
   - 🗄️ **Redis:** `localhost:6379`


## 🐳 Docker Services

| Service | Port | Description |
|---------|------|-------------|
| ⚛️ **frontend** | 3000 | React application with Monaco Editor |
| 🔧 **backend** | 8000 | Node.js API server |
| 🍃 **database** | 27017 | MongoDB database |

## 💻 Development

### 🔧 Local Development
```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Run tests
npm test

# Lint code
npm run lint
```

### 🚀 Production Deployment
```bash
# Build and deploy production version
docker-compose -f docker-compose.prod.yml up -d

# View logs
docker-compose logs -f

# Scale services
docker-compose up --scale backend=3
```

## 📚 API Documentation

### 🔐 Authentication
```bash
POST /api/auth/login
POST /api/auth/register
POST /api/auth/logout
```

### 👥 Collaboration
```bash
GET  /api/rooms
POST /api/rooms
GET  /api/rooms/:id
PUT  /api/rooms/:id
```

### 📝 Code Management
```bash
GET  /api/code/:roomId
POST /api/code/:roomId
PUT  /api/code/:roomId
```

## 🙏 Acknowledgments

- 🎨 **Monaco Editor** - For the amazing code editor
- 🔗 **Socket.io** - For real-time communication
- 🐳 **Docker** - For containerization
- ⚛️ **React Team** - For the fantastic frontend framework

<div align="center">

