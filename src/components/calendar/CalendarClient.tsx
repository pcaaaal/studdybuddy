'use client';

import React, { useState } from 'react';
import { GroupFilter } from './GroupFilter';
import { CalendarView, GroupWithSchedule } from './CalendarView';

interface CalendarClientProps {
    initialGroups: GroupWithSchedule[];
}

export default function CalendarClient({ initialGroups }: CalendarClientProps) {
    const [groups] = useState<GroupWithSchedule[]>(initialGroups);
    const [activeGroupFilters, setActiveGroupFilters] = useState<string[]>(
        initialGroups.map((g) => g.id),
    );

    // Toggle a study-group filter on/off
    const handleToggleGroup = (groupId: string) => {
        setActiveGroupFilters((prev) =>
            prev.includes(groupId)
                ? prev.filter((id) => id !== groupId)
                : [...prev, groupId],
        );
    };

    return (
        <div className="flex flex-row space-x-8 w-full">
            {/* 1) Group‐filter switches */}
            <div className="w-1/4">
                <GroupFilter
                    groups={groups}
                    activeGroupFilters={activeGroupFilters}
                    onToggleGroup={handleToggleGroup}
                />
            </div>

            {/* 2) Calendar grid with month navigation */}
            <div className="flex-1">
                <CalendarView
                    groups={groups}
                    activeGroupFilters={activeGroupFilters}
                />
            </div>
        </div>
    );
}
