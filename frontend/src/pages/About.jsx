function About() {
    return (
        <div>
            <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-lg">
                <h1 className="text-3xl font-bold text-gray-900 mb-6">
                    About <span className="text-blue-600">human™</span>
                </h1>
                <p className="text-gray-700 text-lg mb-4">
                    <span className="font-bold">human™</span> is a modern web application powered by AI, enabling users to explore an archive of human experiences using voice or text input. At its core, it's a Large Lived Experience Model (LLEM) designed for intuitive, real-time search and summarization.
                </p>
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">Features</h2>
                <ul className="list-disc list-inside text-gray-700 mb-6">
                    <li>🎤 <span className="font-semibold">Voice Search</span>: Record and transcribe voice queries using OpenAI's Whisper model</li>
                    <li>🔍 <span className="font-semibold">Smart Search</span>: Vector-based search powered by Pinecone and OpenAI embeddings</li>
                    <li>📝 <span className="font-semibold">Query Refinement</span>: Automatically enhance search queries for better results</li>
                    <li>📊 <span className="font-semibold">Result Summarization</span>: Summarize search results with AI-driven key points</li>
                    <li>⚡ <span className="font-semibold">Real-time Processing</span>: Get immediate feedback with live processing indicators</li>
                    <li>🎨 <span className="font-semibold">Modern UI</span>: A clean, responsive design built with React and Tailwind CSS</li>
                </ul>
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">Tech Stack</h2>
                <h3 className="text-xl font-semibold text-gray-800">Backend</h3>
                <ul className="list-disc list-inside text-gray-700 mb-4">
                    <li>FastAPI (Python web framework)</li>
                    <li>OpenAI API (Whisper, embeddings)</li>
                    <li>Pinecone (Vector database)</li>
                    <li>Pydantic (Data validation)</li>
                    <li>Python-dotenv (Environment management)</li>
                </ul>
                <h3 className="text-xl font-semibold text-gray-800">Frontend</h3>
                <ul className="list-disc list-inside text-gray-700 mb-6">
                    <li>React</li>
                    <li>React Router</li>
                    <li>Tailwind CSS</li>
                    <li>Lucide Icons</li>
                    <li>Modern JavaScript (ES6+)</li>
                </ul>
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">Getting Started</h2>
                <p className="text-gray-700 mb-4">
                    To start using <span className="font-bold">human™</span>, follow the setup instructions in the project's documentation. Ensure you have Python 3.8+, Node.js 14+, and valid OpenAI and Pinecone API keys configured.
                </p>
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">Contributing</h2>
                <p className="text-gray-700 mb-6">
                    We welcome contributions! Fork the repository, create a feature branch, and open a pull request. For more details, refer to the contribution guide in the documentation.
                </p>
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">License</h2>
                <p className="text-gray-700">
                    This project is licensed under the MIT License. See the LICENSE file for details.
                </p>
                <footer className="mt-8 text-gray-600 text-sm">
                    Acknowledgements: Special thanks to OpenAI, Pinecone, and the FastAPI and React communities for their incredible tools and resources.
                </footer>
            </div>
        </div>
    );
}

export default About;