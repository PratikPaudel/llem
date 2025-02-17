import { useState } from "react";
import PropTypes from "prop-types";
import { ChevronDown, ChevronUp } from "lucide-react";

const StoryDisplay = ({ stories }) => {
  const [expandedStories, setExpandedStories] = useState({});

  const toggleStory = (index) => {
    setExpandedStories((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  return (
    <div className="max-w-7xl mx-auto px-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {stories.map((story, index) => (
          <div
            key={index}
            className="bg-white rounded-lg shadow-md p-6 border border-gray-100 hover:shadow-lg transition-shadow duration-300"
          >
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              {story.title}
            </h2>

            <div className="prose text-gray-700">
              <div className={!expandedStories[index] ? "line-clamp-3" : ""}>
                {story.summarized_content}
              </div>

              <button
                onClick={() => toggleStory(index)}
                className="flex items-center text-blue-600 hover:text-blue-700 font-medium mt-2"
              >
                {expandedStories[index] ? (
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

            <div className="mt-4 pt-4 border-t border-gray-200">
              <p className="text-sm text-gray-500">Source: {story.source}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

StoryDisplay.propTypes = {
  stories: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      summarized_content: PropTypes.string.isRequired,
      source: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default StoryDisplay;
