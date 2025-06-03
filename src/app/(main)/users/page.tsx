/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import { getAllUsers } from '@/lib/collections/user';
import { useEffect, useState } from 'react';

export default function UsersPage() {
    const [users, setUsers] = useState<any[]>([]);

    useEffect(() => {
        async function fetchUsers() {
            try {
                const data = await getAllUsers();
                setUsers(data);
            } catch (err) {
                console.error("Error fetching users:", err);
            }
        }
        fetchUsers();
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