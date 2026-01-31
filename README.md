# HealthHub - Smart Health & Wellness Assistant

A modern, full-stack health management application built with React, Node.js, and MongoDB. Optimized for both web and Android (PWA).

## 🌟 Features

- **Health Tracking**: Monitor vitals, symptoms, and overall wellness
- **Appointment Management**: Book and manage doctor appointments
- **Medicine Reminders**: Track medications with smart reminders
- **Secure Records**: Encrypted health data storage
- **Progressive Web App**: Installable on Android devices
- **Responsive Design**: Works seamlessly on mobile and desktop
- **Real-time Updates**: Live health data synchronization

## 🛠️ Tech Stack

### Frontend
- React 18 with TypeScript
- Vite (Lightning-fast build tool)
- Tailwind CSS (Utility-first styling)
- Framer Motion (Smooth animations)
- Zustand (State management)
- Recharts (Data visualization)
- React Router (Navigation)
- Axios (HTTP client)
- PWA Support (Android installation)

### Backend
- Node.js & Express
- TypeScript
- MongoDB with Mongoose
- JWT Authentication
- BCrypt (Password hashing)
- Node-cron (Scheduled tasks)

## 📦 Installation

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (local or Atlas)
- npm or yarn

### Backend Setup

```bash
cd backend
npm install
cp .env.example .env  # Edit with your MongoDB URI
npm run dev
```

### Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

## 🚀 Running the Application

1. Start MongoDB (if running locally)
2. Start the backend server: `cd backend && npm run dev`
3. Start the frontend dev server: `cd frontend && npm run dev`
4. Open http://localhost:5000 in your browser

## 📱 Installing as PWA on Android

1. Visit the app on your Android device
2. Tap the "Add to Home Screen" prompt
3. The app will be installed like a native app
4. Access offline features and push notifications

## 🔐 Default Environment Variables

### Backend (.env)
```
PORT=5001
MONGODB_URI=mongodb://localhost:27017/healthhub
JWT_SECRET=your_secure_secret_key
NODE_ENV=development
```

### Frontend (.env)
```
VITE_API_URL=http://localhost:5001/api
```

## 📖 API Endpoints

### Authentication
- POST `/api/auth/register` - Register new user
- POST `/api/auth/login` - Login user
- GET `/api/auth/profile/:userId` - Get user profile
- PUT `/api/auth/profile/:userId` - Update profile

### Health Records
- POST `/api/health` - Create health record
- GET `/api/health/user/:userId` - Get all records
- GET `/api/health/vitals/:userId` - Get vitals history
- PUT `/api/health/:id` - Update record
- DELETE `/api/health/:id` - Delete record

### Appointments
- POST `/api/appointments` - Create appointment
- GET `/api/appointments/user/:userId` - Get user appointments
- GET `/api/appointments/doctors` - Get all doctors
- PUT `/api/appointments/:id` - Update appointment
- DELETE `/api/appointments/:id` - Cancel appointment

### Medicines
- POST `/api/medicines` - Add medicine
- GET `/api/medicines/user/:userId` - Get user medicines
- GET `/api/medicines/active/:userId` - Get active medicines
- POST `/api/medicines/:id/taken` - Mark as taken
- PUT `/api/medicines/:id` - Update medicine
- DELETE `/api/medicines/:id` - Delete medicine

## 🎨 Design Features

- Modern glassmorphism effects
- Smooth micro-animations
- Gradient color schemes
- Responsive layouts
- Premium card designs
- Interactive charts
- Custom scrollbars
- Loading states

## 🔧 Optimization Features

- Code splitting
- Lazy loading
- Image optimization
- API caching
- State persistence
- PWA caching strategies
- Minified production builds

## 📄 License

MIT License

## 👥 Author

Built with ❤️ for better health management
