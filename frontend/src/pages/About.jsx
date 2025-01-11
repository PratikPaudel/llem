function About() {
  return (
    <div className="min-h-screen bg-transparent py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Left Column - Main Info */}
          <div className="bg-white p-8 rounded-2xl shadow-lg">
            <h1 className="text-4xl font-bold text-gray-900 mb-6">
              About <span className="text-blue-600">human™</span>
            </h1>

            <p className="text-gray-700 text-lg mb-6">
              <span className="font-bold">human™</span> is a modern web
              application powered by AI, enabling users to explore an archive of
              human experiences using voice or text input. At its core, it&apos;
              a Large Lived Experience Model (LLEM) designed for intuitive,
              real-time search and summarization.
            </p>

            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              Key Features
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
              <div className="p-4 bg-blue-50 rounded-lg">
                <div className="text-2xl mb-2">🎤</div>
                <h3 className="font-semibold mb-1">Voice Search</h3>
                <p className="text-sm text-gray-600">
                  Record and transcribe voice queries using OpenAI&apos;s
                  Whisper
                </p>
              </div>
              <div className="p-4 bg-blue-50 rounded-lg">
                <div className="text-2xl mb-2">🔍</div>
                <h3 className="font-semibold mb-1">Smart Search</h3>
                <p className="text-sm text-gray-600">
                  Vector-based search with Pinecone and OpenAI
                </p>
              </div>
              <div className="p-4 bg-blue-50 rounded-lg">
                <div className="text-2xl mb-2">📝</div>
                <h3 className="font-semibold mb-1">Query Refinement</h3>
                <p className="text-sm text-gray-600">
                  AI-powered query enhancement
                </p>
              </div>
              <div className="p-4 bg-blue-50 rounded-lg">
                <div className="text-2xl mb-2">⚡</div>
                <h3 className="font-semibold mb-1">Real-time Processing</h3>
                <p className="text-sm text-gray-600">
                  Immediate feedback with live indicators
                </p>
              </div>
            </div>
          </div>

          {/* Right Column - Tech Stack & Getting Started */}
          <div className="space-y-6">
            <div className="bg-white p-8 rounded-2xl shadow-lg">
              <h2 className="text-2xl font-semibold text-gray-900 mb-6">
                Tech Stack
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-3">
                    Backend
                  </h3>
                  <div className="space-y-2">
                    {[
                      "FastAPI",
                      "OpenAI API",
                      "Pinecone",
                      "Pydantic",
                      "Python-dotenv",
                    ].map((tech) => (
                      <div key={tech} className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                        <span className="text-gray-600">{tech}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-3">
                    Frontend
                  </h3>
                  <div className="space-y-2">
                    {[
                      "React",
                      "React Router",
                      "Tailwind CSS",
                      "Lucide Icons",
                      "Modern JavaScript",
                    ].map((tech) => (
                      <div key={tech} className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-indigo-500 rounded-full"></div>
                        <span className="text-gray-600">{tech}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-lg">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                Getting Started
              </h2>
              <p className="text-gray-700 mb-4">
                To start using <span className="font-bold">human™</span>,
                ensure you have:
              </p>
              <ul className="list-disc list-inside text-gray-600 space-y-2 mb-4">
                <li>Python 3.8+</li>
                <li>Node.js 14+</li>
                <li>Valid OpenAI API key</li>
                <li>Valid Pinecone API key</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Footer Section */}
        <div className="mt-8 bg-white p-8 rounded-2xl shadow-lg">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                Contributing
              </h2>
              <p className="text-gray-700">
                We welcome contributions! Fork the repository, create a feature
                branch, and open a pull request. For more details, refer to the
                contribution guide in the documentation.
              </p>
            </div>
            <div>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                License
              </h2>
              <p className="text-gray-700">
                This project is licensed under the MIT License. See the LICENSE
                file for details.
              </p>
            </div>
          </div>

          <div className="mt-8 pt-6 border-t border-gray-200 text-center text-gray-600 text-sm">
            Special thanks to OpenAI, Pinecone, and the FastAPI and React
            communities for their incredible tools and resources.
          </div>
        </div>
      </div>
    </div>
  );
}

export default About;
