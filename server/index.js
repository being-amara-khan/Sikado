const express = require('express');
const cors = require('cors');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve uploaded files
app.use('/uploads', express.static('uploads'));

// Database setup
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./database.sqlite');

// Create tables
db.serialize(() => {
    // Users table
    db.run(`CREATE TABLE IF NOT EXISTS users (
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
  )`);

    // Contact requests table
    db.run(`CREATE TABLE IF NOT EXISTS contact_requests (
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
  )`);
});

// File upload configuration
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const uploadDir = 'uploads/';
        if (!fs.existsSync(uploadDir)) {
            fs.mkdirSync(uploadDir, { recursive: true });
        }
        cb(null, uploadDir);
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
    }
});

const upload = multer({
    storage: storage,
    limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
    fileFilter: (req, file, cb) => {
        if (file.mimetype.startsWith('image/')) {
            cb(null, true);
        } else {
            cb(new Error('Only image files are allowed!'), false);
        }
    }
});

// Email configuration
const nodemailer = require('nodemailer');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER || 'your-email@gmail.com',
        pass: process.env.EMAIL_PASS || 'your-app-password'
    }
});

// Routes

// Register user
app.post('/api/register', upload.single('profile_image'), async (req, res) => {
    try {
        const { name, email, password, type } = req.body;

        // Check if user already exists
        db.get('SELECT id FROM users WHERE email = ?', [email], async (err, row) => {
            if (err) {
                return res.status(500).json({ error: 'Database error' });
            }

            if (row) {
                return res.status(400).json({ error: 'User already exists' });
            }

            // Hash password
            const hashedPassword = await bcrypt.hash(password, 10);

            const profileImage = req.file ? `/uploads/${req.file.filename}` : null;

            // Insert user
            db.run(
                'INSERT INTO users (name, email, password, type, profile_image) VALUES (?, ?, ?, ?, ?)',
                [name, email, hashedPassword, type, profileImage],
                function (err) {
                    if (err) {
                        return res.status(500).json({ error: 'Failed to create user' });
                    }

                    const token = jwt.sign({ userId: this.lastID }, process.env.JWT_SECRET || 'secret', { expiresIn: '24h' });
                    res.json({
                        message: 'User created successfully',
                        token,
                        user: { id: this.lastID, name, email, type }
                    });
                }
            );
        });
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
});

// Login user
app.post('/api/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        db.get('SELECT * FROM users WHERE email = ?', [email], async (err, user) => {
            if (err) {
                return res.status(500).json({ error: 'Database error' });
            }

            if (!user) {
                return res.status(400).json({ error: 'Invalid credentials' });
            }

            const isValidPassword = await bcrypt.compare(password, user.password);
            if (!isValidPassword) {
                return res.status(400).json({ error: 'Invalid credentials' });
            }

            const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET || 'secret', { expiresIn: '24h' });
            res.json({
                message: 'Login successful',
                token,
                user: {
                    id: user.id,
                    name: user.name,
                    email: user.email,
                    type: user.type,
                    profile_image: user.profile_image
                }
            });
        });
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
});

// Update teacher profile
app.put('/api/teacher/profile', upload.single('profile_image'), (req, res) => {
    try {
        const { userId, subject, experience, availability, bio } = req.body;

        const profileImage = req.file ? `/uploads/${req.file.filename}` : undefined;

        let query = 'UPDATE users SET subject = ?, experience = ?, availability = ?, bio = ?';
        let params = [subject, experience, availability, bio];

        if (profileImage) {
            query += ', profile_image = ?';
            params.push(profileImage);
        }

        query += ' WHERE id = ?';
        params.push(userId);

        db.run(query, params, function (err) {
            if (err) {
                return res.status(500).json({ error: 'Failed to update profile' });
            }
            res.json({ message: 'Profile updated successfully' });
        });
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
});

// Update student profile
app.put('/api/student/profile', upload.single('profile_image'), (req, res) => {
    try {
        const { userId, grade_level, preferred_subjects, bio } = req.body;

        const profileImage = req.file ? `/uploads/${req.file.filename}` : undefined;

        let query = 'UPDATE users SET grade_level = ?, preferred_subjects = ?, bio = ?';
        let params = [grade_level, preferred_subjects, bio];

        if (profileImage) {
            query += ', profile_image = ?';
            params.push(profileImage);
        }

        query += ' WHERE id = ?';
        params.push(userId);

        db.run(query, params, function (err) {
            if (err) {
                return res.status(500).json({ error: 'Failed to update profile' });
            }
            res.json({ message: 'Profile updated successfully' });
        });
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
});

// Get all teachers
app.get('/api/teachers', (req, res) => {
    const { search, subject } = req.query;

    let query = 'SELECT id, name, email, subject, experience, availability, bio, profile_image FROM users WHERE type = "teacher"';
    let params = [];

    if (search) {
        query += ' AND (name LIKE ? OR subject LIKE ?)';
        params.push(`%${search}%`, `%${search}%`);
    }

    if (subject) {
        query += ' AND subject = ?';
        params.push(subject);
    }

    db.all(query, params, (err, teachers) => {
        if (err) {
            return res.status(500).json({ error: 'Database error' });
        }
        res.json(teachers);
    });
});

// Send contact request
app.post('/api/contact-request', async (req, res) => {
    try {
        const { student_id, teacher_id, student_name, requirements, availability, note } = req.body;

        // Get teacher email
        db.get('SELECT email, name FROM users WHERE id = ?', [teacher_id], async (err, teacher) => {
            if (err || !teacher) {
                return res.status(500).json({ error: 'Teacher not found' });
            }

            // Save request to database
            db.run(
                'INSERT INTO contact_requests (student_id, teacher_id, student_name, requirements, availability, note) VALUES (?, ?, ?, ?, ?, ?)',
                [student_id, teacher_id, student_name, requirements, availability, note],
                async function (err) {
                    if (err) {
                        return res.status(500).json({ error: 'Failed to save request' });
                    }

                    // Send email
                    const mailOptions = {
                        from: process.env.EMAIL_USER || 'your-email@gmail.com',
                        to: teacher.email,
                        subject: `New Contact Request from ${student_name}`,
                        html: `
              <h2>New Contact Request</h2>
              <p><strong>Student:</strong> ${student_name}</p>
              <p><strong>Requirements:</strong> ${requirements}</p>
              <p><strong>Availability:</strong> ${availability}</p>
              ${note ? `<p><strong>Note:</strong> ${note}</p>` : ''}
              <p>Please respond to this student's request.</p>
            `
                    };

                    try {
                        await transporter.sendMail(mailOptions);
                        res.json({ message: 'Contact request sent successfully' });
                    } catch (emailError) {
                        console.error('Email error:', emailError);
                        res.json({ message: 'Request saved but email failed to send' });
                    }
                }
            );
        });
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
});

// Get contact requests for a teacher
app.get('/api/teacher/requests/:teacherId', (req, res) => {
    const { teacherId } = req.params;

    db.all(
        'SELECT * FROM contact_requests WHERE teacher_id = ? ORDER BY created_at DESC',
        [teacherId],
        (err, requests) => {
            if (err) {
                return res.status(500).json({ error: 'Database error' });
            }
            res.json(requests);
        }
    );
});

// Get user profile
app.get('/api/user/:userId', (req, res) => {
    const { userId } = req.params;

    db.get('SELECT id, name, email, type, subject, experience, availability, bio, profile_image, grade_level, preferred_subjects FROM users WHERE id = ?', [userId], (err, user) => {
        if (err) {
            return res.status(500).json({ error: 'Database error' });
        }
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.json(user);
    });
});

// Test endpoint
app.get('/api/test', (req, res) => {
    res.json({ message: 'Sikado API is working!', timestamp: new Date().toISOString() });
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    console.log(`Test the API at: http://localhost:${PORT}/api/test`);
}); 