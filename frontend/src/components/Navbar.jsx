import { Link } from 'react-router-dom';

function Navbar() {
    return (
        <nav className="bg-white shadow">
            <div className="container mx-auto px-4">
                <div className="flex justify-between items-center h-16">
                    <Link to="/" className="text-xl font-bold text-gray-800">
                        Your App
                    </Link>
                    <div className="flex space-x-4">
                        <Link to="/" className="text-gray-600 hover:text-gray-900">
                            Home
                        </Link>
                        <Link to="/dashboard" className="text-gray-600 hover:text-gray-900">
                            Dashboard
                        </Link>
                        <Link to="/profile" className="text-gray-600 hover:text-gray-900">
                            Profile
                        </Link>
                    </div>
                </div>
            </div>
        </nav>
    )
}

export default Navbar
