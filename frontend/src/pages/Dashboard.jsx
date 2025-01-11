import { BookOpen, Clock, Heart, Share2 } from "lucide-react";

const dummyStories = [
  {
    title: "Finding Peace in the Chaos",
    excerpt:
      "As a nurse in the emergency room during the pandemic, I learned that sometimes the smallest acts of kindness create the biggest ripples. One night, amid the beeping monitors and rushed footsteps...",
    readTime: "5 min",
    category: "Healthcare",
    likes: 234,
    date: "Mar 15, 2024",
  },
  {
    title: "The Garden That Healed",
    excerpt:
      "After losing my wife, I found solace in an unexpected place - our neglected backyard. What started as a distraction became a journey of healing, teaching me that growth takes time, both for plants and people...",
    readTime: "7 min",
    category: "Personal Growth",
    likes: 456,
    date: "Mar 14, 2024",
  },
  {
    title: "Letters to My Future Self",
    excerpt:
      "At 18, I started writing letters to my 30-year-old self. Now, reading them twelve years later, I'm struck by how differently life turned out, yet how those young dreams shaped who I've become...",
    readTime: "6 min",
    category: "Self-Discovery",
    likes: 321,
    date: "Mar 13, 2024",
  },
  {
    title: "The Last Dance Class",
    excerpt:
      "Teaching ballet to seniors wasn't my dream job, but watching Mrs. Chen master her first pirouette at 75 taught me more about perseverance than any performance ever did...",
    readTime: "4 min",
    category: "Teaching",
    likes: 189,
    date: "Mar 12, 2024",
  },
  {
    title: "Coffee Shop Chronicles",
    excerpt:
      "Running a small coffee shop in Seattle means hearing thousands of stories. But it was the daily visits from Mr. Rodriguez, ordering his wife's favorite latte after her passing, that showed me the power of routine in grief...",
    readTime: "8 min",
    category: "Community",
    likes: 567,
    date: "Mar 11, 2024",
  },
  {
    title: "The Midnight Library",
    excerpt:
      "Working the night shift at our local library, I've learned that some people come not for the books, but for the quiet company. This is the story of the unexpected community we built in the silence...",
    readTime: "6 min",
    category: "Community",
    likes: 432,
    date: "Mar 10, 2024",
  },
];

function Dashboard() {
  return (
    <div className="min-h-screen bg-transparent py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Your Stories</h1>
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
            New Story
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {dummyStories.map((story, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
            >
              <div className="p-6">
                <div className="flex items-center space-x-2 mb-3">
                  <span className="px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full">
                    {story.category}
                  </span>
                  <span className="flex items-center text-gray-500 text-sm">
                    <Clock className="w-4 h-4 mr-1" />
                    {story.readTime}
                  </span>
                </div>

                <h2 className="text-xl font-semibold text-gray-900 mb-3">
                  {story.title}
                </h2>

                <p className="text-gray-600 mb-4 line-clamp-3">
                  {story.excerpt}
                </p>

                <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                  <div className="flex items-center space-x-4">
                    <button className="flex items-center text-gray-500 hover:text-red-500 transition-colors">
                      <Heart className="w-5 h-5 mr-1" />
                      <span className="text-sm">{story.likes}</span>
                    </button>
                    <button className="text-gray-500 hover:text-blue-500 transition-colors">
                      <Share2 className="w-5 h-5" />
                    </button>
                  </div>
                  <button className="flex items-center text-blue-600 hover:text-blue-700 transition-colors">
                    <BookOpen className="w-5 h-5 mr-1" />
                    <span className="text-sm font-medium">Read</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
