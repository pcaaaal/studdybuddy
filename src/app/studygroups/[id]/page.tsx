/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

export default function StudyGroupDetailPage() {
    const { id } = useParams();
    const [group, setGroup] = useState<any>(null);
    const [members, setMembers] = useState<any[]>([]);
    const [events, setEvents] = useState<any[]>([]);
    const [subscribed, setSubscribed] = useState(false);
    const userId = 1;

    useEffect(() => {
        if (!id) return;

        fetch(`http://localhost:3001/study-groups/${id}`)
            .then(res => res.json())
            .then((found) => {
                if (found) {
                    fetch(`http://localhost:3001/group-members/${id}`)
                        .then(res => res.json())
                        .then(membersList => {
                            setMembers(membersList);
                            setGroup({
                                ...found,
                                members: membersList.map((m: any) => m.name).join(', '),
                                color: found.color || '#888' 
                            });
                            const isMember = membersList.some((m: any) => m.id === userId);
                            setSubscribed(isMember);
                        });
                }
            });

        fetch(`http://localhost:3001/events/${id}`)
            .then(res => res.json())
            .then(setEvents);
    }, [id]);

    const toggleSubscription = () => {
        const newState = !subscribed;
        setSubscribed(newState);

        if (newState) {
            fetch('http://localhost:3001/group-members', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ user_id: userId, group_id: id })
            })
                .then(res => res.json())
                .then(() => {
                    fetch(`http://localhost:3001/group-members/${id}`)
                        .then(res => res.json())
                        .then(data => {
                            setMembers(data);
                            if (group) {
                                setGroup({ ...group, members: data.map((m: any) => m.name).join(', ') });
                            }
                        });
                });
        } else {
            fetch(`http://localhost:3001/group-members/${id}/${userId}`, {
                method: 'DELETE'
            })
                .then(res => res.json())
                .then(() => {
                    fetch(`http://localhost:3001/group-members/${id}`)
                        .then(res => res.json())
                        .then(data => {
                            setMembers(data);
                            if (group) {
                                setGroup({ ...group, members: data.map((m: any) => m.name).join(', ') });
                            }
                        });
                });
        }
    };

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
                        {members.map((member) => (
                            <li key={member.id}>{member.name}</li>
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
                            const foundEvent = events.find(event =>
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
