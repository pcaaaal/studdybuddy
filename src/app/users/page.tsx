import { users } from '@/lib/data';

export default function UsersPage() {
    return (
        <div>
            <h1 className="text-2xl font-bold mb-4">Alle Benutzer</h1>
            <ul className="space-y-2">
                {users.map((user) => (
                    <li key={user.id} className="p-3 bg-gray-100 rounded">
                        {user.name} – {user.school}
                    </li>
                ))}
            </ul>
        </div>
    );
}
