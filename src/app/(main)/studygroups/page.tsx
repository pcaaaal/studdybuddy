/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { getAllStudyGroups, getUsersFromStudyGroup } from '@/lib/collections/studygroup';
import { useEffect, useState } from 'react';
export default function StudyGroupsPage() {
    const [groups, setGroups] = useState<any[]>([]);
    const [search, setSearch] = useState('');
    const [sortKey, setSortKey] = useState<'name' | 'members'>('name');

    useEffect(() => {
        async function fetchStudyGroups() {
            const data = await getAllStudyGroups();
            setGroups(data);
        }
        fetchStudyGroups();
    }, []);

    const filteredGroups = groups
        .filter(group => group.name.toLowerCase().includes(search.toLowerCase()))
        .sort((a, b) => {
            if (sortKey === 'name') return a.name.localeCompare(b.name);
            if (sortKey === 'members') return b.members.length - a.members.length;
            return 0;
        });

    return (
        <div className="space-y-8 max-w-5xl mx-auto">
            <h1 className="text-5xl font-extrabold text-center">Study Groups</h1>

            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                <input
                    type="text"
                    placeholder="Search study groups..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="w-full sm:w-1/2 border border-gray-300 px-4 py-2 rounded shadow"
                />
                <select
                    value={sortKey}
                    onChange={(e) => setSortKey(e.target.value as any)}
                    className="px-4 py-2 border border-gray-300 rounded shadow"
                >
                    <option value="name">Sort by Name</option>
                    <option value="members">Sort by Members</option>
                </select>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredGroups.map((group, index) => {
                    const users = getUsersFromStudyGroup(group); 
                    return (
                        <div
                            key={index}
                            className="flex bg-white rounded-xl shadow-md hover:shadow-lg transition cursor-pointer border border-gray-100 overflow-hidden"
                            onClick={() => window.location.href = `/studygroups/${group.id}`}
                        >
                            <div
                                className="w-2"
                                style={{ backgroundColor: group.color || '#E5E7EB' }}
                            />
                            <div className="p-5 flex-1">
                                <h2 className="text-xl font-bold text-blue-600 mb-2">{group.name}</h2>
                                <p className="text-sm text-gray-600 mb-3">{group.description}</p>
                                <p className="text-xs text-gray-400">
                                    👥 {users.length ? users.map(user => user.name).join(', ') : 'No members yet'}
                                </p>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}