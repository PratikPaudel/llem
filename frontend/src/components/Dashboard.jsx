// src/pages/Dashboard.jsx
function Dashboard() {
    return (
        <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl font-bold text-gray-900 mb-8">Dashboard</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* Add your dashboard widgets here */}
                <div className="bg-white p-6 rounded-lg shadow">
                    <h2 className="text-xl font-semibold mb-4">Widget 1</h2>
                    <p className="text-gray-600">Dashboard content goes here.</p>
                </div>
            </div>
        </div>
    )
}
export default Dashboard
