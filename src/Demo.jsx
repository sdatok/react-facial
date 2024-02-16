import "./index.css";
import { useState } from "react";
import VideoRecorder from "../src/VideoRecorder";
import AudioRecorder from "../src/AudioRecorder";
import ImageRecorder from "../src/ImageRecorder";
import { Link } from 'react-router-dom';

const Demo = () => {
    let [recordOption, setRecordOption] = useState("video");
    const toggleRecordOption = (type) => {
        return () => {
            //console.log(type);
            setRecordOption(type);
        };
    };

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
                <div className="max-w-7xl mx-auto">
                    <div className="text-center space-y-6">
                        <h2 className="text-5xl font-bold text-gray-900 leading-tight">React Media Recorder</h2>
                        <div className="mt-8 space-x-4 inline-block">
                            <button className="bg-purple-600 text-white px-6 py-3 rounded-full hover:bg-purple-700 transition duration-300"
                                    onClick={toggleRecordOption("video")}>
                                Record Video
                            </button>
                            <button className="bg-purple-600 text-white px-6 py-3 rounded-full hover:bg-purple-700 transition duration-300"
                                    onClick={toggleRecordOption("image")}>
                                Capture Image
                            </button>
                            <button className="bg-purple-600 text-white px-6 py-3 rounded-full hover:bg-purple-700 transition duration-300"
                                    onClick={toggleRecordOption("audio")}>
                                Record Audio
                            </button>
                        </div>
                    </div>
                    <div className="flex justify-center mt-6">
                        {
                            recordOption === "video" ? <VideoRecorder /> : 
                            (recordOption === "audio" ? <AudioRecorder /> : 
                                <ImageRecorder />
                            )
                        }
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Demo;
