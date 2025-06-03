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
		<div className="space-y-8 w-full">
			{/* 1) Group‐filter switches */}
			<GroupFilter
				groups={groups}
				activeGroupFilters={activeGroupFilters}
				onToggleGroup={handleToggleGroup}
			/>

			{/* 2) Calendar grid with month navigation */}
			<CalendarView
				groups={groups}
				activeGroupFilters={activeGroupFilters}
			/>
		</div>
	);
}
