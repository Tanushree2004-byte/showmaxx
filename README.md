# 🎬 CineVerse - Premium OTT Platform

A Netflix-style movie streaming platform with glassmorphic UI and secure authentication system.

## 🌟 Features

### Frontend (React + Tailwind CSS)
- **Glassmorphic Design**: Modern white-dominant glass UI with cinematic aesthetics
- **Background Carousel**: Full-screen cinematic images with auto-slide (5s intervals)
- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **Authentication Flow**: Login, Signup with comprehensive validation
- **Premium UX**: Netflix-inspired interactions and animations

### Backend (Node.js + Express + PostgreSQL)
- **Secure Authentication**: JWT tokens with bcrypt password hashing
- **Aiven PostgreSQL**: Cloud database with SSL connection
- **Input Validation**: Email, phone, and password validation
- **Security Features**: Rate limiting, CORS, Helmet protection
- **Comprehensive Testing**: Jest + Supertest test suite

## 🚀 Quick Start

### Prerequisites
- Node.js 16+
- npm or yarn

### Installation

1. **Clone the repository**
```bash
git clone <repository-url>
cd CineVerse
```

2. **Backend Setup**
```bash
cd backend
npm install
cp .env.example .env  # Update with your Aiven credentials
npm run dev
```

3. **Frontend Setup**
```bash
cd frontend
npm install
npm start
```

### Access Points
- Frontend: http://localhost:3000
- Backend API: http://localhost:5000
- Health Check: http://localhost:5000/api/health

## 🎨 Design System

### Color Palette
- **Primary**: White (#FFFFFF)
- **Accent**: Netflix Red (#E50914)
- **Background**: Dark Black (#0f0f0f)
- **Overlay**: rgba(0,0,0,0.6)

### Typography
- **Primary**: Poppins (Logo, Headings)
- **Secondary**: Inter (Body text)

### Glassmorphic Effects
- Background blur: 25px
- White opacity: 15%
- Border opacity: 35%
- Border radius: 24px

## 🔐 Security Features

### Authentication
- Password hashing with bcrypt (10 salt rounds)
- JWT token authentication (7-day expiry)
- Protected routes with middleware
- Input sanitization and validation

### API Security
- Rate limiting (100 requests/15min)
- CORS configuration
- Helmet security headers
- SQL injection prevention

## 📊 Database Schema

```sql
users (
  id SERIAL PRIMARY KEY,
  username VARCHAR(100) UNIQUE,
  email VARCHAR(150) UNIQUE,
  phone VARCHAR(20),
  gender VARCHAR(10),
  password TEXT (hashed),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
)
```

## 🧪 Testing

### Backend Tests
```bash
cd backend
npm test                    # Run all tests
npm run test:watch         # Watch mode
```

### Test Coverage
- ✅ User registration with password hashing
- ✅ Duplicate user prevention
- ✅ Login authentication
- ✅ JWT token generation
- ✅ Protected route access
- ✅ Database connection

## 📁 Project Structure

```
CineVerse/
├── frontend/
│   ├── src/
│   │   ├── components/     # Reusable UI components
│   │   ├── pages/         # Page components
│   │   ├── App.jsx        # Main app component
│   │   └── index.js       # Entry point
│   ├── public/
│   ├── package.json
│   └── tailwind.config.js
├── backend/
│   ├── config/
│   │   └── database.js    # PostgreSQL configuration
│   ├── controllers/
│   │   └── authController.js
│   ├── middleware/
│   │   └── auth.js        # JWT middleware
│   ├── routes/
│   │   └── auth.js        # API routes
│   ├── tests/
│   │   └── auth.test.js   # Test suite
│   ├── server.js          # Express server
│   └── package.json
└── README.md
```

## 🔧 Environment Variables

### Backend (.env)
```env
# Database
DB_HOST=your-aiven-host
DB_PORT=21061
DB_NAME=defaultdb
DB_USER=avnadmin
DB_PASSWORD=your-password
DB_SSL=require

# JWT
JWT_SECRET=your-secret-key
JWT_EXPIRE=7d

# Server
PORT=5000
NODE_ENV=development
```

## 🌐 API Endpoints

### Authentication
- `POST /api/auth/signup` - User registration
- `POST /api/auth/login` - User login
- `GET /api/auth/profile` - Get user profile (protected)

### Health
- `GET /api/health` - Server health check

## 🎯 Features Implemented

### ✅ Frontend
- [x] Glassmorphic UI design
- [x] Cinematic background carousel
- [x] Responsive layout
- [x] Form validation
- [x] Authentication flow
- [x] Protected dashboard
- [x] Loading states
- [x] Error handling

### ✅ Backend
- [x] Express server setup
- [x] PostgreSQL connection
- [x] User authentication
- [x] JWT token system
- [x] Password hashing
- [x] Input validation
- [x] Security middleware
- [x] Comprehensive tests

## 🚀 Deployment

### Frontend (Netlify/Vercel)
1. Build: `npm run build`
2. Deploy `build/` folder
3. Set environment variables

### Backend (Heroku/Railway)
1. Set environment variables
2. Deploy Node.js app
3. Ensure PostgreSQL connection

## 📄 License

This project is for educational purposes. © 2024 CineVerse

---

**Built with ❤️ for premium streaming experiences**
