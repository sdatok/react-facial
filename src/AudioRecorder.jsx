import { useState, useRef } from "react";

const mimeType = "audio/webm";

const AudioRecorder = () => {
    const [permission, setPermission] = useState(false);

    const mediaRecorder = useRef(null);

    const [recordingStatus, setRecordingStatus] = useState("inactive");

    const [stream, setStream] = useState(null);

    const [audio, setAudio] = useState(null);

    const [audioChunks, setAudioChunks] = useState([]);

    const getMicrophonePermission = async () => {
        if ("MediaRecorder" in window) {
            try {
                const mediaStream = await navigator.mediaDevices.getUserMedia({
                    audio: true,
                    video: false,
                });
                setPermission(true);
                setStream(mediaStream);
            } catch (err) {
                alert(err.message);
            }
        } else {
            alert("The MediaRecorder API is not supported in your browser.");
        }
    };

    const startRecording = async () => {
        setRecordingStatus("recording");
        const media = new MediaRecorder(stream, { type: mimeType });

        mediaRecorder.current = media;

        mediaRecorder.current.start();

        let localAudioChunks = [];

        mediaRecorder.current.ondataavailable = (event) => {
            if (typeof event.data === "undefined") return;
            if (event.data.size === 0) return;
            localAudioChunks.push(event.data);
        };

        setAudioChunks(localAudioChunks);
    };

    const stopRecording = () => {
        setRecordingStatus("inactive");
        mediaRecorder.current.stop();

        mediaRecorder.current.onstop = () => {
            const audioBlob = new Blob(audioChunks, { type: mimeType });
            const audioUrl = URL.createObjectURL(audioBlob);

            setAudio(audioUrl);

            setAudioChunks([]);
        };
    };

    return (
        <div className="flex flex-col items-center justify-center pt-6">
            <h2 className="text-xl font-bold text-black mb-4">Audio Recorder</h2>
            <div className="audio-controls">
                {!permission ? (
                    <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700 transition duration-300 mx-2" onClick={getMicrophonePermission} type="button">
                        Get Microphone
                    </button>
                ) : null}
                {permission && recordingStatus === "inactive" ? (
                    <button className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-700 transition duration-300 mx-2" onClick={startRecording} type="button">
                        Start Recording
                    </button>
                ) : null}
                {recordingStatus === "recording" ? (
                    <button className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-700 transition duration-300 mx-2" onClick={stopRecording} type="button">
                        Stop Recording
                    </button>
                ) : null}
            </div>
            {audio ? (
                <div className="audio-player mt-4">
                    <audio src={audio} controls></audio>
                    <a className="text-black mt-2" download href={audio}>
                        Download Recording
                    </a>
                </div>
            ) : null}
        </div>
    );
};

export default AudioRecorder;