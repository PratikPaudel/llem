import React, { useState } from 'react';
import { ChevronDown, ChevronUp, Share2, BookmarkPlus } from 'lucide-react';

const StoryCard = ({ text, source, score }) => {
    const [isExpanded, setIsExpanded] = useState(false);
    const getTitleAndContent = (text) => {
        const periodIndex = text.indexOf('.');
        if (periodIndex > 0) {
            return {
                title: text.slice(0, periodIndex + 1),
                content: text.slice(periodIndex + 1).trim()
            };
        }
        return {
            title: text.slice(0, 60) + '...',
            content: text.slice(60)
        };
    };

    const { title, content } = getTitleAndContent(text);

    return (
        <div className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100 hover:shadow-lg transition-shadow duration-300">
            <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                    <h3 className="text-xl font-semibold text-gray-900 leading-tight">
                        {title}
                    </h3>
                    <span className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-sm">
            {(score * 100).toFixed(1)}%
          </span>
                </div>

                <div className="space-y-3">
                    <p className={`text-gray-600 ${!isExpanded && 'line-clamp-3'}`}>
                        {content}
                    </p>

                    <button
                        onClick={() => setIsExpanded(!isExpanded)}
                        className="flex items-center text-blue-600 hover:text-blue-700 font-medium"
                    >
                        {isExpanded ? (
                            <>
                                Show less <ChevronUp className="ml-1 w-4 h-4" />
                            </>
                        ) : (
                            <>
                                Read more <ChevronDown className="ml-1 w-4 h-4" />
                            </>
                        )}
                    </button>
                </div>

                <div className="mt-4 pt-4 border-t border-gray-100 flex items-center justify-between">
                    <div className="flex items-center space-x-2 text-sm text-gray-500">
                        <span>Source: {source}</span>
                    </div>

                    <div className="flex space-x-2">
                        <button className="p-2 text-gray-400 hover:text-gray-600 rounded-full hover:bg-gray-50">
                            <Share2 className="w-5 h-5" />
                        </button>
                        <button className="p-2 text-gray-400 hover:text-gray-600 rounded-full hover:bg-gray-50">
                            <BookmarkPlus className="w-5 h-5" />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};
const SearchResults = ({ results, isSearching }) => {
    if (isSearching) {
        return (
            <div className="text-center">
                <div className="w-6 h-6 text-gray-400 animate-spin mx-auto">
                    <svg className="w-full h-full" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                    </svg>
                </div>
                <p className="mt-2 text-gray-600">Searching...</p>
            </div>
        );
    }

    if (!results.length) {
        return (
            <p className="text-center text-gray-600">
                No results found for your search.
            </p>
        );
    }

    return (
        <div className="space-y-6">
            {results.map((result, index) => (
                <StoryCard
                    key={index}
                    text={result.text}
                    source={result.source}
                    score={result.score}
                />
            ))}
        </div>
    );
};

export default SearchResults;