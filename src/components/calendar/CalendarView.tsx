'use client';

import React, { useState, useMemo } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

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

interface CalendarViewProps {
	groups: GroupWithSchedule[];
	activeGroupFilters: string[];
}

export function CalendarView({ groups, activeGroupFilters }: CalendarViewProps) {
	const [currentMonth, setCurrentMonth] = useState<number>(
		new Date().getMonth(),
	);
	const [currentYear, setCurrentYear] = useState<number>(
		new Date().getFullYear(),
	);

	const getDaysInMonth = (year: number, month: number): number =>
		new Date(year, month + 1, 0).getDate();

	// For a given “day” number, return all visible events matching that ISO date
	const getEventsForDay = (day: number) => {
		const dateObj = new Date(currentYear, currentMonth, day);
		const isoDate = dateObj.toISOString().split('T')[0]; // 'YYYY-MM-DD'

		return groups
			.filter((group) => activeGroupFilters.includes(group.id))
			.flatMap((group) =>
				group.schedule
					.filter((s) => s.date === isoDate)
					.map((s) => ({
						title: s.title,
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
			{
				month: 'long',
			},
		);
		return name.charAt(0).toUpperCase() + name.slice(1);
	}, [currentYear, currentMonth]);

	return (
		<div className="space-y-4 w-full">
			{/* Month Navigation */}
			<div className="flex justify-between items-center">
				<Button
					variant="outline"
					onClick={() => handleMonthChange('prev')}
				>
					← Previous month
				</Button>
				<h2 className="text-2xl font-semibold">
					{monthName} {currentYear}
				</h2>
				<Button onClick={() => handleMonthChange('next')}>
					Next month →
				</Button>
			</div>

			{/* Calendar Grid */}
			<Card className="bg-white shadow">
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
						{Array.from({ length: firstDayOfWeek }).map((_, idx) => (
							<div key={`empty-${idx}`} className="h-28" />
						))}

						{Array.from({ length: daysInMonth }).map((_, idx) => {
							const day = idx + 1;
							const events = getEventsForDay(day);

							const today = new Date();
							const isToday =
								today.getFullYear() === currentYear &&
								today.getMonth() === currentMonth &&
								day === today.getDate();

							return (
								<div
									key={day}
									className="border rounded-md p-2 h-28 text-left relative"
								>
									<div
										className={`absolute top-1 right-2 flex items-center justify-center text-xs font-semibold ${isToday
											? 'bg-red-500 text-white rounded-full w-6 h-6'
											: 'text-gray-400'
											}`}
									>
										{day}
									</div>
									<div className="space-y-1 mt-5">
										{events.slice(0, 2).map((evt, i) => (
											<div
												key={`${evt.title}-${evt.time}-${i}`}
												className="text-xs p-1 rounded flex text-center justify-between items-center"
												style={{
													border: `1px solid ${evt.color}`,
													backgroundColor: evt.color,
													backgroundImage:
														'linear-gradient(rgba(255,255,255,0.5), rgba(255,255,255,0.5))',
													backgroundBlendMode:
														'overlay',
												}}
											>
												<div>
													{evt.title.length > 10
														? `${evt.title.slice(
															0,
															10,
														)}...`
														: evt.title}
												</div>
												<div className="text-[10px]">
													{evt.time}
												</div>
											</div>
										))}
										{events.length > 2 && (
											<div className="text-xs font-medium text-gray-600">
												and {events.length - 2} more
											</div>
										)}
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
