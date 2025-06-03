'use client';

import React from 'react';
import {Switch} from '@/components/ui/switch';
import {Card, CardHeader, CardTitle, CardContent} from '@/components/ui/card';

interface GroupWithSchedule {
	id: string;
	name: string;
	color: string;
	schedule: {title: string; date: string; time: string}[];
}

interface GroupFilterProps {
	groups: GroupWithSchedule[];
	activeGroupFilters: string[];
	onToggleGroup: (groupId: string) => void;
}

export function GroupFilter({
	groups,
	activeGroupFilters,
	onToggleGroup,
}: GroupFilterProps) {
	return (
		<Card className="p-4">
			<CardHeader>
				<CardTitle className="text-lg">Filter Study Groups</CardTitle>
			</CardHeader>
			<CardContent className="flex flex-wrap gap-4">
				{groups.length === 0 ? (
					<div>
						<p className="text-md">
							You are not part of any study groups yet.
						</p>
						<p className="text-sm text-gray-500">
							Join a group to see its events in the calendar. You
							can join groups on the StudyGroups page.
						</p>
					</div>
				) : (
					groups.map((group) => {
						const isActive = activeGroupFilters.includes(group.id);
						return (
							<div
								key={group.id}
								className="flex items-center space-x-2"
							>
								<Switch
									id={`switch-${group.id}`}
									style={{backgroundColor: group.color}}
									checked={isActive}
									onCheckedChange={() =>
										onToggleGroup(group.id)
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
							</div>
						);
					})
				)}
			</CardContent>
		</Card>
	);
}
