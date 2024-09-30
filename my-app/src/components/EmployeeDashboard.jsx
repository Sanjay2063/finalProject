import React, { useEffect, useState } from 'react';
import axios from 'axios';

const EmployeeDashboard = () => {
    const [skills, setSkills] = useState([]);
    const [newSkill, setNewSkill] = useState('');

    useEffect(() => {
        // Fetch employee's skills from the backend
        const fetchSkills = async () => {
            try {
                const response = await axios.get('/api/employee/skills');
                setSkills(response.data.skills);
            } catch (error) {
                console.error('Error fetching skills:', error);
            }
        };
        fetchSkills();
    }, []);

    const handleAddSkill = async () => {
        if (!newSkill) {
            alert('Please enter a skill.');
            return;
        }

        try {
            // Send new skill to the backend
            console.log(localStorage.getItem('token'))
            const response = await axios.post('/api/employee/skills', { skills: newSkill }, {
                headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
            });
            
            // Add the new skill to the existing list
            setSkills((prevSkills) => [...prevSkills, response.data.skill]);
            setNewSkill(''); // Clear the input field
        } catch (error) {
            console.error('Error adding skill:', error);
        }
    };

    const handleEditSkill = (index) => {
        const updatedSkills = [...skills];
        const newSkillName = prompt('Edit skill:', updatedSkills[index]);
        if (newSkillName) {
            updatedSkills[index] = newSkillName;
            setSkills(updatedSkills);
        }
    };

    return (
        <div>
            <h1>Employee Dashboard</h1>
            <p>Your skills</p>
            <table className="table">
                <thead>
                    <tr>
                        <th>Skill</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {skills.map((skill, index) => (
                        <tr key={index}>
                            <td>{skill}</td>
                            <td>
                                <button className="btn btn-primary" onClick={() => handleEditSkill(index)}>
                                    Edit
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <div className="mt-4">
                <input
                    type="text"
                    value={newSkill}
                    onChange={(e) => setNewSkill(e.target.value)}
                    placeholder="Add new skill"
                />
                <button className="btn btn-success" onClick={handleAddSkill}>
                    Add Skill
                </button>
            </div>
        </div>
    );
};

export default EmployeeDashboard;

