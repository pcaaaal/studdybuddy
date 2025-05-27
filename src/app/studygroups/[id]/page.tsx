'use client';

import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

const mockGroups = [
    {
        id: 'math',
        name: 'Mathematical Insights Circle',
        description: 'Weekly sessions on problem-solving, theory, and mathematical exploration.',
        members: ['Alice', 'Bob', 'Charlie'],
        events: [
            { title: 'Algebra Drill', date: '2025-06-01' },
            { title: 'Calculus Talk', date: '2025-06-04' }
        ]
    },
    {
        id: 'physics',
        name: 'Physics Explorers Forum',
        description: 'Hands-on physics learning with discussions and exam prep.',
        members: ['Dora', 'Eli', 'Finn'],
        events: [
            { title: 'Kinematics Practice', date: '2025-06-02' }
        ]
    }
];

export default function StudyGroupDetailPage() {
    const { id } = useParams();
    const [group, setGroup] = useState<unknown>(null);
    const [subscribed, setSubscribed] = useState(false);

    useEffect(() => {
        const normalizedId = typeof id === 'string' ? id.toLowerCase() : '';
        const found = mockGroups.find((g) =>
            g.id === normalizedId || g.name.toLowerCase().replace(/\s+/g, '-') === normalizedId
        );
        setGroup(found);
    }, [id]);

    const toggleSubscription = () => setSubscribed((prev) => !prev);

    if (!group) return <p>Loading...</p>;

    return (
        <div className="flex flex-col lg:flex-row gap-6">
            <div className="flex-1 space-y-4">
                <div className="bg-white shadow rounded p-6">
                    <h1 className="text-3xl font-bold mb-2">{group.name}</h1>
                    <p className="text-gray-700">{group.description}</p>
                </div>

                <div className="bg-white shadow rounded p-6">
                    <h2 className="text-xl font-semibold mb-2">Members</h2>
                    <ul className="list-disc pl-5 text-sm">
                        {group.members.map((member: string) => (
                            <li key={member}>{member}</li>
                        ))}
                    </ul>
                </div>

                <div className="bg-white shadow rounded p-6">
                    <button
                        onClick={toggleSubscription}
                        className={`w-full px-4 py-2 rounded text-white ${subscribed ? 'bg-red-500' : 'bg-blue-600'}`}
                    >
                        {subscribed ? 'Unsubscribe' : 'Subscribe'}
                    </button>
                </div>
            </div>

            <div className="w-full lg:w-[66vw] bg-white shadow rounded p-6">
                <h2 className="text-2xl font-semibold mb-4">Group Calendar</h2>
                <div className="scale-[0.9] origin-top-left">
                    <Calendar
                        tileContent={({ date }) => {
                            const foundEvent = group.events.find((event: { date: string | number | Date; }) =>
                                new Date(event.date).toDateString() === date.toDateString()
                            );
                            return foundEvent ? (
                                <p className="text-xs text-purple-600 font-semibold">{foundEvent.title}</p>
                            ) : null;
                        }}
                    />
                </div>
            </div>
        </div>
    );
}
