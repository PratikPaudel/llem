import React, { useState } from 'react';
import { Search, Loader } from 'lucide-react';
import { getApiBaseUrl } from '../config';

const EnhancedSearch = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [isSearching, setIsSearching] = useState(false);
    const [isSummarizing, setIsSummarizing] = useState(false);
    const [summary, setSummary] = useState(null);

    const handleSearch = async () => {
        if (!searchQuery.trim()) return;

        setIsSearching(true);
        setSummary(null);

        try {
            // Perform the search
            const response = await fetch(
                `${getApiBaseUrl()}/search?query=${encodeURIComponent(searchQuery)}`,
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

            // Start summarization
            setIsSummarizing(true);
            const summaryResponse = await fetch(`${getApiBaseUrl()}/summarize`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    results: data.results,
                    query: searchQuery
                })
            });

            if (!summaryResponse.ok) {
                throw new Error('Summarization failed');
            }

            const summaryData = await summaryResponse.json();
            setSummary({
                title: summaryData.title,
                summary: summaryData.summary,
                keyPoints: summaryData.keyPoints
            });

        } catch (error) {
            console.error('Error:', error);
            alert('Search or summarization failed. Please try again.');
        } finally {
            setIsSearching(false);
            setIsSummarizing(false);
        }
    };

    return (
        <div className="w-full max-w-4xl mx-auto p-4">
            <div className="mb-6">
                <div className="relative">
                    <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full h-12 px-4 pr-12 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Enter your search query..."
                    />
                    <button
                        onClick={handleSearch}
                        disabled={isSearching || isSummarizing}
                        className="absolute right-2 top-2 p-2 text-gray-600 hover:text-gray-900"
                    >
                        {isSearching ? (
                            <Loader className="w-6 h-6 animate-spin" />
                        ) : (
                            <Search className="w-6 h-6" />
                        )}
                    </button>
                </div>
            </div>

            {isSummarizing && (
                <div className="text-center py-4">
                    <Loader className="w-8 h-8 animate-spin mx-auto text-blue-500" />
                    <p className="mt-2 text-gray-600">Analyzing results...</p>
                </div>
            )}

            {summary && (
                <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
                    <h2 className="text-2xl font-bold mb-4">{summary.title}</h2>
                    <p className="text-gray-700 mb-4">{summary.summary}</p>
                    {summary.keyPoints && (
                        <div className="mt-4">
                            <h3 className="font-semibold mb-2">Key Points:</h3>
                            <ul className="list-disc pl-5 space-y-2">
                                {summary.keyPoints.map((point, index) => (
                                    <li key={index} className="text-gray-700">{point}</li>
                                ))}
                            </ul>
                        </div>
                    )}
                </div>
            )}

            <div className="space-y-4">
                {searchResults.map((result, index) => (
                    <div key={index} className="bg-white rounded-lg shadow p-4">
                        <p className="text-gray-800">{result.text}</p>
                        <div className="mt-2 flex justify-between text-sm text-gray-500">
                            <span>Source: {result.source}</span>
                            <span>Relevance: {(result.score * 100).toFixed(1)}%</span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default EnhancedSearch;