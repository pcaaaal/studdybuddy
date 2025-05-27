'use client';

import {studyGroups} from '@/lib/data';

const mockGroupTable = [
	{
		name: 'Mathematics Study Group',
		room: 'Room 101',
		leader: 'Alice Johnson',
	},
	{name: 'Physics Study Group', room: 'Room 102', leader: 'Bob Smith'},
	{name: 'Chemistry Study Group', room: 'Room 103', leader: 'Charlie Brown'},
];

const mockBuddies = [
	{name: 'Lena Maurer', img: '/frog.png'},
	{name: 'Can Yilmaz', img: '/ghoster_efz.png'},
	{name: 'Emily Roth', img: '/green_bunny.png'},
	{name: 'Noah Keller', img: '/meta_ceo.png'},
	{name: 'Mara Blum', img: '/mummy.png'},
	{name: 'Jonas Frei', img: '/godzilla.png'},
	{name: 'Elia Weber', img: '/purple_sigma.png'},
	{name: 'Lara Schmid', img: '/red_bunny.png'},
	{name: 'Tim Müller', img: '/purple_ghost.png'},
];

const groupColors: Record<string, string> = {
	math: 'bg-yellow-200',
	bio: 'bg-pink-200',
	chem: 'bg-green-200',
	phys: 'bg-blue-200',
};

export default function HomePage() {
	return (
		<div className="container mx-auto px-4 space-y-8">
			<h1 className="text-5xl font-extrabold">Welcome Back, John</h1>
			<div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
				<div className="space-y-6">
					<div className="bg-white shadow rounded p-4">
						<h2 className="font-semibold text-xl mb-3">
							My Study Groups
						</h2>
						<div className="overflow-x-auto">
							<table className="min-w-full text-sm">
								<thead className="border-b">
									<tr>
										<th className="text-left py-2">Name</th>
										<th className="text-left py-2">Room</th>
										<th className="text-left py-2">
											Group Leader
										</th>
									</tr>
								</thead>
								<tbody>
									{mockGroupTable.map((g, i) => (
										<tr key={i} className="border-t">
											<td className="py-2">{g.name}</td>
											<td className="py-2">{g.room}</td>
											<td className="py-2">{g.leader}</td>
										</tr>
									))}
								</tbody>
							</table>
						</div>
					</div>

					<div className="bg-white shadow rounded p-4">
						<h2 className="font-semibold text-xl mb-3">
							My Study Buddies
						</h2>
						<div className="flex flex-wrap gap-4">
							{mockBuddies.map((buddy) => (
								<div
									key={buddy.name}
									className="flex flex-col items-center w-20"
								>
									<img
										src={buddy.img}
										alt=""
										className="w-10 h-10 md:w-12 md:h-12 rounded-full"
									/>
									<span className="text-xs mt-1 text-center">
										{buddy.name}
									</span>
								</div>
							))}
						</div>
					</div>
				</div>

				<div className="bg-white shadow rounded p-4">
					<h2 className="font-semibold text-xl mb-4">
						Explore Study Groups
					</h2>
					<div className="space-y-3">
						{studyGroups.map((group) => (
							<div
								key={group.id}
								className={`p-4 rounded ${
									groupColors[group.id] || 'bg-gray-100'
								}`}
							>
								<div className="flex justify-between items-start">
									<h3 className="font-bold">{group.name}</h3>
									<button className="text-xs bg-black text-white px-2 py-1 rounded">
										Match!
									</button>
								</div>
								<p className="text-sm mt-1">
									{group.description}
								</p>
							</div>
						))}
					</div>
				</div>
			</div>
		</div>
	);
}
