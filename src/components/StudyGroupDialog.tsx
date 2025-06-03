/* eslint-disable @typescript-eslint/no-explicit-any */

'use client';

import {
	Dialog,
	DialogTrigger,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogDescription,
} from '@/components/ui/dialog';
import {useState, useEffect} from 'react';
import {getTagById} from '@/lib/collections/tags'; // Importiere die Methode zum Abrufen der Tags

export function StudyGroupDialog({
	children,
	group,
}: {
	children: React.ReactNode;
	group: any;
}) {
	const [open, setOpen] = useState(false);
	const [tags, setTags] = useState<string[]>([]); // Zustand für die geladenen Tags

	const locations =
		group.expand?.location_studygroup_via_studygroup?.map(
			(link: any) => link.expand?.location,
		) || [];

	// Tags laden, wenn die Komponente gerendert wird
	useEffect(() => {
		async function fetchTags() {
			if (group.tags && group.tags.length > 0) {
				const loadedTags = await Promise.all(
					group.tags.map((tagId: string) => getTagById(tagId)),
				);
				setTags(loadedTags.map((tag) => tag.name)); // Extrahiere die Namen der Tags
			}
		}
		fetchTags();
	}, [group.tags]);

	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogTrigger asChild>{children}</DialogTrigger>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>{group.name}</DialogTitle>
					<DialogDescription>
						{group.description || 'No description provided.'}
					</DialogDescription>
				</DialogHeader>
				<div className="mt-4 space-y-2">
					<p>
						<strong>Category:</strong>
					</p>
					<div className="flex flex-wrap gap-2">
						{tags.length > 0 ? (
							tags.map((tag: string, index: number) => (
								<span
									key={index}
									className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-sm"
								>
									{tag}
								</span>
							))
						) : (
							<span>Unknown</span>
						)}
					</div>
					<p>
						<strong>Leader:</strong>{' '}
						{group.expand?.leader?.name || 'Unknown'}
					</p>
					<p>
						<strong>Location:</strong>
					</p>
					<ul className="list-disc list-inside">
						{locations.map((loc: any) => (
							<li key={loc.id}>
								{loc.school} - {loc.room}
							</li>
						))}
					</ul>
				</div>
				{/* Button to navigate to the Study Group detail page */}
				<div className="mt-6">
					<button
						className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
						onClick={() =>
							(window.location.href = `/studygroups/${group.id}`)
						}
					>
						View Details
					</button>
				</div>
			</DialogContent>
		</Dialog>
	);
}
