'use client';

import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  addUserToStudyGroup,
  deleteUserFromStudyGroup,
  isUserInStudyGroup,
} from '@/lib/collections/studygroup';
import { pb } from '@/lib/pocketbase'; // Importiere die PocketBase-Instanz

export default function StudyGroupClient({ userId, group, events }: any) {
  const [subscribed, setSubscribed] = useState(false);
  const [members, setMembers] = useState<any[]>([]);
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());

  useEffect(() => {
    // Check if the current user is already in the group
    isUserInStudyGroup(group.id, userId).then(setSubscribed);

    // Extract members from the group data
    const memberLinks = group.expand?.user_studygroup_via_studygroup || [];
    const memberList = memberLinks.map((link: any) => link.expand?.user).filter(Boolean);
    setMembers(memberList);
  }, [group, userId]);

  const toggleSubscription = async () => {
    try {
      if (subscribed) {
        // Unsubscribe the user
        const result = await deleteUserFromStudyGroup(group.id, userId);
        if (result.success) {
          setSubscribed(false);
          setMembers((prev) => prev.filter((m: any) => m.id !== userId));
        }
      } else {
        // Subscribe the user
        const result = await addUserToStudyGroup(group.id, userId);
        if (result.success) {
          setSubscribed(true);
          const user = await pb.collection('user').getOne(userId); // Hole den Benutzer aus der Datenbank
          setMembers((prev) => [...prev, user]); // Füge den Benutzer zur Mitgliederliste hinzu
        }
      }
    } catch (error) {
      console.error('Failed to toggle subscription:', error);
    }
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

    return events.filter((e: any) => {
      const eventDate = new Date(e.date);
      return eventDate.toISOString().split('T')[0] === isoDate;
    });
  };

  const daysInMonth = getDaysInMonth(currentYear, currentMonth);
  const firstDay = new Date(currentYear, currentMonth, 1).getDay();

  return (
    <div className="flex flex-col lg:flex-row gap-6 md:container px-8">
      <div className="flex-1 space-y-4">
        <Card>
          <CardContent className="pt-6 space-y-2">
            <h1 className="text-3xl font-bold">{group.name}</h1>
            <p className="text-gray-700">{group.description}</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6 space-y-2">
            <h2 className="text-xl font-semibold">Members</h2>
            {members.length === 0 ? (
              <p className="text-muted-foreground">No members yet.</p>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {members.map((member: any) => (
                    <TableRow key={member.id}>
                      <TableCell>{member.name}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <Button
              variant={subscribed ? 'destructive' : 'default'}
              className="w-full"
              onClick={toggleSubscription}
            >
              {subscribed ? 'Unsubscribe' : 'Subscribe'}
            </Button>
          </CardContent>
        </Card>
      </div>

      <Card className="w-full lg:w-[66vw]">
        <CardContent className="pt-6">
          <div className="flex justify-between items-center mb-4">
            <Button
              variant="secondary"
              onClick={() => handleMonthChange('prev')}
            >
              ← Previous
            </Button>
            <span className="text-lg font-semibold">
              {new Date(currentYear, currentMonth).toLocaleString('default', {
                month: 'long',
              })}{' '}
              {currentYear}
            </span>
            <Button onClick={() => handleMonthChange('next')}>Next →</Button>
          </div>

          <div className="grid grid-cols-7 gap-2 text-center text-sm font-medium text-muted-foreground mb-2">
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
                <div
                  key={day}
                  className="border rounded p-2 h-28 text-left relative"
                >
                  <div className="text-xs font-semibold text-muted-foreground absolute top-1 right-2">
                    {day}
                  </div>
                  <div className="space-y-1 mt-5">
                    {dayEvents.map((e: any, i: number) => (
                      <div
                        key={e.title + e.date + i}
                        className="bg-blue-200 text-xs p-1 rounded"
                      >
                        {e.title}
                        <br />
                        {e.date}
                        <div className="text-[10px]"></div>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}