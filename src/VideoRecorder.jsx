import { useState, useRef } from "react";

const mimeType = 'video/webm; codecs="opus,vp8"';
// Define your emotion colors statically to work with Tailwind JIT compiler
const emotionColors = {
    happy: 'bg-green-500',
    sad: 'bg-blue-500',
    angry: 'bg-red-500',
    // add more emotion color mappings as needed
};

const EmotionBars = ({ emotions }) => {
    return (
        <div className="flex flex-col justify-center space-y-2 ml-4">
            {emotions.map((emotion, index) => (
                <div key={index} className="flex items-center space-x-2">
                    <span className="text-black">{emotion.name}</span>
                    <div className="w-full bg-gray-200 rounded-full h-4">
                        <div
                            className={`${emotionColors[emotion.emotion.toLowerCase()]} h-4 rounded-full`}
                            style={{ width: `${emotion.value}%` }}
                        />
                    </div>
                </div>
            ))}
        </div>
    );
};

const VideoRecorder = () => {
    const [permission, setPermission] = useState(false);

    const mediaRecorder = useRef(null);

    const liveVideoFeed = useRef(null);

    const [recordingStatus, setRecordingStatus] = useState("inactive");

    const [stream, setStream] = useState(null);

    const [recordedVideo, setRecordedVideo] = useState(null);

    const [videoChunks, setVideoChunks] = useState([]);
    // Placeholder for emotion data
    const [emotions] = useState([
        { name: "Happy", value: 80, emotion: 'Happy' },
        { name: "Sad", value: 50, emotion: 'Sad' },
        { name: "Angry", value: 30, emotion: 'Angry' },
        // ... add more emotions as needed
    ]);

    const getCameraPermission = async () => {
        setRecordedVideo(null);
        //get video and audio permissions and then stream the result media stream to the videoSrc variable
        if ("MediaRecorder" in window) {
            try {
                const videoConstraints = {
                    audio: false,
                    video: true,
                };
                const audioConstraints = { audio: true };

                // create audio and video streams separately
                const audioStream = await navigator.mediaDevices.getUserMedia(
                    audioConstraints
                );
                const videoStream = await navigator.mediaDevices.getUserMedia(
                    videoConstraints
                );

                setPermission(true);

                //combine both audio and video streams

                const combinedStream = new MediaStream([
                    ...videoStream.getVideoTracks(),
                    ...audioStream.getAudioTracks(),
                ]);

                setStream(combinedStream);

                //set videostream to live feed player
                liveVideoFeed.current.srcObject = videoStream;
            } catch (err) {
                alert(err.message);
            }
        } else {
            alert("The MediaRecorder API is not supported in your browser.");
        }
    };

    const startRecording = async () => {
        setRecordingStatus("recording");

        const media = new MediaRecorder(stream, { mimeType });

        mediaRecorder.current = media;

        mediaRecorder.current.start();

        let localVideoChunks = [];

        mediaRecorder.current.ondataavailable = (event) => {
            if (typeof event.data === "undefined") return;
            if (event.data.size === 0) return;
            localVideoChunks.push(event.data);
        };

        setVideoChunks(localVideoChunks);
    };

    const stopRecording = () => {
        setPermission(false);
        setRecordingStatus("inactive");
        mediaRecorder.current.stop();

        mediaRecorder.current.onstop = () => {
            const videoBlob = new Blob(videoChunks, { type: mimeType });
            const videoUrl = URL.createObjectURL(videoBlob);

            setRecordedVideo(videoUrl);

            setVideoChunks([]);
        };
    };

    return (
        <div className="flex flex-col items-center justify-center pt-6">
            <h2 className="text-xl font-bold text-black mb-4">Video Recorder</h2>
            <div className="flex items-start">
                <div className="video-container relative">
                    {!recordedVideo ? (
                        <video ref={liveVideoFeed} autoPlay className="w-auto" />
                    ) : (
                        <video className="recorded" src={recordedVideo} controls />
                    )}
                    {permission && <EmotionBars emotions={emotions} />}
                </div>
            </div>
            <div className="video-controls space-x-2 mt-4">
                {!permission ? (
                    <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700 transition duration-300" onClick={getCameraPermission}>
                        Get Camera
                    </button>
                ) : null}
                {permission && recordingStatus === "inactive" ? (
                    <button className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-700 transition duration-300" onClick={startRecording}>
                        Start Recording
                    </button>
                ) : null}
                {recordingStatus === "recording" ? (
                    <button className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-700 transition duration-300" onClick={stopRecording}>
                        Stop Recording
                    </button>
                ) : null}
            </div>
            {recordedVideo && (
                <a className="text-black mt-4" download href={recordedVideo}>
                    Download Recording
                </a>
            )}
        </div>
    );
};

export default VideoRecorder;