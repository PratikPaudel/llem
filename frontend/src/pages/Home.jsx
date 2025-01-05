import React, { useState, useRef } from 'react';
import { Search, Mic, Square, Loader } from 'lucide-react';
import { getApiBaseUrl } from '../config';
import StoryDisplay from '../components/StoryDisplay';

function Home() {
    const [searchQuery, setSearchQuery] = useState('');
    const [formattedStories, setFormattedStories] = useState(null);
    const [isRecording, setIsRecording] = useState(false);
    const [isProcessing, setIsProcessing] = useState(false);
    const [isSearching, setIsSearching] = useState(false);
    const mediaRecorder = useRef(null);
    const audioChunks = useRef([]);

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

            const response = await fetch(`${getApiBaseUrl()}/transcribe`, {
                method: 'POST',
                body: formData,
            });

            if (!response.ok) {
                throw new Error(await response.text());
            }

            const data = await response.json();
            setSearchQuery(data.text.trim());
            handleSearch(data.text.trim());
        } catch (error) {
            console.error('Error sending audio to server:', error);
            alert('Error processing audio. Please try again.');
        } finally {
            setIsProcessing(false);
        }
    };

    const handleSearch = async (queryText = searchQuery) => {
        if (!queryText.trim()) return;

        setIsSearching(true);
        setFormattedStories(null);

        try {
            // Step 1: Search with query
            const searchResponse = await fetch(
                `${getApiBaseUrl()}/search?query=${encodeURIComponent(queryText)}`,
                {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                }
            );

            if (!searchResponse.ok) {
                throw new Error('Search failed');
            }

            const searchData = await searchResponse.json();

            // Step 2: Get formatted stories
            const summaryResponse = await fetch(`${getApiBaseUrl()}/summarize`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    results: searchData.results,
                    query: queryText
                })
            });

            if (!summaryResponse.ok) {
                throw new Error('Summarization failed');
            }

            const summaryData = await summaryResponse.json();
            setFormattedStories(summaryData.formattedStories);

        } catch (error) {
            console.error('Error:', error);
            alert('Search process failed. Please try again.');
        } finally {
            setIsSearching(false);
        }
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center -mt-16">
            <div className="w-full max-w-3xl mx-auto px-4">
                <div className="text-center mb-8">
                    <h1 className="text-blue-600 text-4xl font-semibold">Listening...</h1>
                    {/* <p className="mt-2 text-lg text-gray-600">library of lived experiences</p> */}
                </div>

                <div className="space-y-4 text-blue-600">
                    {/* Search Input */}
                    <div className="relative">
    <input
        type="text"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
        className="placeholder-blue-400 text-blue-600 w-full h-14 px-6 pr-24 rounded-lg border border-blue-600 bg-white focus:outline-none focus:border-blue-700 focus:ring-1 focus:ring-blue-700 shadow-sm text-lg text-blue-600"
        placeholder="search the library of lived experiences..."
    />
    <div className="absolute right-4 top-4 flex gap-2">
        {isProcessing ? (
            <Loader className="w-6 h-6 text-blue-400 animate-spin" />
        ) : isRecording ? (
            <button
                type="button"
                onClick={stopRecording}
                className="text-red-500 hover:text-red-600 focus:outline-none"
                aria-label="Stop Recording"
            >
                <Square className="w-6 h-6" />
            </button>
        ) : (
            <button
                type="button"
                onClick={startRecording}
                className="text-blue-600 hover:text-blue-700 focus:outline-none"
                aria-label="Start Voice Search"
            >
                <Mic className="w-6 h-6" />
            </button>
        )}
        <button
            onClick={() => handleSearch()}
            disabled={isSearching || !searchQuery.trim()}
            className="text-blue-600 hover:text-blue-700 focus:outline-none"
            aria-label="Search"
        >
            {isSearching ? (
                <Loader className="w-6 h-6 animate-spin" />
            ) : (
                <Search className="w-6 h-6" />
            )}
        </button>
    </div>
</div>

                    {/* <div className="relative">
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
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
                                onClick={() => handleSearch()}
                                disabled={isSearching || !searchQuery.trim()}
                                className="text-gray-400 hover:text-gray-600 focus:outline-none"
                                aria-label="Search"
                            >
                                {isSearching ? (
                                    <Loader className="w-6 h-6 animate-spin" />
                                ) : (
                                    <Search className="w-6 h-6" />
                                )}
                            </button>
                        </div>
                    </div> */}

                    {/* Loading State */}
                    {isSearching && (
                        <div className="text-center py-8">
                            <Loader className="w-8 h-8 animate-spin mx-auto text-gray-400" />
                            <p className="mt-2 text-gray-600">Searching for your experience...</p>
                        </div>
                    )}

                    {/* Stories Display */}
                    {formattedStories && formattedStories.length > 0 && (
                        <div className="mt-8">
                            <StoryDisplay stories={formattedStories} />
                        </div>
                    )}

                    {/* No Results */}
                    {formattedStories && formattedStories.length === 0 && (
                        <div className="text-center py-8">
                            <p className="text-gray-600">No stories found for your search.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Home;