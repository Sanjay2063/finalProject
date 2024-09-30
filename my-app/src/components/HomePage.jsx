// src/pages/HomePage.jsx
import React from 'react';
import Layout from './Layout'; // Import the Layout component

const HomePage = () => {
    const username = localStorage.getItem('username');

    return (
        <Layout>
            <h1>Welcome, {username}</h1>
            <p>This is the home page of your app.</p>
        </Layout>
    );
};

export default HomePage;
