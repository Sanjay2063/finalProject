import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AdminDashboard = () => {
    const [employeeSkills, setEmployeeSkills] = useState([]);

    useEffect(() => {
        // Fetch employees' skills from the backend
        const fetchEmployeeSkills = async () => {
            try {
                const response = await axios.get('/api/admin/employee-skills');
                setEmployeeSkills(response.data);
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
                        <th>Employee</th>
                        <th>Skills</th>
                    </tr>
                </thead>
                <tbody>
                    {employeeSkills.map((employee) => (
                        <tr key={employee.id}>
                            <td>{employee.name}</td>
                            <td>{employee.skills.join(', ')}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default AdminDashboard;
