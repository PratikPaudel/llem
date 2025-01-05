import React from 'react';
import { ChevronDown, ChevronUp, Loader } from 'lucide-react';

const SearchSummary = ({
                           summary,
                           isAnalyzing,
                           showFullResults,
                           setShowFullResults
                       }) => {
    if (isAnalyzing) {
        return (
            <div className="text-center py-4">
                <Loader className="w-6 h-6 animate-spin mx-auto text-gray-400" />
                <p className="mt-2 text-gray-600">Analyzing results...</p>
            </div>
        );
    }

    if (!summary) return null;

    const hasResults = summary.fullResults && summary.fullResults.length > 0;

    return (
        <div className="bg-white rounded-lg border border-gray-200 p-6">
            {/* Show the refined query */}
            {summary.refinedQuery && (
                <div className="mb-4 p-3 bg-gray-50 rounded-lg">
                    <p className="text-sm text-gray-500 mb-1">Enhanced Search Query:</p>
                    <p className="text-gray-700">{summary.refinedQuery}</p>
                </div>
            )}

            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                {summary.title}
            </h2>

            <p className="text-gray-700 mb-4">{summary.summary}</p>

            <div className="flex flex-wrap gap-2 mb-4">
                {summary.keyPoints && summary.keyPoints.map((point, index) => (
                    <span
                        key={index}
                        className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm"
                    >
                        {point}
                    </span>
                ))}
            </div>

            {hasResults && (
                <button
                    onClick={() => setShowFullResults(!showFullResults)}
                    className="flex items-center gap-2 text-blue-600 hover:text-blue-700"
                >
                    {showFullResults ? (
                        <>Show Less <ChevronUp className="w-4 h-4" /></>
                    ) : (
                        <>Read More <ChevronDown className="w-4 h-4" /></>
                    )}
                </button>
            )}

            {showFullResults && hasResults && (
                <div className="mt-6 space-y-4 pt-4 border-t border-gray-200">
                    {summary.fullResults.map((result, index) => (
                        <div
                            key={index}
                            className="p-4 bg-gray-50 rounded-lg"
                        >
                            <p className="text-gray-800">{result.text}</p>
                            <div className="mt-2 flex justify-between text-sm text-gray-500">
                                <span>Source: {result.source}</span>
                                <span>
                                    Relevance: {(result.score * 100).toFixed(1)}%
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default SearchSummary;