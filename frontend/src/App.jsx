import { BrowserRouter as Router } from 'react-router-dom'
import Main from './components/Main'
import './App.css'

function App() {
    return (
        <Router>
            <div className="min-h-screen bg-white w-full">
                <Main />
            </div>
        </Router>
    )
}

export default App
