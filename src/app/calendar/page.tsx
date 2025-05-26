'use client';

import { useState } from 'react';
import { studyGroups, currentUser } from '@/lib/data';

const month = 4;
const year = 2025;
const daysInMonth = 31;

export default function CalendarPage() {
    const [activeGroupFilters, setActiveGroupFilters] = useState(currentUser.subscribedGroups);

    const handleToggleGroup = (groupId: string) => {
        setActiveGroupFilters(prev =>
            prev.includes(groupId) ? prev.filter(id => id !== groupId) : [...prev, groupId]
        );
    };

    const getEventsForDay = (day: number) => {
        const date = new Date(year, month, day);
        const weekday = date.getDay();
        return studyGroups
            .filter(group => activeGroupFilters.includes(group.id))
            .flatMap(group =>
                group.schedule
                    .filter(s => s.weekday === weekday)
                    .map(s => ({
                        id: group.id,
                        title: group.name,
                        time: s.time,
                        color: s.color,
                    }))
            );
    };

    return (
        <div className="space-y-8">
            <h1 className="text-5xl font-extrabold">Calendar</h1>
            <p className="text-gray-600">Subscribed learning groups show up here. Toggle visibility below.</p>

            <div className="flex flex-wrap gap-2">
                {studyGroups.map(group => (
                    <button
                        key={group.id}
                        onClick={() => handleToggleGroup(group.id)}
                        className={`px-4 py-1 rounded border ${activeGroupFilters.includes(group.id)
                                ? 'bg-blue-600 text-white'
                                : 'bg-white text-black border-gray-300'
                            }`}
                    >
                        {group.name}
                    </button>
                ))}
            </div>

            <div className="bg-white shadow rounded p-6">
                <div className="grid grid-cols-7 gap-2 text-center text-sm font-medium text-gray-600 mb-2">
                    {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(d => (
                        <div key={d}>{d}</div>
                    ))}
                </div>
                <div className="grid grid-cols-7 gap-2 text-sm">
                    {Array.from({ length: daysInMonth }).map((_, index) => {
                        const day = index + 1;
                        const events = getEventsForDay(day);
                        return (
                            <div key={day} className="border rounded p-2 h-28 text-left relative">
                                <div className="text-xs font-semibold text-gray-400 absolute top-1 right-2">{day}</div>
                                <div className="space-y-1 mt-5">
                                    {events.map(e => (
                                        <div
                                            key={e.title + e.time}
                                            className={`${e.color} text-xs p-1 rounded`}
                                        >
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
