import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function RegisterPage() {
    return (
        <div className="max-w-md mx-auto bg-white p-6 rounded shadow">
            <h1 className="text-2xl font-bold mb-4">Registriere dich bei StudyBuddy</h1>
            <form className="space-y-4">
                <div>
                    <label className="block text-sm font-medium">Benutzername</label>
                    <input type="text" className="mt-1 w-full border p-2 rounded" />
                </div>
                <div>
                    <label className="block text-sm font-medium">E-Mail</label>
                    <input type="email" className="mt-1 w-full border p-2 rounded" />
                </div>
                <div>
                    <label className="block text-sm font-medium">Passwort</label>
                    <input type="password" className="mt-1 w-full border p-2 rounded" />
                </div>
                <div className="flex justify-center mt-4">
                    <Button asChild>
                        <Link href={"/"}>Register now</Link>
                    </Button>
                </div>
            </form>
        </div>
    );
}