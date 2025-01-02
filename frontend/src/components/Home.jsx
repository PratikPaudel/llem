
function Home() {
    return (
        <div className="bg-white min-h-screen flex flex-col items-center justify-center">
            <div className="w-full max-w-2xl mx-auto px-4">
                {/* Minimal Branding */}
                <div className="text-center mb-8">
                    <h1 className="text-4xl font-semibold text-gray-900">human™</h1>
                    <p className="mt-2 text-lg text-gray-600">library of human experiences</p>
                </div>

                {/* Search Interface */}
                <form onSubmit={handleSearch}>
                    <div className="relative">
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full h-14 px-6 rounded-lg border border-gray-200 bg-white focus:outline-none focus:border-gray-300 focus:ring-1 focus:ring-gray-300 shadow-sm text-lg"
                            placeholder="Search experiences..."
                        />
                        <button
                            type="submit"
                            className="absolute right-4 top-4 text-gray-400 hover:text-gray-600 focus:outline-none"
                            aria-label="Search"
                        >
                            <Search className="w-6 h-6" />
                        </button>
                    </div>
                </form>

                {/* Minimal Helper Text */}
                <p className="mt-4 text-center text-sm text-gray-500">
                    find a perspective that inspires.
                </p>
            </div>
        </div>
    )
}
export default Home