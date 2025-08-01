# Sikado - Student Teacher Connection App

A modern web application that connects students with qualified teachers for personalized learning experiences.

## Features

### For Students
- ✅ Browse and search for teachers by subject and experience
- ✅ Filter teachers by availability and expertise
- ✅ Send contact requests to teachers
- ✅ Complete student profile setup
- ✅ View teacher profiles and credentials

### For Teachers
- ✅ Create detailed teacher profiles
- ✅ Receive and manage contact requests from students
- ✅ Dashboard to track incoming requests
- ✅ Profile management with photo upload

### Core Features
- 🔐 User authentication (signup/login)
- 📧 Email notifications for contact requests
- 📸 Profile picture upload
- 🗄️ SQLite database for data persistence
- 📱 Responsive design with Tailwind CSS

## Tech Stack

### Frontend
- **React.js** - UI framework
- **Tailwind CSS** - Styling
- **Lucide React** - Icons
- **Axios** - HTTP client

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **SQLite** - Database
- **Multer** - File upload handling
- **Nodemailer** - Email sending
- **bcryptjs** - Password hashing
- **jsonwebtoken** - Authentication

## Setup Instructions

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### 1. Install Dependencies

```bash
# Install frontend dependencies
npm install

# Install backend dependencies
cd server
npm install
cd ..
```

### 2. Environment Configuration

Create a `.env` file in the `server` directory:

```env
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password
JWT_SECRET=your-super-secret-jwt-key
PORT=5000
```

**Note:** For Gmail, you'll need to:
1. Enable 2-factor authentication
2. Generate an "App Password" 
3. Use that app password in the EMAIL_PASS field

### 3. Start the Application

#### Option 1: Run both frontend and backend together
```bash
npm run dev
```

#### Option 2: Run separately
```bash
# Terminal 1 - Start backend
cd server
npm start

# Terminal 2 - Start frontend
npm start
```

The application will be available at:
- Frontend: http://localhost:3000
- Backend: http://localhost:5000

## Database Schema

### Users Table
```sql
CREATE TABLE users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  email TEXT UNIQUE NOT NULL,
  password TEXT NOT NULL,
  type TEXT NOT NULL,
  subject TEXT,
  experience INTEGER,
  availability TEXT,
  bio TEXT,
  profile_image TEXT,
  grade_level TEXT,
  preferred_subjects TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);
```

### Contact Requests Table
```sql
CREATE TABLE contact_requests (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  student_id INTEGER,
  teacher_id INTEGER,
  student_name TEXT NOT NULL,
  requirements TEXT,
  availability TEXT,
  note TEXT,
  status TEXT DEFAULT 'pending',
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (student_id) REFERENCES users (id),
  FOREIGN KEY (teacher_id) REFERENCES users (id)
);
```

## API Endpoints

### Authentication
- `POST /api/register` - Register new user
- `POST /api/login` - User login

### Profiles
- `PUT /api/teacher/profile` - Update teacher profile
- `PUT /api/student/profile` - Update student profile
- `GET /api/user/:userId` - Get user profile

### Teachers
- `GET /api/teachers` - Get all teachers (with filters)

### Contact Requests
- `POST /api/contact-request` - Send contact request
- `GET /api/teacher/requests/:teacherId` - Get teacher's requests

## File Structure

```
teaching_app/
├── public/
│   └── index.html
├── src/
│   ├── services/
│   │   └── api.js
│   └── App.js
├── server/
│   ├── index.js
│   ├── package.json
│   └── config.env
├── uploads/
├── database.sqlite
└── package.json
```

## Usage Guide

### For Students

1. **Sign Up**: Create an account as a student
2. **Complete Profile**: Add your grade level and preferred subjects
3. **Explore Teachers**: Browse available teachers by subject
4. **Contact Teachers**: Send requests to teachers you're interested in
5. **Wait for Response**: Teachers will receive email notifications

### For Teachers

1. **Sign Up**: Create an account as a teacher
2. **Complete Profile**: Add your subjects, experience, and availability
3. **Receive Requests**: Check your dashboard for student requests
4. **Respond to Students**: Contact students via email

## Development

### Adding New Features

1. **Backend**: Add new routes in `server/index.js`
2. **Frontend**: Add new components in `src/App.js`
3. **API**: Add new functions in `src/services/api.js`

### Database Changes

1. Modify the schema in `server/index.js`
2. Restart the server to apply changes

### Styling

The app uses Tailwind CSS. Custom styles can be added to `src/App.css`.

## Troubleshooting

### Common Issues

1. **Email not sending**: Check your Gmail app password configuration
2. **Database errors**: Delete `database.sqlite` and restart the server
3. **Port conflicts**: Change the PORT in config.env

### Logs

- Backend logs appear in the terminal running the server
- Frontend errors appear in the browser console

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is open source and available under the MIT License.

## Support

For support or questions, please open an issue in the repository. 
