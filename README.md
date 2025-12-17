# NewsWorld - Global News Aggregator

A modern full-stack web application for browsing the latest news from around the world. Built with React, TypeScript, Redux Toolkit, Node.js, and Express.

## Live Demo

- **Frontend:** https://test-task-for-usense-news-app-web.vercel.app
- **Backend API:** https://newsworld-api.onrender.com/api

## Features

- Browse news by categories (General, Technology, Sports, Business, Health, Science, Entertainment)
- Search news by keywords with debounce functionality
- Pagination support (12 articles per page)
- **Bookmark favorite articles** (persisted in localStorage)
- **Detailed article view** with full content display
- **Dark/Light theme toggle** with user preference persistence
- **Mobile-responsive design** with hamburger menu navigation
- Real-time news updates from NewsAPI
- **Redux Toolkit** for centralized state management
- **Skeleton loading states** for improved user experience
- REST API with rate limiting and security headers
- Comprehensive error handling and loading states

## Tech Stack

### Frontend
- React 18
- TypeScript
- **Redux Toolkit** for state management
- React Router v6 for client-side routing
- Axios for HTTP requests
- **Custom hooks** (useDarkMode, useDebounce)
- CSS3 with responsive design
- LocalStorage for bookmarks and theme persistence

### Backend
- Node.js
- Express
- TypeScript
- MVC architecture (Controllers, Services, Routes)
- NewsAPI integration
- Helmet for security headers
- CORS configuration
- Rate limiting middleware (100 requests per 15 minutes)

## Installation

### Prerequisites
- Node.js >= 18
- NewsAPI key (get it at https://newsapi.org/)

### Backend Setup

```bash
cd backend
npm install

# Create .env file
NEWS_API_KEY=your_api_key_here
PORT=5000
NODE_ENV=development
FRONTEND_URL=http://localhost:3000

npm run dev
```

### Frontend Setup

```bash
cd frontend
npm install

# Create .env file
REACT_APP_API_URL=http://localhost:5000/api

npm start
```

The application will be available at http://localhost:3000

## API Endpoints

### Health Check
```
GET /health
GET /api/health
```

### News Endpoints
```
GET /api/news/top-headlines?category={category}&page={page}&pageSize={pageSize}
GET /api/news/search?q={query}&page={page}&pageSize={pageSize}
```

### Available Categories
- general
- business
- entertainment
- health
- science
- sports
- technology

### Example Requests
```bash
# Get technology news
curl "https://newsworld-api.onrender.com/api/news/top-headlines?category=technology&page=1&pageSize=12"

# Search for specific topic
curl "https://newsworld-api.onrender.com/api/news/search?q=artificial+intelligence&page=1"
```

## Project Structure

```
news-world-app/
├── backend/
│   ├── src/
│   │   ├── controllers/
│   │   │   └── news.controller.ts
│   │   ├── middleware/
│   │   │   ├── errorHandler.ts
│   │   │   └── rateLimiter.ts
│   │   ├── routes/
│   │   │   └── news.routes.ts
│   │   ├── services/
│   │   │   └── newsApi.service.ts
│   │   ├── types/
│   │   │   └── index.ts
│   │   └── server.ts
│   ├── dist/
│   ├── package.json
│   └── tsconfig.json
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── ActiveFilters/
│   │   │   ├── BookmarkButton/
│   │   │   ├── CategoryFilter/
│   │   │   ├── Header/
│   │   │   ├── LoadingSpinner/
│   │   │   ├── MobileMenu/
│   │   │   ├── NewsCard/
│   │   │   ├── Pagination/
│   │   │   ├── SearchBar/
│   │   │   └── SkeletonCard/
│   │   ├── hooks/
│   │   │   ├── useDarkMode.ts
│   │   │   └── useDebounce.ts
│   │   ├── pages/
│   │   │   ├── ArticleDetails/
│   │   │   ├── BookmarksPage/
│   │   │   └── HomePage/
│   │   ├── services/
│   │   │   └── api.ts
│   │   ├── store/
│   │   │   ├── slices/
│   │   │   │   └── newsSlice.ts
│   │   │   ├── hooks.ts
│   │   │   └── store.ts
│   │   ├── types/
│   │   │   └── news.types.ts
│   │   ├── utils/
│   │   │   └── helpers.ts
│   │   ├── App.tsx
│   │   ├── App.css
│   │   └── index.tsx
│   ├── public/
│   ├── package.json
│   └── tsconfig.json
└── README.md
```

## Key Features Explained

### State Management
- Redux Toolkit for global state management
- Slice-based architecture for news data
- Type-safe hooks (useAppDispatch, useAppSelector)

### Bookmarks System
- Add/remove articles to bookmarks
- Persistent storage using localStorage
- Dedicated bookmarks page
- Visual indicator on bookmarked articles

### Dark Mode
- System preference detection
- Manual toggle option
- Persistent user preference
- Smooth theme transitions

### Search & Filtering
- Real-time search with debounce (500ms delay)
- Category-based filtering
- Active filters display
- Combined search and category filters

### Responsive Design
- Mobile-first approach
- Hamburger menu for mobile navigation
- Touch-friendly interactions
- Breakpoints for tablet and desktop

## Deployment

### Frontend (Vercel)
1. Connect GitHub repository to Vercel
2. Set root directory to `frontend`
3. Set Framework Preset to `Create React App`
4. Add environment variable:
   - `REACT_APP_API_URL=https://newsworld-api.onrender.com/api`
5. Deploy

### Backend (Render)
1. Connect GitHub repository to Render
2. Set root directory to `backend`
3. Add environment variables:
   - `NEWS_API_KEY` (your NewsAPI key)
   - `FRONTEND_URL` (your Vercel URL)
   - `NODE_ENV=production`
4. Deploy

## Security Features

- HTTP security headers via Helmet.js
- CORS protection with whitelisted origins
- Rate limiting to prevent API abuse
- Input validation and sanitization
- Error handling middleware
- Environment variables for sensitive data
- XSS protection

## Development

### Available Scripts

**Backend:**
```bash
npm run dev      # Run development server with hot reload
npm run build    # Compile TypeScript to JavaScript
npm start        # Run production server
```

**Frontend:**
```bash
npm start        # Run development server
npm run build    # Create production build
npm test         # Run tests
```

## Performance Optimizations

- Debounced search input to reduce API calls
- Skeleton loading states for perceived performance
- Lazy loading for article details
- Optimized bundle size with code splitting
- Cached API responses where appropriate
- CDN delivery via Vercel

## Performance Notes

- Backend hosted on Render free tier may experience cold starts (30-50 seconds on first request after inactivity)
- Frontend is optimized and deployed on Vercel CDN for fast global delivery
- Redux state persists during navigation for instant page loads

## Known Limitations

- NewsAPI free tier limits: 100 requests per day
- Backend cold start time on Render free tier
- Search results limited to last 30 days (NewsAPI restriction)
- Bookmarks stored locally (not synced across devices)

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Future Improvements

- Add unit and integration tests
- Implement server-side bookmarks with user authentication
- Add infinite scroll option
- Cache API responses with Redis
- Add more advanced filtering (by date, country, source)
- Implement PWA features (offline support, push notifications)
- Add social sharing functionality
- Implement article recommendations
- Add accessibility improvements (ARIA labels, keyboard navigation)

## Author

**Artem**
- GitHub: [@MeguMax](https://github.com/MeguMax)
- Project: [NewsWorld](https://github.com/MeguMax/Test-Task-for-Usense-News-app-web)

## License

MIT License - feel free to use this project for learning purposes.

## Acknowledgments

- News data provided by [NewsAPI](https://newsapi.org/)
- Deployed on [Vercel](https://vercel.com/) and [Render](https://render.com/)
- Built as a test task for USENSE Company
