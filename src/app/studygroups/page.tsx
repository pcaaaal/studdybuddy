'use client';

import { useState } from 'react';

const allGroups = [
    {
        id: 'math',
        name: 'Mathematical Insights Circle',
        description: 'Weekly sessions on problem-solving, theory, and mathematical exploration.',
        audience: 'Undergraduates, graduate students, or anyone passionate about mathematical thinking.'
    },
    {
        id: 'physics',
        name: 'Physics Explorers Forum',
        description: 'Hands-on physics learning with discussions and exam prep.',
        audience: 'Physics and engineering students looking for deeper understanding and practical experience.'
    },
    {
        id: 'chem',
        name: 'Chem Collective',
        description: 'Collaborative chemistry sessions with demos and problem sets.',
        audience: 'Chemistry majors, pre-med students, and anyone curious about experimental and theoretical chemistry.'
    },
    {
        id: 'bio',
        name: 'Life Sciences Roundtable',
        description: 'A deep dive into biology with quizzes, papers, and discussions.',
        audience: 'Biology and health sciences students and anyone curious about living systems.'
    },
    {
        id: 'history',
        name: 'Historical Perspectives Circle',
        description: 'Interactive history sessions exploring events, sources, and analysis.',
        audience: 'History enthusiasts, humanities students, and critical thinkers.'
    }
];

export default function StudyGroupsPage() {
    const [search, setSearch] = useState('');

    const filteredGroups = allGroups.filter(group =>
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
                                <th className="py-3 px-4 font-semibold">Audience</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredGroups.map((group, index) => (
                                <tr
                                    key={index}
                                    className="border-t border-gray-200 hover:bg-gray-50 cursor-pointer"
                                    onClick={() =>
                                        window.location.href = `/studygroups/${group.id}`
                                    }
                                >
                                    <td className="py-3 px-4 text-blue-600 underline">{group.name}</td>
                                    <td className="py-3 px-4">{group.description}</td>
                                    <td className="py-3 px-4">{group.audience}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            <div className="space-y-2">
                <h2 className="text-xl font-semibold">My Study Groups</h2>
                <div className="bg-yellow-100 text-black px-6 py-4 rounded shadow w-fit">
                    <strong>Mathematical Insights Circle</strong><br />
                    Weekly sessions on problem-solving, theory, and mathematical exploration.
                </div>
            </div>
        </div>
    );
}
