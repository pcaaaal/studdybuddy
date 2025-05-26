import Link from 'next/link';

export default function Navbar() {
    return (
        <header className="bg-white shadow mb-6">
            <nav className="flex justify-between items-center max-w-6xl mx-auto p-4">
                <span className="text-xl font-bold text-blue-600">StudyBuddy</span>
                <div className="space-x-6">
                    <Link href="/" className="hover:underline">Home</Link>
                    <Link href="/studygroups" className="hover:underline">Study Groups</Link>
                    <Link href="/calendar" className="hover:underline">Calendar</Link>
                    <Link href="/register" className="hover:underline">Login</Link>
                </div>
            </nav>
        </header>
    );
}
