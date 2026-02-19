# Showmaxx Premium OTT Dashboard

A Netflix-style streaming dashboard built with React, featuring TMDB API integration, cinematic hero carousel, and comprehensive authentication.

## 🎬 Features

### Core Functionality
- **TMDB API Integration**: Fetches trending, top-rated, action, and comedy movies
- **Hero Carousel**: Auto-advancing cinematic showcase with 5-second intervals
- **Movie Rows**: Horizontal scrolling categories with smooth navigation
- **JWT Authentication**: Secure access control with token validation
- **Glassmorphic Design**: Premium dark theme with red accents
- **Responsive Layout**: Desktop-first with mobile optimization

### Technical Implementation
- **React 18**: Modern hooks and functional components
- **Tailwind CSS**: Utility-first styling with custom glass effects
- **Axios**: HTTP client for API communication
- **Jest Testing**: Comprehensive unit and integration tests
- **React Router**: Protected routes and navigation

### API Endpoints
- `/trending/movie/week` - Weekly trending movies
- `/movie/top_rated` - Highest rated content
- `/discover/movie?with_genres=28` - Action movies
- `/discover/movie?with_genres=35` - Comedy movies

### Design System
- **Background**: `#0f0f0f` (cinematic black)
- **Primary**: `#E50914` (Netflix red)
- **Glass**: `rgba(255,255,255,0.08)` with backdrop blur
- **Typography**: Poppins font with tracking and glow effects

### Performance Features
- **Lazy Loading**: Images load on demand
- **Loading States**: Skeleton shimmers and spinners
- **Error Handling**: Graceful fallbacks and user feedback
- **Smooth Animations**: 300ms transitions with hover effects

## 🚀 Getting Started

1. **Install Dependencies**:
   ```bash
   npm install
   ```

2. **Start Development Server**:
   ```bash
   npm start
   ```

3. **Run Tests**:
   ```bash
   npm test
   ```

4. **Build for Production**:
   ```bash
   npm run build
   ```

## 📁 Project Structure

```
frontend/
├── src/
│   ├── components/
│   │   ├── AuthGuard.jsx
│   │   ├── Dashboard/
│   │   │   ├── HeroCarousel.jsx
│   │   │   ├── MovieCard.jsx
│   │   │   └── MovieRow.jsx
│   │   └── Navbar.jsx
│   ├── hooks/
│   │   └── useAuth.js
│   ├── pages/
│   │   ├── DashboardPage.jsx
│   │   ├── Intro.jsx
│   │   ├── Login.jsx
│   │   └── Signup.jsx
│   ├── services/
│   │   └── tmdbApi.js
│   ├── utils/
│   │   └── helpers.js
│   └── __tests__/
│       ├── AuthGuard.test.js
│       ├── Dashboard.test.js
│       └── HeroCarousel.test.js
├── public/
│   └── logo1.jpg
├── .env
├── jest.config.js
├── package.json
└── setupTests.js
```

## 🧪 Testing Coverage

- **Dashboard Component**: API calls, authentication, rendering
- **Hero Carousel**: Auto-advance, image loading, indicators
- **AuthGuard**: Token validation, redirects, loading states
- **Integration Tests**: Full user flows and error scenarios

## 🎨 Design Implementation

### Glassmorphic Effects
- `backdrop-blur-xl` for premium depth
- `bg-white/10` with `border-white/20` for glass appearance
- Smooth hover transitions with scale and glow effects

### Netflix-Style Layout
- Full-width cinematic hero section
- Horizontal scrolling movie rows with arrow navigation
- Sticky navigation with scroll-based transparency
- Responsive grid system for different screen sizes

## 🔐 Security Features

- **JWT Token Validation**: Expiration checking and format verification
- **Protected Routes**: AuthGuard component prevents unauthorized access
- **Secure Storage**: Token and user data in localStorage
- **Automatic Logout**: Token expiration handling

## 📱 Responsive Design

- **Desktop**: Full cinematic layout with spacious sections
- **Tablet**: Optimized padding and reduced content width
- **Mobile**: Stacked layout with maintained horizontal scroll
- **Touch Support**: Wheel and touch scrolling for movie rows

## 🎬 TMDB API Configuration

The application uses TMDB API with the following endpoints:

### Environment Variables
Create a `.env` file in the root directory:
```env
REACT_APP_TMDB_API_KEY=your_api_key_here
REACT_APP_TMDB_BASE_URL=https://api.themoviedb.org/3
REACT_APP_TMDB_IMAGE_BASE_URL=https://image.tmdb.org/t/p/original
```

### API Services
- **Trending Movies**: Weekly trending content
- **Top Rated**: Highest rated movies
- **Action Movies**: Genre-specific discovery
- **Comedy Movies**: Genre-specific discovery

---

**Built with React 18, Tailwind CSS, and modern web standards for a premium streaming experience.**
