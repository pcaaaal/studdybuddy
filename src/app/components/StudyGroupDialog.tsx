'use client';

import {
	Dialog,
	DialogTrigger,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogDescription,
} from '@/components/ui/dialog';
import {useState} from 'react';

export function StudyGroupDialog({
	children,
	group,
}: {
	children: React.ReactNode;
	group: any;
}) {
	const [open, setOpen] = useState(false);

	const locations = group.expand?.locations || [];

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
						<strong>Category:</strong> {group.category}
					</p>
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
			</DialogContent>
		</Dialog>
	);
}
