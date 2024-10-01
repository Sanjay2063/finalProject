import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AdminDashboard = () => {
    const [employeeSkills, setEmployeeSkills] = useState([]);
    
    useEffect(() => {
        // Fetch employees' skills from the backend
        const fetchEmployeeSkills = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/admin/employee-skills', {
                    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
                });
                setEmployeeSkills(response.data);
                const email = localStorage.getItem('email'); // Assuming you store the email in localStorage
                
            } catch (error) {
                console.error('Error fetching employee skills:', error);
            }
        };
        fetchEmployeeSkills();
    }, []);

    return (
        <div>
            <h1>Admin Dashboard</h1>
            <p>Manage employee skills</p>
            <table className="table">
                <thead>
                    <tr>
                        <th>Employee Name</th>
                        <th>Email</th>
                        <th>Skills</th>
                    </tr>
                </thead>
                <tbody>
                    {employeeSkills.map((employee) => (
                        <tr key={employee.id}>
                            <td>{employee.email.split('@')[0]}</td>
                            <td>{employee.email}</td> {/* Add email column */}
                            <td>{employee.skills.join(', ')}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default AdminDashboard;
