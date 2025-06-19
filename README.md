# Band Practice Planner

A comprehensive web application designed to help bands and musical groups efficiently schedule and manage rehearsals, track attendance, manage setlists, and ensure everyone is prepared for performances.

## 🎵 Features

### Core Features
- **Member Management**: Add and manage band members with roles and permissions
- **Availability Tracking**: Mark recurring and one-time availability/unavailability
- **Rehearsal Scheduling**: Create and manage rehearsal events with intelligent scheduling suggestions
- **Setlist Management**: Create and manage setlists with attached resources (sheet music, recordings)
- **Notifications & Reminders**: Automated reminders for upcoming rehearsals
- **Attendance Tracking**: Monitor who's confirmed attendance and track attendance history

### Advanced Features
- **Resource Management**: Track shared equipment and rehearsal spaces
- **Progress Tracking**: Log practice sessions and rate performance on songs
- **Calendar Integration**: Sync with Google Calendar, Apple Calendar, and more
- **Mobile Responsive**: Access all features from any device

## 🚀 Technology Stack

### Frontend
- React.js with Redux for state management
- Material-UI component library
- FullCalendar for calendar views
- Styled Components/SCSS for styling
- Vite for build tooling

### Backend
- Node.js with Express
- RESTful API architecture
- JWT authentication
- Prisma ORM for database interactions

### Database
- PostgreSQL for relational data
- AWS S3 for file storage (sheet music, audio files)

### Deployment
- Frontend: Vercel/Netlify
- Backend: Railway/Heroku
- CI/CD: GitHub Actions

## 📋 Getting Started

### Prerequisites
- Node.js 18+
- npm or yarn
- PostgreSQL database
- AWS account (for S3 storage)

### Installation

1. Clone the repository
   ```bash
   git clone https://github.com/dxaginfo/bandpractice-planner-app.git
   cd bandpractice-planner-app
   ```

2. Install dependencies
   ```bash
   # Install frontend dependencies
   cd frontend
   npm install

   # Install backend dependencies
   cd ../backend
   npm install
   ```

3. Set up environment variables
   ```bash
   # Create .env files in both frontend and backend directories
   cp frontend/.env.example frontend/.env
   cp backend/.env.example backend/.env
   
   # Edit the .env files with your specific configuration
   ```

4. Run database migrations
   ```bash
   cd backend
   npx prisma migrate dev
   ```

5. Start the development servers
   ```bash
   # Start backend server
   cd backend
   npm run dev

   # Start frontend server
   cd frontend
   npm run dev
   ```

6. Open your browser and navigate to `http://localhost:5173`

## 🏗️ Project Structure

```
bandpractice-planner-app/
├── frontend/                  # React frontend application
│   ├── public/                # Public assets
│   ├── src/                   # Source files
│   │   ├── components/        # Reusable components
│   │   ├── hooks/             # Custom React hooks
│   │   ├── pages/             # Page components
│   │   ├── redux/             # Redux store and slices
│   │   ├── services/          # API service calls
│   │   ├── styles/            # Global styles
│   │   ├── utils/             # Utility functions
│   │   ├── App.jsx            # Main App component
│   │   └── main.jsx           # Entry point
│   ├── package.json           # Frontend dependencies
│   └── vite.config.js         # Vite configuration
│
├── backend/                   # Node.js backend application
│   ├── src/                   # Source files
│   │   ├── controllers/       # Request controllers
│   │   ├── middleware/        # Express middleware
│   │   ├── models/            # Data models
│   │   ├── routes/            # API routes
│   │   ├── services/          # Business logic
│   │   ├── utils/             # Utility functions
│   │   └── app.js             # Express app setup
│   ├── prisma/                # Prisma schema and migrations
│   └── package.json           # Backend dependencies
│
├── docs/                      # Documentation files
│
└── README.md                  # This file
```

## 📊 Database Schema

The application uses a relational database with the following main tables:
- Users
- Bands
- BandMembers
- Availability
- UnavailableDates
- Rehearsals
- Attendance
- Songs
- SongFiles
- Setlists
- SetlistItems
- SongProgress
- Resources
- RehearsalResources

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 📞 Contact

Project Link: [https://github.com/dxaginfo/bandpractice-planner-app](https://github.com/dxaginfo/bandpractice-planner-app)