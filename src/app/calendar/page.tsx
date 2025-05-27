/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { useState, useEffect } from 'react';

export default function CalendarPage() {
    const [groups, setGroups] = useState<any[]>([]);
    const [activeGroupFilters, setActiveGroupFilters] = useState<string[]>([]);
    const [currentMonth, setCurrentMonth] = useState(5); // Mai (0-basiert)
    const [currentYear, setCurrentYear] = useState(2025);

    useEffect(() => {
        const userId = 1;
        fetch(`http://localhost:3001/user-study-groups/${userId}`)
            .then(res => res.json())
            .then(async (groupList) => {
                setActiveGroupFilters(groupList.map((g: any) => g.id.toString()));

                const detailedGroups = await Promise.all(
                    groupList.map(async (g: any) => {
                        const eventsRes = await fetch(`http://localhost:3001/events/${g.id}`);
                        const events = await eventsRes.json();
                        return {
                            id: g.id,
                            name: g.name,
                            color: g.color || 'bg-gray-200',
                            schedule: events.map((e: any) => ({
                                weekday: new Date(e.date).getDay(),
                                time: e.time,
                                date: e.date
                            }))
                        };
                    })
                );

                setGroups(detailedGroups);
            });
    }, []);

    const handleToggleGroup = (groupId: string) => {
        setActiveGroupFilters((prev) =>
            prev.includes(groupId) ? prev.filter((id) => id !== groupId) : [...prev, groupId]
        );
    };

    const getDaysInMonth = (year: number, month: number) => {
        return new Date(year, month + 1, 0).getDate();
    };

    const getEventsForDay = (day: number) => {
        const dateObj = new Date(currentYear, currentMonth, day);
        const isoDate = dateObj.toISOString().split('T')[0];
        return groups
            .filter((group) => activeGroupFilters.includes(group.id.toString()))
            .flatMap((group) =>
                group.schedule
                    .filter((s: any) => s.date === isoDate)
                    .map((s: any) => ({
                        id: group.id,
                        title: group.name,
                        time: s.time,
                        color: group.color
                    }))
            );
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

    const daysInMonth = getDaysInMonth(currentYear, currentMonth);
    const firstDay = new Date(currentYear, currentMonth, 1).getDay();

    return (
        <div className="space-y-8">
            <h1 className="text-5xl font-extrabold">Calendar</h1>
            <p className="text-gray-600">Events of your subscribed groups. Switch months & toggle groups.</p>

            <div className="flex flex-wrap gap-2">
                {groups.map((group) => (
                    <button
                        key={group.id}
                        onClick={() => handleToggleGroup(group.id.toString())}
                        className={`px-4 py-1 rounded border ${activeGroupFilters.includes(group.id.toString())
                                ? 'bg-blue-600 text-white'
                                : 'bg-white text-black border-gray-300'
                            }`}
                    >
                        {group.name}
                    </button>
                ))}
            </div>

            <div className="flex justify-between items-center">
                <button
                    className="bg-gray-200 text-black px-4 py-2 rounded"
                    onClick={() => handleMonthChange('prev')}
                >
                    ← Voriger Monat
                </button>
                <span className="text-lg font-semibold">
                    {new Date(currentYear, currentMonth).toLocaleString('default', { month: 'long' })} {currentYear}
                </span>
                <button
                    className="bg-gray-200 text-black px-4 py-2 rounded"
                    onClick={() => handleMonthChange('next')}
                >
                    Nächster Monat →
                </button>
            </div>

            <div className="bg-white shadow rounded p-6">
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
                        const events = getEventsForDay(day);
                        return (
                            <div key={day} className="border rounded p-2 h-28 text-left relative">
                                <div className="text-xs font-semibold text-gray-400 absolute top-1 right-2">{day}</div>
                                <div className="space-y-1 mt-5">
                                    {events.map((e, i) => (
                                        <div key={e.title + e.time + i} className={`${e.color} text-xs p-1 rounded`}>
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
