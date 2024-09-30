import React, { useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const LoginForm = () => {
    const [formData, setFormData] = useState({ email: '', password: '', role: 'employee' }); // Added role field
    const [isSignIn, setIsSignIn] = useState(true); // State to toggle between Login and Sign Up
    const navigate = useNavigate();

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        const endpoint = isSignIn ? '/api/login' : '/api/signup';
        try {
            const response = await axios.post(endpoint, formData);
    
            // Handle success for login
            if (isSignIn) {
                localStorage.setItem('token', response.data.token);
                localStorage.setItem('username', formData.email); // Store actual username if available
                navigate('/home'); // Redirect to home page
            } else {
                // Handle success for sign up
                toast.success('User created successfully!'); // Show success toast
                setFormData({ email: '', password: '', role: 'employee' }); // Clear form data after signup
                setTimeout(() => {
                    setIsSignIn(!isSignIn); // Redirect to login page after a delay
                }, 20); // Delay to allow the user to see the toast
            }
        } catch (error) {
            console.error(error.response.data); // Handle error
            setFormData({ email: '', password: '', role: 'employee' }); // Clear form data
            alert('User not found or password is incorrect'); // Show alert
        }
    };

    const toggleForm = () => {
        setIsSignIn(!isSignIn); // Toggle between Login and Sign Up
        setFormData({ email: '', password: '', role: 'employee' }); // Clear form data when toggling
    };

    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-4">
                    <div className="card">
                        <div className="card-body">
                            <h3 className="card-title text-center">{isSignIn ? 'Login' : 'Sign Up'}</h3>
                            <form onSubmit={handleSubmit}>
                                <div className="form-group">
                                    <label htmlFor="email">Email</label>
                                    <input
                                        type="email"
                                        className="form-control"
                                        id="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleInputChange}
                                        placeholder="Enter your email"
                                        required
                                    />
                                </div>
                                <div className="form-group mt-3">
                                    <label htmlFor="password">Password</label>
                                    <input
                                        type="password"
                                        className="form-control"
                                        id="password"
                                        name="password"
                                        value={formData.password}
                                        onChange={handleInputChange}
                                        placeholder="Enter your password"
                                        required
                                    />
                                </div>
                                {!isSignIn && (
                                    <>
                                        <div className="form-group mt-3">
                                            <label htmlFor="confirmPassword">Confirm Password</label>
                                            <input
                                                type="password"
                                                className="form-control"
                                                id="confirmPassword"
                                                name="confirmPassword"
                                                placeholder="Confirm your password"
                                                required
                                            />
                                        </div>

                                        <div className="form-group mt-3">
                                            <label htmlFor="role">Role</label>
                                            <select
                                                className="form-control"
                                                id="role"
                                                name="role"
                                                value={formData.role}
                                                onChange={handleInputChange}
                                                required
                                            >
                                                <option value="admin">Admin</option>
                                                <option value="employee">Employee</option>
                                            </select>
                                        </div>
                                    </>
                                )}
                                <button type="submit" className="btn btn-primary w-100 mt-4">
                                    {isSignIn ? 'Login' : 'Sign Up'}
                                </button>
                            </form>
                            <p className="text-center mt-3">
                                {isSignIn ? 'Don\'t have an account?' : 'Already have an account?'}
                                <span 
                                    className="text-primary cursor-pointer" 
                                    onClick={toggleForm}>
                                    {isSignIn ? ' Sign Up' : ' Login'}
                                </span>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            <ToastContainer /> {/* Add ToastContainer here */}
        </div>
    );
};

export default LoginForm;
