const express = require('express');
const { addSkill,updateSkill, getSkills } = require('../controllers/skillController');
const authenticateToken = require('../middlewares/authMiddleware');
const { getAllEmployeeSkills } = require('../controllers/adminController');
const router = express.Router();


router.post('/employee/skills', authenticateToken, addSkill);


// Route to update a specific skill
router.put('/employee/skills', authenticateToken, updateSkill);

// Route to get an employee's skills
router.get('/employee/skills', authenticateToken, getSkills);

router.get('/admin/employee-skills', authenticateToken, getAllEmployeeSkills);

module.exports = router;
