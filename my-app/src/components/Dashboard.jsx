// src/pages/Dashboard.jsx
import React from 'react';
import Layout from './Layout';
import AdminDashboard from './AdminDashboard';
import EmployeeDashboard from './EmployeeDashboard';

const Dashboard = () => {
    const role = localStorage.getItem('role'); // Fetch role from local storage (set at login)

    return (
        <Layout>
            {role === 'admin' ? (
                <AdminDashboard />
            ) : (
                <EmployeeDashboard />
            )}
        </Layout>
    );
};

export default Dashboard;

