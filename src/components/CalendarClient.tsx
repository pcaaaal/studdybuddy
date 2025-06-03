'use client';

import React, {useState, useMemo} from 'react';
import {Button} from '@/components/ui/button';
import {Switch} from '@/components/ui/switch';
import {Card, CardHeader, CardTitle, CardContent} from '@/components/ui/card';
import {Separator} from '@/components/ui/separator';

interface ScheduledEvent {
	date: string; // 'YYYY-MM-DD'
	time: string; // 'HH:mm'
}

export interface GroupWithSchedule {
	id: string;
	name: string;
	color: string;
	schedule: ScheduledEvent[];
}

interface CalendarClientProps {
	initialGroups: GroupWithSchedule[];
}

export default function CalendarClient({initialGroups}: CalendarClientProps) {
	const [groups] = useState<GroupWithSchedule[]>(initialGroups);
	const [activeGroupFilters, setActiveGroupFilters] = useState<string[]>(
		initialGroups.map((g) => g.id),
	);

	const [currentMonth, setCurrentMonth] = useState<number>(
		new Date().getMonth(),
	);
	const [currentYear, setCurrentYear] = useState<number>(
		new Date().getFullYear(),
	);

	// Toggle a study‐group filter on/off
	const handleToggleGroup = (groupId: string) => {
		setActiveGroupFilters((prev) =>
			prev.includes(groupId)
				? prev.filter((id) => id !== groupId)
				: [...prev, groupId],
		);
	};

	// How many days in a given month/year
	const getDaysInMonth = (year: number, month: number): number =>
		new Date(year, month + 1, 0).getDate();

	// For a particular “day” number, return all visible events that match that ISO date
	const getEventsForDay = (day: number) => {
		const dateObj = new Date(currentYear, currentMonth, day);
		const isoDate = dateObj.toISOString().split('T')[0]; // 'YYYY-MM-DD'

		return groups
			.filter((group) => activeGroupFilters.includes(group.id))
			.flatMap((group) =>
				group.schedule
					.filter((s) => s.date === isoDate)
					.map((s) => ({
						title: group.name,
						time: s.time,
						color: group.color,
					})),
			);
	};

	// Change month (prev/next)
	const handleMonthChange = (direction: 'next' | 'prev') => {
		let newMonth = currentMonth + (direction === 'next' ? 1 : -1);
		let newYear = currentYear;

		if (newMonth < 0) {
			newMonth = 11;
			newYear -= 1;
		} else if (newMonth > 11) {
			newMonth = 0;
			newYear += 1;
		}

		setCurrentMonth(newMonth);
		setCurrentYear(newYear);
	};

	const daysInMonth = useMemo(
		() => getDaysInMonth(currentYear, currentMonth),
		[currentYear, currentMonth],
	);

	const firstDayOfWeek = useMemo(
		() => new Date(currentYear, currentMonth, 1).getDay(),
		[currentYear, currentMonth],
	);

	const monthName = useMemo(() => {
		const name = new Date(currentYear, currentMonth).toLocaleString(
			'default',
			{month: 'long'},
		);
		return name.charAt(0).toUpperCase() + name.slice(1);
	}, [currentYear, currentMonth]);

	return (
		<div className="space-y-8 w-full">
			{/* Group Filter Toggles */}
			<Card className="p-4">
				<CardHeader>
					<CardTitle className="text-lg">
						Filter Study Groups
					</CardTitle>
				</CardHeader>
				<CardContent className="flex flex-wrap gap-4">
					{groups.map((group) => {
						const isActive = activeGroupFilters.includes(group.id);
						return (
							<div
								key={group.id}
								className="flex items-center space-x-2"
							>
								<Switch
									id={`switch-${group.id}`}
									checked={isActive}
									onCheckedChange={() =>
										handleToggleGroup(group.id)
									}
								/>
								<label
									htmlFor={`switch-${group.id}`}
									className={`text-sm font-medium ${
										isActive
											? 'text-gray-900'
											: 'text-gray-500'
									}`}
								>
									{group.name}
								</label>
								<span
									className={`w-3 h-3 rounded-full ${group.color}`}
								/>
							</div>
						);
					})}
				</CardContent>
			</Card>

			{/* Month Navigation */}
			<div className="flex justify-between items-center">
				<Button
					variant="outline"
					onClick={() => handleMonthChange('prev')}
				>
					← Voriger Monat
				</Button>
				<h2 className="text-2xl font-semibold">
					{monthName} {currentYear}
				</h2>
				<Button onClick={() => handleMonthChange('next')}>
					Nächster Monat →
				</Button>
			</div>

			{/* Calendar Grid */}
			<Card className="bg-white shadow rounded">
				<CardHeader className="px-4 py-2">
					<CardTitle className="text-lg">Calendar View</CardTitle>
				</CardHeader>
				<Separator />
				<CardContent className="p-4">
					{/* Weekday Headers */}
					<div className="grid grid-cols-7 gap-2 text-center text-sm font-medium text-gray-600 mb-2">
						{['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(
							(weekday) => (
								<div key={weekday}>{weekday}</div>
							),
						)}
					</div>

					{/* Grid Cells */}
					<div className="grid grid-cols-7 gap-2 text-sm">
						{/* Empty slots up to first day */}
						{Array.from({length: firstDayOfWeek}).map((_, idx) => (
							<div key={`empty-${idx}`} className="h-28" />
						))}

						{Array.from({length: daysInMonth}).map((_, idx) => {
							const day = idx + 1;
							const events = getEventsForDay(day);

							return (
								<div
									key={day}
									className="border rounded p-2 h-28 text-left relative"
								>
									<div className="text-xs font-semibold text-gray-400 absolute top-1 right-2">
										{day}
									</div>
									<div className="space-y-1 mt-5">
										{events.map((evt, i) => (
											<div
												key={`${evt.title}-${evt.time}-${i}`}
												className={`${evt.color} text-xs p-1 rounded`}
											>
												{evt.title.length > 18
													? `${evt.title.slice(
															0,
															18,
													  )}...`
													: evt.title}
												<div className="text-[10px]">
													{evt.time}
												</div>
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
