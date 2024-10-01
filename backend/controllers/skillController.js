const Skill = require('../models/Skill');

// Controller to add a new skill to an employee's skills
exports.addSkill = async (req, res) => {
    if (req.user.role !== 'employee') {
        return res.status(403).send('Access denied');
    }

    const { skills } = req.body; // Assuming you're sending a single skill, not an array
    console.log("Adding skill:", skills);

    // Check if the request body contains a valid skill
    if (!skills || skills.length === 0) {
        return res.status(400).send('No skill provided');
    }

    try {
        let employeeSkills = await Skill.findOne({ userId: req.user.id });

        if (employeeSkills) {
            // If skills already exist, add the new skill to the array
            employeeSkills.skills.push(skills); // Append the new skill
            await employeeSkills.save();
            console.log("Skill added successfully");
        } else {
            // If no skills exist, create a new skill entry for the employee
            employeeSkills = new Skill({ userId: req.user.id, skills: [skills] }); // Store new skill in an array
            await employeeSkills.save();
            console.log("New skill entry created");
        }

        res.json(employeeSkills);
    } catch (error) {
        console.error("Error adding skill:", error);
        res.status(500).send('Server error');
    }
};

// Controller to update a specific skill
exports.updateSkill = async (req, res) => {
    if (req.user.role !== 'employee') {
        return res.status(403).send('Access denied');
    }

    const { skillIndex, newSkillName } = req.body;

    try {
        let employeeSkills = await Skill.findOne({ userId: req.user.id });

        if (employeeSkills) {
            // Update the specific skill by index
            if (employeeSkills.skills[skillIndex] !== undefined) {
                employeeSkills.skills[skillIndex] = newSkillName;
                await employeeSkills.save();
                return res.json({ skills: employeeSkills.skills });
            } else {
                return res.status(404).send('Skill not found at the given index');
            }
        } else {
            return res.status(404).send('Skills not found');
        }
    } catch (error) {
        console.error("Error updating skill:", error);
        res.status(500).send('Server error');
    }
};

// Controller to get skills
exports.getSkills = async (req, res) => {
    if (req.user.role !== 'employee') {
        return res.status(403).send('Access denied');
    }

    try {
        const employeeSkills = await Skill.findOne({ userId: req.user.id });

        if (!employeeSkills) {
            return res.status(404).json({ message: 'No skills found' });
        }

        res.json({ skills: employeeSkills.skills });
    } catch (error) {
        console.error("Error fetching skills:", error);
        res.status(500).send('Server error');
    }
};

