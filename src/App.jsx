import React from 'react';
import { Link } from 'react-router-dom';
import demoPic from './assets/demopic.svg'; // Adjust the relative path as necessary

const App = () => {
    return (
        <div className="flex flex-col min-h-screen bg-gray-100">
            <nav className="flex justify-between items-center p-4 shadow-md w-full">
                <h1 className="text-3xl text-black font-bold">EmotionTracker</h1>
                <div className="flex space-x-4">
                    <Link to="/" className="text-xl text-gray-700 hover:text-gray-900">Home</Link>
                    <Link to="/about" className="text-xl text-gray-700 hover:text-gray-900">About</Link>
                    <Link to="/demo" className="text-xl text-gray-700 hover:text-gray-900">Demo</Link>
                </div>
            </nav>
            <div className="flex-1 px-4 py-12">
                <div className="max-w-7xl mx-auto flex">
                    <div className="flex-1 text-center space-y-6 p-6">
                        <h2 className="text-5xl font-bold text-gray-900 leading-tight">
                            Utilizing Facial Recognition to Analyze <span className="text-purple-600">Emotions</span> in Real Time
                        </h2>
                        <p className="text-xl text-gray-500">
                            Using high level Machine Learning and facial recognition techniques, we can predict and analyze user’s emotions.
                        </p>
                        <div className="mt-8 space-x-4 inline-block">
                            <button className="bg-purple-600 text-white px-6 py-3 rounded-full hover:bg-purple-700 transition duration-300">
                                How does it work?
                            </button>
                            <button className="bg-purple-600 text-white px-6 py-3 rounded-full ml-4 hover:bg-purple-700 transition duration-300">
                                Get Started
                            </button>
                        </div>
                    </div>
                    <div className="flex-1 flex justify-center items-center">
                        <img src={demoPic} alt="Emotion Analysis" className="max-w-sm max-h-96" />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default App;
