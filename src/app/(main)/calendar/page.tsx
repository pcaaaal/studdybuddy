/* eslint-disable @typescript-eslint/no-explicit-any */

// app/calendar/page.tsx
import React from 'react';
import { getCurrentUserId } from '../../../lib/getCurrentUserId';
import { getStudyGroupsByUserId } from '../../../lib/collections/studygroup';
import { getEventsByStudyGroupId } from '../../../lib/collections/events';
import CalendarClient from '../../../components/CalendarClient';

interface ScheduledEvent {
  title: string;
  date: string; // 'YYYY-MM-DD'
  time: string; // 'HH:mm'
}

export interface GroupWithSchedule {
  id: string;
  name: string;
  color: string;
  schedule: ScheduledEvent[];
}

export default async function CalendarPage() {
  // 1. Get the current user ID (reads cookies, server‐side)
  const userId = await getCurrentUserId();

  // 2. If not logged in, show a placeholder
  if (!userId) {
    return (
      <div className="p-8 text-center">
        <h1 className="text-2xl font-semibold">
          Please log in to view your calendar.
        </h1>
      </div>
    );
  }

  // 3. Fetch all study‐groups for this user
  const userGroups: any = await getStudyGroupsByUserId(userId);

  // 4. For each group, fetch its events (with unique cancelToken) and build schedule[]
  const detailedGroups: GroupWithSchedule[] = await Promise.all(
    userGroups.map(async (group: any) => {
      const rawEvents: any = await getEventsByStudyGroupId(group.id);
      const schedule: ScheduledEvent[] = rawEvents.map((evt: any) => {
        const title = evt.title;
        const dt = new Date(evt.date);
        const isoDate = dt.toISOString().split('T')[0]; // 'YYYY-MM-DD'
        // adjust hours/minutes if needed (e.g. timezone offset)
        const hours = dt.getHours().toString().padStart(2, '0');
        const minutes = dt.getMinutes().toString().padStart(2, '0');
        return {
          title: title,
          date: isoDate,
          time: `${hours}:${minutes}`,
        };
      });

      return {
        id: group.id,
        name: group.name,
        color: group.color || '#a1a1a1',
        schedule,
      };
    }),
  );

  // 5. Render the client component, passing detailedGroups as a prop
  return (
    <div className="container px-4 sm:px-8">
      <h1 className="text-5xl font-extrabold mb-4">Calendar</h1>

      {/* Desktop Calendar */}
      <div className="hidden md:block">
        <CalendarClient initialGroups={detailedGroups} />
      </div>

      {/* Mobile Calendar */}
      <div className="block md:hidden">
        <MobileCalendar groups={detailedGroups} />
      </div>
    </div>
  );
}

function MobileCalendar({ groups }: { groups: GroupWithSchedule[] }) {
  return (
    <div className="space-y-4">
      {groups.map((group) => (
        <div key={group.id} className="bg-white shadow rounded-lg p-4">
          <h2
            className="text-lg font-bold mb-2"
            style={{ color: group.color }}
          >
            {group.name}
          </h2>
          <ul className="space-y-2">
            {group.schedule.map((event, index) => (
              <li
                key={index}
                className="flex justify-between items-center border-b pb-2"
              >
                <div>
                  <p className="text-sm font-medium">{event.title}</p>
                  <p className="text-xs text-gray-500">{event.date}</p>
                </div>
                <span className="text-sm text-gray-700">{event.time}</span>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
