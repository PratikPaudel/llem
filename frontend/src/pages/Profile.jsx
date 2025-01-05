function Profile() {
    return (
        <div className="max-w-4xl mx-auto px-4 py-8">
            <div className="bg-white p-6 rounded-lg shadow-lg">
                <div className="flex flex-col items-center">
                    {/* Header */}
                    <h1 className="text-4xl font-bold text-gray-900 mb-4">Pratik Paudel</h1>

                    {/* Profile Image */}
                    <div className="mb-6">
                        <img
                            src="/workspaces/llem/frontend/src/pages/Profile_images/Pratik.png" // Replace with the image path
                            alt="Pratik Paudel"
                            className="w-40 h-40 rounded-full object-cover shadow"
                        />
                    </div>

                    {/* Highlighted Section */}
                    <div className="mb-6 text-center">
                        <h2 className="text-xl font-semibold text-gray-800 mb-2">
                            open to chat
                        </h2>
                        <p className="text-gray-600">XXX-XXX-XXXX</p>
                    </div>

                    {/* Experience Section */}
                    <div className="w-full text-left">
                        <h2 className="text-xl font-semibold text-gray-800 mb-4">Understands</h2>
                        <ul className="list-disc pl-6 text-gray-600">
                            <li>Being from a third-world country at a Christian school</li>
                            <li>International student homesickness</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default Profile