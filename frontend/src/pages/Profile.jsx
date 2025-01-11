import {
  Mail,
  MapPin,
  Link as LinkIcon,
  Twitter,
  Github,
  Calendar,
  Heart,
} from "lucide-react";

const dummyUser = {
  name: "Sarah Chen",
  role: "Software Engineer & Writer",
  bio: "Passionate about building inclusive technology and sharing stories that connect people. Former journalist turned developer, exploring the intersection of storytelling and code.",
  location: "San Francisco, CA",
  email: "sarah.chen@example.com",
  website: "sarahchen.dev",
  twitter: "@sarahcodes",
  github: "sarahchen",
  joinDate: "March 2024",
  stats: {
    stories: 42,
    followers: 1289,
    following: 891,
  },
  recentStories: [
    {
      title: "The Art of Technical Writing",
      date: "Mar 15, 2024",
      likes: 156,
    },
    {
      title: "From Journalism to JavaScript",
      date: "Mar 10, 2024",
      likes: 234,
    },
    {
      title: "Building Community Through Code",
      date: "Mar 5, 2024",
      likes: 189,
    },
  ],
};

function Profile() {
  return (
    <div className="min-h-screen bg-transparent py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Profile Header */}
        <div className="bg-white rounded-2xl shadow-md overflow-hidden">
          <div className="h-32 bg-gradient-to-r from-blue-400 to-indigo-500"></div>
          <div className="px-6 py-8">
            <div className="flex flex-col sm:flex-row items-center sm:items-start">
              <img
                src="https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah"
                alt="Profile"
                className="w-32 h-32 rounded-full border-4 border-white shadow-lg -mt-20"
              />
              <div className="mt-6 sm:mt-0 sm:ml-6 text-center sm:text-left">
                <h1 className="text-3xl font-bold text-gray-900">
                  {dummyUser.name}
                </h1>
                <p className="text-lg text-gray-600 mt-1">{dummyUser.role}</p>
                <p className="mt-4 text-gray-600 max-w-2xl">{dummyUser.bio}</p>
              </div>
            </div>

            {/* Stats */}
            <div className="flex justify-center sm:justify-start space-x-8 mt-6 pt-6 border-t border-gray-100">
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-900">
                  {dummyUser.stats.stories}
                </div>
                <div className="text-sm text-gray-500">Stories</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-900">
                  {dummyUser.stats.followers}
                </div>
                <div className="text-sm text-gray-500">Followers</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-900">
                  {dummyUser.stats.following}
                </div>
                <div className="text-sm text-gray-500">Following</div>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Info & Recent Stories */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
          {/* Contact Info */}
          <div className="md:col-span-1">
            <div className="bg-white rounded-xl shadow-md p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                Contact
              </h2>
              <div className="space-y-4">
                <div className="flex items-center text-gray-600">
                  <MapPin className="w-5 h-5 mr-3 text-gray-400" />
                  {dummyUser.location}
                </div>
                <div className="flex items-center text-gray-600">
                  <Mail className="w-5 h-5 mr-3 text-gray-400" />
                  {dummyUser.email}
                </div>
                <div className="flex items-center text-gray-600">
                  <LinkIcon className="w-5 h-5 mr-3 text-gray-400" />
                  {dummyUser.website}
                </div>
                <div className="flex items-center text-gray-600">
                  <Twitter className="w-5 h-5 mr-3 text-gray-400" />
                  {dummyUser.twitter}
                </div>
                <div className="flex items-center text-gray-600">
                  <Github className="w-5 h-5 mr-3 text-gray-400" />
                  {dummyUser.github}
                </div>
                <div className="flex items-center text-gray-600">
                  <Calendar className="w-5 h-5 mr-3 text-gray-400" />
                  Joined {dummyUser.joinDate}
                </div>
              </div>
            </div>
          </div>

          {/* Recent Stories */}
          <div className="md:col-span-2">
            <div className="bg-white rounded-xl shadow-md p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                Recent Stories
              </h2>
              <div className="space-y-4">
                {dummyUser.recentStories.map((story, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-4 hover:bg-gray-50 rounded-lg transition-colors"
                  >
                    <div>
                      <h3 className="font-medium text-gray-900">
                        {story.title}
                      </h3>
                      <p className="text-sm text-gray-500">{story.date}</p>
                    </div>
                    <div className="flex items-center text-gray-500">
                      <Heart className="w-4 h-4 mr-1" />
                      <span className="text-sm">{story.likes}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
