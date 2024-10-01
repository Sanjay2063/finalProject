const Skill = require('../models/Skill');
const User = require('../models/User');

// Controller to get all employees and their skills
exports.getAllEmployeeSkills = async (req, res) => {
    if (req.user.role !== 'admin') {
        return res.status(403).send('Access denied');
    }

    try {
        // Find all skills along with user information (populate both name and email)
        const employeeSkills = await Skill.find().populate('userId', 'name email'); // Include both 'name' and 'email'

        if (!employeeSkills) {
            return res.status(404).json({ message: 'No employee skills found' });
        }

        // Map the response to include employee names, emails, and skills
        const formattedEmployeeSkills = employeeSkills.map(emp => ({
            id: emp.userId._id,
            name: emp.userId.name,
            email: emp.userId.email, // Include the email
            skills: emp.skills
        }));

        res.json(formattedEmployeeSkills);
    } catch (error) {
        console.error(error);
        res.status(500).send('Server error');
    }
};
