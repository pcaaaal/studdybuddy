/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function StudyGroupDetailPage() {
    const { id } = useParams();
    const [group, setGroup] = useState<any>(null);
    const [members, setMembers] = useState<any[]>([]);
    const [events, setEvents] = useState<any[]>([]);
    const [subscribed, setSubscribed] = useState(false);
    const userId = 1;

    const [currentMonth, setCurrentMonth] = useState(5);
    const [currentYear, setCurrentYear] = useState(2025);

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

        const url = `http://localhost:3001/group-members${newState ? '' : `/${id}/${userId}`}`;
        const method = newState ? 'POST' : 'DELETE';
        const body = newState ? JSON.stringify({ user_id: userId, group_id: id }) : null;

        fetch(url, {
            method,
            headers: { 'Content-Type': 'application/json' },
            ...(body && { body })
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
    };

    const handleMonthChange = (dir: 'next' | 'prev') => {
        let newMonth = currentMonth + (dir === 'next' ? 1 : -1);
        let newYear = currentYear;

        if (newMonth < 0) {
            newMonth = 11;
            newYear--;
        } else if (newMonth > 11) {
            newMonth = 0;
            newYear++;
        }

        setCurrentMonth(newMonth);
        setCurrentYear(newYear);
    };

    const getDaysInMonth = (year: number, month: number) => {
        return new Date(year, month + 1, 0).getDate();
    };

    const getEventsForDay = (day: number) => {
        const dateObj = new Date(currentYear, currentMonth, day);
        const isoDate = dateObj.toISOString().split('T')[0];
        return events.filter((e: any) => e.date === isoDate);
    };

    const daysInMonth = getDaysInMonth(currentYear, currentMonth);
    const firstDay = new Date(currentYear, currentMonth, 1).getDay();

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
                <div className="flex justify-between items-center mb-4">
                    <button
                        className="bg-gray-200 text-black px-4 py-2 rounded"
                        onClick={() => handleMonthChange('prev')}
                    >
                        ← Previous
                    </button>
                    <span className="text-lg font-semibold">
                        {new Date(currentYear, currentMonth).toLocaleString('default', { month: 'long' })} {currentYear}
                    </span>
                    <button
                        className="bg-blue-600 text-white px-4 py-2 rounded"
                        onClick={() => handleMonthChange('next')}
                    >
                        Next →
                    </button>
                </div>

                <div className="grid grid-cols-7 gap-2 text-center text-sm font-medium text-gray-600 mb-2">
                    {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((d) => (
                        <div key={d}>{d}</div>
                    ))}
                </div>

                <div className="grid grid-cols-7 gap-2 text-sm">
                    {Array.from({ length: firstDay }).map((_, index) => (
                        <div key={`empty-${index}`} className="h-28" />
                    ))}
                    {Array.from({ length: daysInMonth }).map((_, index) => {
                        const day = index + 1;
                        const dayEvents = getEventsForDay(day);
                        return (
                            <div key={day} className="border rounded p-2 h-28 text-left relative">
                                <div className="text-xs font-semibold text-gray-400 absolute top-1 right-2">{day}</div>
                                <div className="space-y-1 mt-5">
                                    {dayEvents.map((e: any, i: number) => (
                                        <div key={e.title + e.time + i} className="bg-purple-200 text-xs p-1 rounded">
                                            {e.title.slice(0, 18)}...
                                            <div className="text-[10px]">{e.time}</div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}
