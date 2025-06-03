/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import * as React from 'react';
import {
	Table,
	TableHeader,
	TableRow,
	TableHead,
	TableBody,
	TableCell,
} from '@/components/ui/table';
import {deleteUserFromStudyGroup} from '@/lib/collections/studygroup';

export default function StudyGroupsTable({
	userId,
	studyGroups,
}: {
	userId: string;
	studyGroups: any[];
}) {
	const [groups, setGroups] = React.useState(studyGroups);
	const [showConfirmModal, setShowConfirmModal] = React.useState(false);
	const [selectedGroupId, setSelectedGroupId] = React.useState<string | null>(
		null,
	);

	const handleLeaveGroup = async () => {
		if (!selectedGroupId) return;

		try {
			const response = await deleteUserFromStudyGroup(
				selectedGroupId,
				userId,
			);
			if (response.success) {
				console.log(
					`Successfully left group with ID: ${selectedGroupId}`,
				);
				setGroups((prevGroups) =>
					prevGroups.filter((group) => group.id !== selectedGroupId),
				);
			} else {
				console.error(
					`Failed to leave group with ID: ${selectedGroupId}`,
				);
			}
		} catch (error) {
			console.error(
				`Error leaving group with ID: ${selectedGroupId}`,
				error,
			);
		} finally {
			setShowConfirmModal(false);
			setSelectedGroupId(null);
		}
	};

	const openConfirmModal = (groupId: string) => {
		setSelectedGroupId(groupId);
		setShowConfirmModal(true);
	};

	const closeConfirmModal = () => {
		setShowConfirmModal(false);
		setSelectedGroupId(null);
	};

	if (!groups || groups.length === 0) {
		return (
			<p className="text-muted-foreground text-xl">
				You are not part of any study groups yet.
			</p>
		);
	}

	return (
		<>
			<Table>
				<TableHeader>
					<TableRow>
						<TableHead>Name</TableHead>
						<TableHead>Description</TableHead>
						<TableHead>Actions</TableHead>
					</TableRow>
				</TableHeader>
				<TableBody>
					{groups.map((group) => (
						<TableRow key={group.id}>
							<TableCell>{group.name || 'N/A'}</TableCell>
							<TableCell>{group.description || 'N/A'}</TableCell>
							<TableCell>
								<button
									className="text-blue-500"
									onClick={() => openConfirmModal(group.id)}
								>
									Leave Group
								</button>
							</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>

			{showConfirmModal && (
				<div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
					<div className="bg-white rounded-lg p-6 space-y-4 shadow-lg">
						<h2 className="text-lg font-bold">Are you sure?</h2>
						<p className="text-gray-600">
							Do you really want to leave this group? This action
							cannot be undone.
						</p>
						<div className="flex space-x-4">
							<button
								className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
								onClick={handleLeaveGroup}
							>
								Leave Group
							</button>
							<button
								className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400"
								onClick={closeConfirmModal}
							>
								Cancel
							</button>
						</div>
					</div>
				</div>
			)}
		</>
	);
}
