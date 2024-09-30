import React from 'react';
import './Sidebar.css';

import { Link } from 'react-router-dom';

const Sidebar = () => {
    return (
        <div className="sidebar">
            <div className="sidebar-header">
                <img src='' alt="Logo" className="logo" />
                <span className="website-name">Project</span>
            </div>
            <ul className="nav flex-column">
                <li className="nav-item">
                    <Link to="/dashboard" className="nav-link">
                        <i className="fas fa-tachometer-alt"></i>
                        <span>Dashboard</span>
                    </Link>
                </li>
                <li className="nav-item">
                    <Link to="/profile" className="nav-link">
                        <i className="fas fa-user"></i>
                        <span>Profile</span>
                    </Link>
                </li>
                <li className="nav-item">
                    <Link to="/settings" className="nav-link">
                        <i className="fas fa-cog"></i>
                        <span>Settings</span>
                    </Link>
                </li>
            </ul>
            <div className="logout-section">
                <Link to="/" className="nav-link logout" onClick={()=>{localStorage.removeItem('token');localStorage.removeItem('username')}}>
                    <i className="fas fa-sign-out-alt"></i>
                    <span>Logout</span>
                </Link>
            </div>
        </div>
    );
};

export default Sidebar;
