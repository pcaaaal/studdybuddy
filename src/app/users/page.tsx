/* eslint-disable @typescript-eslint/no-explicit-any */

'use client';
import { useEffect, useState } from 'react';

export default function UsersPage() {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        fetch('http://localhost:3001/users')
            .then(res => res.json())
            .then(data => setUsers(data));
    }, []);

    return (
        <div>
            <h1 className="text-2xl font-bold mb-4">Alle Benutzer</h1>
            <ul className="space-y-2">
                {users.map((user: any) => (
                    <li key={user.id} className="p-3 bg-gray-100 rounded">
                        {user.name} – {user.school}
                    </li>
                ))}
            </ul>
        </div>
    );
}