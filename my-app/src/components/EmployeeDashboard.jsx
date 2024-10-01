import React, { useEffect, useState } from 'react';
import axios from 'axios';

const EmployeeDashboard = () => {
    const [skills, setSkills] = useState([]);
    const [newSkill, setNewSkill] = useState('');

    // Fetch skills when component loads
    useEffect(() => {
        const fetchSkills = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/employee/skills', {
                    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
                });
                setSkills(response.data.skills);
            } catch (error) {
                console.error('Error fetching skills:', error);
            }
        };
        fetchSkills();
    }, []);

    // Function to handle adding a new skill
    const handleAddSkill = async () => {
        if (!newSkill) {
            alert('Please enter a skill.');
            return;
        }
    
        try {
            // Ensure the URL matches the route on your server
            const response = await axios.post('http://localhost:5000/api/employee/skills', { skills: newSkill }, {
                headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
            });
    
            // Update the skills array from the response
            setSkills(response.data.skills);  // Use the skills array from the response
            setNewSkill(''); // Clear the input field
        } catch (error) {
            console.error('Error adding skill:', error);
            alert('Failed to add skill. Please try again.');
        }
    };
    // Function to handle editing a skill
    const handleEditSkill = async (index) => {
        const updatedSkills = [...skills];
        const newSkillName = prompt('Edit skill:', updatedSkills[index]);

        if (newSkillName) {
            try {
                // Send updated skill to the backend
                const response = await axios.put('http://localhost:5000/api/employee/skills', {
                    skillIndex: index,
                    newSkillName
                }, {
                    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
                });

                // Update the skills array from the response
                setSkills(response.data.skills);
            } catch (error) {
                console.error('Error updating skill:', error);
                alert('Failed to update skill. Please try again.');
            }
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
                <input
                    type="text"
                    value={newSkill}
                    onChange={(e) => setNewSkill(e.target.value)}
                    placeholder="Add new skill"
                />
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
