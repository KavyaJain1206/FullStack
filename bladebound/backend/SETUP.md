# Bladebound Backend Setup Guide

## Prerequisites

- Node.js (v16+)
- MongoDB (local or Atlas cloud)
- npm or yarn

## Installation & Setup

### 1. MongoDB Setup

**Option A: Local MongoDB**

```bash
# Install MongoDB Community Edition
# Windows: https://docs.mongodb.com/manual/tutorial/install-mongodb-on-windows/
# macOS: brew install mongodb-community
# Linux: https://docs.mongodb.com/manual/administration/install-on-linux/

# Start MongoDB
mongod
```

**Option B: MongoDB Atlas (Cloud)**

1. Go to https://www.mongodb.com/cloud/atlas
2. Create a free account
3. Create a new cluster
4. Get your connection string
5. Update `backend/.env` with your connection string

### 2. Backend Setup

```bash
# Navigate to backend directory
cd backend

# Install dependencies
npm install

# Create .env file (already created, update if needed)
# MONGODB_URI=mongodb://localhost:27017/bladebound
# JWT_SECRET=your_jwt_secret_key_change_this_in_production
# PORT=5000

# Start the backend server
npm run dev

# Server should run on http://localhost:5000
```

### 3. Frontend Setup

```bash
# Navigate to root directory
cd ..

# Install dependencies (if not done)
npm install

# Start frontend development server
npm run dev

# Frontend will run on http://localhost:5173
```

## API Endpoints

### Authentication

**Register**

```
POST /api/auth/register
Content-Type: application/json

{
  "username": "player1",
  "email": "player1@example.com",
  "password": "secure_password",
  "characterClass": "Warrior"
}

Response:
{
  "message": "User registered successfully",
  "token": "jwt_token_here",
  "user": { ... }
}
```

**Login**

```
POST /api/auth/login
Content-Type: application/json

{
  "email": "player1@example.com",
  "password": "secure_password"
}

Response:
{
  "message": "Login successful",
  "token": "jwt_token_here",
  "user": { ... }
}
```

**Get Current User**

```
GET /api/auth/me
Authorization: Bearer <token>

Response:
{
  "_id": "...",
  "username": "player1",
  "email": "player1@example.com",
  "characterClass": "Warrior",
  "createdAt": "2024-01-23T..."
}
```

### Scoring

**Save Score**

```
POST /api/score/save
Authorization: Bearer <token>
Content-Type: application/json

{
  "score": 1500,
  "characterClass": "Warrior",
  "enemyDefeated": "The Shadow",
  "battleDuration": 45,
  "playerHPRemaining": 35
}

Response:
{
  "message": "Score saved successfully",
  "scoreData": { ... }
}
```

**Get User's Scores**

```
GET /api/score/user
Authorization: Bearer <token>

Response:
{
  "username": "player1",
  "scores": [ ... ]
}
```

**Get Leaderboard (Top 10)**

```
GET /api/score/leaderboard

Response:
[
  {
    "_id": "user_id",
    "username": "player1",
    "bestScore": 2500,
    "characterClass": "Warrior",
    "totalBattles": 15
  },
  ...
]
```

## Running Both Frontend and Backend

**Terminal 1 (Backend):**

```bash
cd backend
npm run dev
```

**Terminal 2 (Frontend):**

```bash
npm run dev
```

Open `http://localhost:5173` in your browser.

## Troubleshooting

### Backend won't connect to MongoDB

- Check MongoDB is running: `mongod`
- Verify connection string in `.env`
- For MongoDB Atlas, whitelist your IP address

### Frontend can't reach backend

- Ensure backend is running on port 5000
- Check CORS is enabled in `backend/server.js`
- Verify API_URL in frontend is correct (`http://localhost:5000/api`)

### JWT Token Issues

- Change JWT_SECRET in `.env` for security in production
- Tokens expire after 7 days
- Clear localStorage and re-login if having auth issues

### Port Already in Use

```bash
# Find process using port 5000
netstat -ano | findstr :5000  # Windows
lsof -i :5000                  # macOS/Linux

# Kill process (Windows)
taskkill /PID <PID> /F
```

## Production Deployment

### Environment Variables for Production

```
MONGODB_URI=your_production_mongodb_uri
JWT_SECRET=change_this_to_strong_secret
PORT=5000
NODE_ENV=production
```

### Recommended Hosting Platforms

- **Render.com** - Free tier available
- **Railway.app** - Simple deployment
- **Fly.io** - Good performance
- **Vercel** - Frontend with serverless backend
- **AWS/GCP** - More control but more complex

## File Structure

```
backend/
├── server.js              # Main Express app
├── package.json           # Dependencies
├── .env                   # Environment variables
├── models/
│   ├── User.js            # User schema
│   └── Score.js           # Score/leaderboard schema
├── routes/
│   ├── auth.js            # Authentication endpoints
│   └── score.js           # Scoring endpoints
└── middleware/
    └── auth.js            # JWT verification
```

## Next Steps

1. ✅ Set up MongoDB
2. ✅ Install backend dependencies
3. ✅ Start backend server
4. ✅ Start frontend server
5. ✅ Create account and test game
6. ✅ View leaderboards

For any issues, check the console logs in both frontend and backend terminals.
