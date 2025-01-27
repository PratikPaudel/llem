import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Home from "./pages/Home";
import About from "./pages/About";
import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile";
import Landing from "./pages/Landing";
import ProtectedRoute from "./components/ProtectedRoute";
import './App.css'

function App() {
    return (
        <Router>
            <div className="min-h-screen">
                <Routes>
                    <Route path="/" element={<Landing />} />
                    <Route
                        path="/*"
                        element={
                            <ProtectedRoute>
                                <>
                                    <Header />
                                    <Routes>
                                        <Route path="/home" element={<Home />} />
                                        <Route path="/about" element={<About />} />
                                        <Route path="/dashboard" element={<Dashboard />} />
                                        <Route path="/profile" element={<Profile />} />
                                    </Routes>
                                </>
                            </ProtectedRoute>
                        }
                    />
                </Routes>
            </div>
        </Router>
    )
}

export default App
