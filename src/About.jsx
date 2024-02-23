// About.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const About = () => {
    // About component content
    return (
        <div>
            <nav className="flex justify-between items-center p-4 shadow-md w-full">
                <h1 className="text-3xl text-black font-bold">EmotionTracker</h1>
                <div className="flex space-x-4">
                    <Link to="/" className="text-xl text-gray-700 hover:text-gray-900">Home</Link>
                    <Link to="/about" className="text-xl text-gray-700 hover:text-gray-900">About</Link>
                    <Link to="/demo" className="text-xl text-gray-700 hover:text-gray-900">Demo</Link>
                </div>
            </nav>
            <p className='text-black'>Capstone Project</p>
            <iframe src= "http://localhost:8501/"//"https://30days.streamlit.app/?embed=true"
                    height="450"
                    /*style="width:100%;border:none;"*/>
                </iframe>
        </div>
    );
};

export default About; // This is the default export
