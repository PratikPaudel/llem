import React, { useState, useRef } from 'react';
import { Search, Mic, Square, Loader } from 'lucide-react';

function Home() {
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [isRecording, setIsRecording] = useState(false);
    const [isProcessing, setIsProcessing] = useState(false);
    const mediaRecorder = useRef(null);
    const audioChunks = useRef([]);
    const [isSearching, setIsSearching] = useState(false);

    const startRecording = async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
            mediaRecorder.current = new MediaRecorder(stream);
            audioChunks.current = [];

            mediaRecorder.current.ondataavailable = (event) => {
                audioChunks.current.push(event.data);
            };

            mediaRecorder.current.onstop = async () => {
                const audioBlob = new Blob(audioChunks.current, { type: 'audio/webm' });
                await sendAudioToServer(audioBlob);
            };

            mediaRecorder.current.start();
            setIsRecording(true);
        } catch (error) {
            console.error('Error accessing microphone:', error);
            alert('Error accessing microphone. Please ensure you have given permission.');
        }
    };

    const stopRecording = () => {
        if (mediaRecorder.current && isRecording) {
            mediaRecorder.current.stop();
            setIsRecording(false);
            mediaRecorder.current.stream.getTracks().forEach(track => track.stop());
        }
    };

    const sendAudioToServer = async (audioBlob) => {
        setIsProcessing(true);
        try {
            const formData = new FormData();
            formData.append('file', audioBlob, 'audio.webm');

            const response = await fetch('http://localhost:8000/api/transcribe', {
                method: 'POST',
                body: formData,
            });

            if (!response.ok) {
                const errorData = await response.text();
                throw new Error(errorData);
            }

            const data = await response.json();
            setSearchQuery(data.text.trim());
        } catch (error) {
            console.error('Error sending audio to server:', error);
            alert('Error processing audio. Please try again.');
        } finally {
            setIsProcessing(false);
        }
    };

    const handleSearch = async (e) => {
        e.preventDefault();
        if (!searchQuery.trim()) return;

        setIsSearching(true);
        try {
            const response = await fetch(
                `http://localhost:8000/api/search?query=${encodeURIComponent(searchQuery)}`,
                {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                }
            );

            if (!response.ok) {
                throw new Error('Search failed');
            }

            const data = await response.json();
            setSearchResults(data.results);
        } catch (error) {
            console.error('Search error:', error);
            alert('Failed to perform search. Please try again.');
        } finally {
            setIsSearching(false);
        }
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center -mt-16">
            <div className="w-full max-w-2xl mx-auto px-4">
                <div className="text-center mb-8">
                    <h1 className="text-4xl font-semibold text-gray-900">human™</h1>
                    <p className="mt-2 text-lg text-gray-600">library of human experiences</p>
                </div>

                <form onSubmit={handleSearch}>
                    <div className="relative">
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full h-14 px-6 pr-24 rounded-lg border border-gray-200 bg-white focus:outline-none focus:border-gray-300 focus:ring-1 focus:ring-gray-300 shadow-sm text-lg"
                            placeholder="Search experiences..."
                        />
                        <div className="absolute right-4 top-4 flex gap-2">
                            {isProcessing ? (
                                <Loader className="w-6 h-6 text-gray-400 animate-spin"/>
                            ) : isRecording ? (
                                <button
                                    type="button"
                                    onClick={stopRecording}
                                    className="text-red-500 hover:text-red-600 focus:outline-none"
                                    aria-label="Stop Recording"
                                >
                                    <Square className="w-6 h-6"/>
                                </button>
                            ) : (
                                <button
                                    type="button"
                                    onClick={startRecording}
                                    className="text-gray-400 hover:text-gray-600 focus:outline-none"
                                    aria-label="Start Voice Search"
                                >
                                    <Mic className="w-6 h-6"/>
                                </button>
                            )}
                            <button
                                type="submit"
                                className="text-gray-400 hover:text-gray-600 focus:outline-none"
                                aria-label="Search"
                            >
                                <Search className="w-6 h-6"/>
                            </button>
                        </div>
                    </div>
                </form>
                <div className="mt-8">
                    {isSearching ? (
                        <div className="text-center">
                            <Loader className="w-6 h-6 text-gray-400 animate-spin mx-auto"/>
                            <p className="mt-2 text-gray-600">Searching...</p>
                        </div>
                    ) : searchResults.length > 0 ? (
                        <div className="space-y-4">
                            {searchResults.map((result, index) => (
                                <div
                                    key={index}
                                    className="p-4 bg-white rounded-lg border border-gray-200 shadow-sm"
                                >
                                    <p className="text-gray-800">{result.text}</p>
                                    <div className="mt-2 flex justify-between text-sm">
                                        <span className="text-gray-500">
                                            Source: {result.source}
                                        </span>
                                        <span className="text-gray-500">
                                            Score: {(result.score * 100).toFixed(1)}%
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : searchQuery && !isSearching ? (
                        <p className="text-center text-gray-600">
                            No results found for your search.
                        </p>
                    ) : null}
                </div>
                <p className="mt-4 text-center text-sm text-gray-500">
                    find a perspective that inspires.
                </p>
            </div>
        </div>
    );
}

export default Home;