// import { Link } from 'react-router-dom'

// function Navbar() {
//     return (
//         <nav className="bg-white shadow w-full">
//             <div className="px-4">
//                 <div className="flex justify-between items-center h-16">
//                     <Link to="/" className="text-xl font-bold text-gray-900">
//                         human™
//                     </Link>
//                     <div className="flex space-x-4">
//                         <Link to="/" className="text-gray-600 hover:text-gray-900">
//                             Home
//                         </Link>
//                         <Link to="/dashboard" className="text-gray-600 hover:text-gray-900">
//                             Dashboard
//                         </Link>
//                         <Link to="/profile" className="text-gray-600 hover:text-gray-900">
//                             Profile
//                         </Link>
//                     </div>
//                 </div>
//             </div>
//         </nav>
//     )
// }

// export default Navbar
// import { Link } from 'react-router-dom';

// function Navbar() {
//     return (
//         <nav
//             className="fixed top-0 left-1/2 transform -translate-x-1/2 w-[85%] bg-white shadow-lg rounded-full py-2 px-6 z-50 flex items-center justify-between"
//         >
//             {/* Logo */}
//             <Link to="/" className="text-xl font-bold text-gray-900">
//                 human™
//             </Link>

//             {/* Links */}
//             <div className="flex space-x-8">
//                 <Link to="/" className="text-gray-600 hover:text-gray-900 text-lg transition-colors">
//                     Home
//                 </Link>
//                 <Link
//                     to="/dashboard"
//                     className="text-gray-600 hover:text-gray-900 text-lg transition-colors"
//                 >
//                     Dashboard
//                 </Link>
//                 <Link
//                     to="/profile"
//                     className="text-gray-600 hover:text-gray-900 text-lg transition-colors"
//                 >
//                     Profile
//                 </Link>
//             </div>
//         </nav>
//     );
// }

// export default Navbar;

import { Link } from 'react-router-dom';

function Navbar() {
    return (
        <nav
            className="fixed top-5 left-1/2 transform -translate-x-1/2 w-[85%] bg-transparent py-2 px-6 z-50 flex items-center justify-between"
        >
            {/* Logo */}
            <Link to="/" className="text-xl font-bold text-black">
                human™
            </Link>

            {/* Links */}
            <div className="flex space-x-8">
                <Link to="/about" className="font-sans text-black hover:text-gray-700 text-lg transition-colors">
                    about
                </Link>
                <Link
                    to="/dashboard"
                    className="font-sans text-black hover:text-gray-700 text-lg transition-colors"
                >
                    dashboard
                </Link>
                <Link
                    to="/profile"
                    className="font-sans text-black hover:text-gray-700 text-lg transition-colors"
                >
                    profile
                </Link>
            </div>
        </nav>
    );
}

export default Navbar;
