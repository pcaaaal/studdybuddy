import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function LoginPage() {
    return (
        <div className="max-w-md mx-auto bg-white p-6 rounded shadow">
            <h1 className="text-2xl font-bold mb-4">Sign up for StudyBuddy</h1>
            <form className="space-y-4">
                <div>
                    <label className="block text-sm font-medium">E-Mail</label>
                    <input type="text" className="mt-1 w-full border p-2 rounded" />
                </div>
                <div>
                    <label className="block text-sm font-medium">Password</label>
                    <input type="password" className="mt-1 w-full border p-2 rounded" />
                </div>
                <div className="flex justify-center space-x-4 mt-4">
                    <Button asChild>
                        <Link href="/">Login now</Link>
                    </Button>
                    <Button asChild>
                        <Link href="/register">Register now</Link>
                    </Button>
                </div>
            </form>
        </div>
    );
}