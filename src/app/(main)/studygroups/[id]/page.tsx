'use client';

import {useEffect, useState} from 'react';
import {redirect, useParams} from 'next/navigation';
import {pb} from '../../../../lib/pocketbase';

import {Card, CardContent} from '@/components/ui/card';
import {Button} from '@/components/ui/button';
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/table';

export default function StudyGroupDetailPage() {
	const {id} = useParams();
	const [group, setGroup] = useState<any>(null);
	const [members, setMembers] = useState<any[]>([]);
	const [events, setEvents] = useState<any[]>([]);
	const [subscribed, setSubscribed] = useState(false);
	const userId = 1;

	const [currentMonth, setCurrentMonth] = useState(5);
	const [currentYear, setCurrentYear] = useState(2025);

	useEffect(() => {
		if (!id) redirect('/studygroups');

		pb.collection('studygroup')
			.getOne(id, {
				expand: 'location_studygroup_via_studygroup.location, user_studygroup_via_studygroup.user, leader',
			})
			.then((found) => {
				if (found) {
					setGroup(found);
					const membersList = getUsersFromStudyGroup(found);
					setMembers(membersList);
					setSubscribed(
						membersList.some((m: any) => m.id === userId),
					);
				}
			});

		pb.collection('event')
			.getFullList({filter: `studygroup = "${id}"`})
			.then(setEvents);
	}, [id]);

	const toggleSubscription = () => {
		const newState = !subscribed;
		setSubscribed(newState);

		const url = `http://localhost:3001/group-members${
			newState ? '' : `/${id}/${userId}`
		}`;
		const method = newState ? 'POST' : 'DELETE';
		const body = newState
			? JSON.stringify({user_id: userId, group_id: id})
			: null;

		fetch(url, {
			method,
			headers: {'Content-Type': 'application/json'},
			...(body && {body}),
		})
			.then((res) => res.json())
			.then(() => {
				pb.collection('studygroup')
					.getOne(id, {expand: 'user_studygroup_via_studygroup.user'})
					.then((updatedGroup) => {
						const updatedMembers =
							getUsersFromStudyGroup(updatedGroup);
						setMembers(updatedMembers);
						setGroup({
							...group,
							members: updatedMembers
								.map((m: any) => m.name)
								.join(', '),
						});
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

		return events.filter((e: any) => {
			const eventDate = new Date(e.date);
			return eventDate.toISOString().split('T')[0] === isoDate;
		});
	};

	const daysInMonth = getDaysInMonth(currentYear, currentMonth);
	const firstDay = new Date(currentYear, currentMonth, 1).getDay();

	if (!group) return <p>Loading...</p>;

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
						<Table>
							<TableHeader>
								<TableRow>
									<TableHead>Name</TableHead>
								</TableRow>
							</TableHeader>
							<TableBody>
								{members.map((member) => (
									<TableRow key={member.id}>
										<TableCell>{member.name}</TableCell>
									</TableRow>
								))}
							</TableBody>
						</Table>
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
							{new Date(currentYear, currentMonth).toLocaleString(
								'default',
								{
									month: 'long',
								},
							)}{' '}
							{currentYear}
						</span>
						<Button onClick={() => handleMonthChange('next')}>
							Next →
						</Button>
					</div>

					<div className="grid grid-cols-7 gap-2 text-center text-sm font-medium text-muted-foreground mb-2">
						{['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(
							(d) => (
								<div key={d}>{d}</div>
							),
						)}
					</div>

					<div className="grid grid-cols-7 gap-2 text-sm">
						{Array.from({length: firstDay}).map((_, index) => (
							<div key={`empty-${index}`} className="h-28" />
						))}
						{Array.from({length: daysInMonth}).map((_, index) => {
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

function getUsersFromStudyGroup(group: any) {
	const links = group.expand?.user_studygroup_via_studygroup ?? [];
	return links.map((link) => link.expand?.user).filter(Boolean);
}
