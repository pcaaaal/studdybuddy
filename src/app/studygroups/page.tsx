/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { useState, useEffect } from 'react';

export default function StudyGroupsPage() {
    const [search, setSearch] = useState('');
    const [groups, setGroups] = useState<any[]>([]);

    useEffect(() => {
        fetch('http://localhost:3001/study-groups')
            .then(res => res.json())
            .then(async (data) => {
                const groupsWithMembers = await Promise.all(
                    data.map(async (group: any) => {
                        const membersRes = await fetch(`http://localhost:3001/group-members/${group.id}`);
                        const membersList = await membersRes.json();
                        return {
                            ...group,
                            members: membersList.map((m: any) => m.name).join(', ')
                        };
                    })
                );
                setGroups(groupsWithMembers);
            });
    }, []);

    const filteredGroups = groups.filter((group: any) =>
        group.name.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="space-y-10">
            <h1 className="text-5xl font-extrabold">Study Groups</h1>

            <div className="bg-white shadow rounded-lg p-6">
                <h2 className="text-xl font-semibold mb-4">All Study Groups</h2>
                <div className="flex gap-2 mb-4">
                    <input
                        type="text"
                        placeholder="Search study groups..."
                        className="border border-gray-300 rounded px-4 py-2 w-full"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                    <button className="bg-black text-white px-4 py-2 rounded">Search</button>
                </div>

                <div className="overflow-x-auto">
                    <table className="min-w-full table-auto text-left">
                        <thead>
                            <tr className="border-b border-gray-300">
                                <th className="py-3 px-4 font-semibold">Name</th>
                                <th className="py-3 px-4 font-semibold">Description</th>
                                <th className="py-3 px-4 font-semibold">Members</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredGroups.map((group: any, index) => (
                                <tr
                                    key={index}
                                    className="border-t border-gray-200 hover:bg-gray-50 cursor-pointer"
                                    onClick={() =>
                                        window.location.href = `/studygroups/${group.id}`
                                    }
                                >
                                    <td className="py-3 px-4 text-blue-600 underline">{group.name}</td>
                                    <td className="py-3 px-4">{group.description}</td>
                                    <td className="py-3 px-4">{group.members || '-'}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}