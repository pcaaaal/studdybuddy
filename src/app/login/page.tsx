export default function LoginPage() {
    return (
        <div className="max-w-md mx-auto bg-white p-6 rounded shadow">
            <h1 className="text-2xl font-bold mb-4">Sign up for StudyBuddy</h1>
            <form className="space-y-4">
                <div>
                    <label className="block text-sm font-medium">Login</label>
                    <input type="text" className="mt-1 w-full border p-2 rounded" />
                </div>
                <div>
                    <label className="block text-sm font-medium">Password</label>
                    <input type="password" className="mt-1 w-full border p-2 rounded" />
                </div>
                <button
                    type="submit"
                    className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
                >
                    Sign in now
                </button>
            </form>
        </div>
    );
}
