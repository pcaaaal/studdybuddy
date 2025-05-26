'use client';

import { useState } from 'react';
import dayjs from 'dayjs';

type CalendarEvent = {
    id: string;
    title: string;
    date: string;
    time: string;
    color: string;
};

const initialEvents: CalendarEvent[] = [
    { id: '1', title: 'Mathematical Insights Circle', date: '2025-05-01', time: '9:45 AM', color: 'bg-gray-200' },
    { id: '2', title: 'Life Sciences Roundtable', date: '2025-05-08', time: '1:45 PM', color: 'bg-green-100' },
    { id: '3', title: 'Mathematical Insights Circle', date: '2025-05-05', time: '12:30 PM', color: 'bg-orange-100' },
    { id: '4', title: 'Mathematical Insights Circle', date: '2025-05-11', time: '2:30 PM', color: 'bg-orange-100' },
    { id: '5', title: 'Chem Collective', date: '2025-05-25', time: '2:30 PM', color: 'bg-yellow-100' },
    { id: '6', title: 'Mathematical Insights Circle', date: '2025-05-22', time: '12:15 PM', color: 'bg-purple-100' },
    { id: '7', title: 'Physics Explorers Forum', date: '2025-05-29', time: '10:45 AM', color: 'bg-gray-200' },
    { id: '8', title: 'Mathematical Insights Circle', date: '2025-05-30', time: '8:45 AM', color: 'bg-orange-100' },
];

export default function CalendarPage() {
    const [events, setEvents] = useState(initialEvents);
    const [title, setTitle] = useState('');
    const [date, setDate] = useState('');
    const [time, setTime] = useState('');
    const [color, setColor] = useState('bg-blue-100');

    const daysInMonth = 31;
    const year = 2025;
    const month = 4; 

    const handleAdd = () => {
        if (title && date && time) {
            setEvents(prev => [...prev, { id: crypto.randomUUID(), title, date, time, color }]);
            setTitle('');
            setDate('');
            setTime('');
        }
    };

    const handleDelete = (id: string) => {
        setEvents(prev => prev.filter(e => e.id !== id));
    };

    const getEventsForDay = (day: number) => {
        const dateStr = dayjs(new Date(year, month, day)).format('YYYY-MM-DD');
        return events.filter(e => e.date === dateStr);
    };

    return (
        <div className="space-y-8">
            <h1 className="text-5xl font-extrabold">Calendar</h1>
            <p className="text-gray-600">
                Here you can view all the events and meetings scheduled for your study groups. Click on an event to delete it.
            </p>

            <div className="bg-white shadow rounded p-6 space-y-4">
                <h2 className="font-semibold text-xl">Add Event</h2>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <input
                        type="text"
                        placeholder="Event title"
                        value={title}
                        onChange={e => setTitle(e.target.value)}
                        className="border p-2 rounded"
                    />
                    <input
                        type="date"
                        value={date}
                        onChange={e => setDate(e.target.value)}
                        className="border p-2 rounded"
                    />
                    <input
                        type="time"
                        value={time}
                        onChange={e => setTime(e.target.value)}
                        className="border p-2 rounded"
                    />
                    <select value={color} onChange={e => setColor(e.target.value)} className="border p-2 rounded">
                        <option value="bg-orange-100">Orange</option>
                        <option value="bg-green-100">Green</option>
                        <option value="bg-yellow-100">Yellow</option>
                        <option value="bg-purple-100">Purple</option>
                        <option value="bg-gray-200">Gray</option>
                    </select>
                </div>
                <button onClick={handleAdd} className="bg-black text-white px-6 py-2 rounded hover:bg-gray-800">
                    Add Event
                </button>
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
                        const eventList = getEventsForDay(day);

                        return (
                            <div key={day} className="border rounded p-2 h-28 text-left relative">
                                <div className="text-xs font-semibold text-gray-400 absolute top-1 right-2">{day}</div>
                                <div className="space-y-1 mt-5">
                                    {eventList.map(e => (
                                        <div
                                            key={e.id}
                                            className={`${e.color} text-xs p-1 rounded cursor-pointer`}
                                            onClick={() => handleDelete(e.id)}
                                            title="Click to remove"
                                        >
                                            {e.title.slice(0, 20)}... <span className="block text-[10px]">{e.time}</span>
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
