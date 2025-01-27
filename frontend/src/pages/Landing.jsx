import { useUser } from "@clerk/clerk-react";
import { Navigate } from "react-router-dom";
import { SignInButton, SignUpButton } from "@clerk/clerk-react";

const Landing = () => {
  const { isSignedIn, isLoaded } = useUser();

  if (!isLoaded) {
    return <div>Loading...</div>;
  }

  if (isSignedIn) {
    return <Navigate to="/home" replace />;
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <div className="text-center mb-12">
        <h1 className="text-6xl font-bold text-blue-600 mb-4">human™</h1>
        <p className="text-xl text-gray-600 mb-8">
          Explore the library of lived experiences
        </p>
        <div className="flex items-center justify-center space-x-4">
          <SignInButton mode="modal">
            <button className="px-6 py-3 text-gray-600 hover:text-gray-900 border border-gray-300 rounded-lg hover:border-gray-400 transition-colors">
              Sign in
            </button>
          </SignInButton>
          <SignUpButton mode="modal">
            <button className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
              Sign up
            </button>
          </SignUpButton>
        </div>
      </div>
      
      {/* Feature Highlights */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto px-4">
        <div className="text-center p-6 rounded-xl">
          <div className="text-3xl mb-4">🎤</div>
          <h3 className="text-lg font-semibold mb-2">Voice Search</h3>
          <p className="text-gray-600">Search experiences using your voice</p>
        </div>
        <div className="text-center p-6 rounded-xl">
          <div className="text-3xl mb-4">💡</div>
          <h3 className="text-lg font-semibold mb-2">AI-Powered</h3>
          <p className="text-gray-600">Smart search and summarization</p>
        </div>
        <div className="text-center p-6 rounded-xl">
          <div className="text-3xl mb-4">🤝</div>
          <h3 className="text-lg font-semibold mb-2">Community</h3>
          <p className="text-gray-600">Share and connect through stories</p>
        </div>
      </div>
    </div>
  );
};

export default Landing; 