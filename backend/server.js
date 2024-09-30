const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const cors = require('cors');

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Connect to MongoDB Atlas
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log(err));

// User Schema
const userSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, required: true, enum: ['admin', 'employee'] },
});

const User = mongoose.model('User', userSchema);

// Skill Schema
const skillSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    skills: [{ type: String }],  // Array to store multiple skills
});

const Skill = mongoose.model('Skill', skillSchema);

// JWT Authentication Middleware
const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; // Bearer TOKEN
    console.log(token)

    if (!token) return res.sendStatus(401); // No token, unauthorized
    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) return res.sendStatus(403); // Invalid token
        req.user = user;
         // Save the decoded user in the request object
        next(); // Proceed to the next middleware or route handler
    });
};

// Sign Up Route
app.post('/api/signup', async (req, res) => {
    const { email, password, role } = req.body;

    if (!['admin', 'employee'].includes(role)) {
        return res.status(400).send('Invalid role');
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    try {
        const user = new User({ email, password: hashedPassword, role });
        await user.save();
        res.status(201).send('User created');
    } catch (error) {
        res.status(400).send(error.message);
    }
});

// Login Route
app.post('/api/login', async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(400).send('User not found');

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).send('Invalid credentials');

    // Generate a token with the user ID and role
    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ token });
});

// Route to add/update skills for an employee
app.post('/api/employee/skills', authenticateToken, async (req, res) => {
    console.log("Skills", req.user); 
    if (req.user.role !== 'employee') {
        return res.status(403).send('Access denied');
    }
    
    const { skills } = req.body;
    console.log(skills);
    try {
        let employeeSkills = await Skill.findOne({ userId: req.user.id });

        if (employeeSkills) {
            employeeSkills.skills = skills;
            await employeeSkills.save();
        } else {
            employeeSkills = new Skill({ userId: req.user.id, skills });
            await employeeSkills.save();
        }

        res.json(employeeSkills);
    } catch (error) {
        console.error(error);
        res.status(500).send('Server error');
    }
});

// Route for admin to view all employee skills
app.get('/api/admin/skills', authenticateToken, async (req, res) => {
    if (req.user.role !== 'admin') {
        return res.status(403).send('Access denied');
    }

    try {
        const skills = await Skill.find().populate('userId', 'email');
        res.json(skills);
    } catch (error) {
        console.error(error);
        res.status(500).send('Server error');
    }
});

// Error Handling Middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
