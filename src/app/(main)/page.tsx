import {getStudyBuddiesByUserId} from '../../lib/collections/studybuddy';
import {
	getAllStudyGroups,
	getLocationsFromStudyGroup,
	getStudyGroupsByUserId,
} from '../../lib/collections/studygroup';
import {
	Card,
	CardHeader,
	CardTitle,
	CardDescription,
	CardContent,
} from '@/components/ui/card';
import {
	Table,
	TableHeader,
	TableRow,
	TableHead,
	TableBody,
	TableCell,
} from '@/components/ui/table';
import Image from 'next/image';
import {getCurrentUserId} from '../../lib/getCurrentUserId';
import {getUserByUserId} from '../../lib/collections/user';
import {StudyGroupDialog} from '../../components/StudyGroupDialog';
import {RecordModel} from 'pocketbase';

function capitalize(str: string) {
	return str.charAt(0).toUpperCase() + str.slice(1);
}

export default async function HomePage() {
	const userId = await getCurrentUserId();

	if (!userId) {
		return (
			<div className="container mx-auto px-4 py-8">
				<Card>
					<CardHeader>
						<CardTitle>Please log in to continue</CardTitle>
						<CardDescription>
							You need to be logged in to access this page.
						</CardDescription>
					</CardHeader>
				</Card>
			</div>
		);
	}
	const user = await getUserByUserId(userId);
	const myStudyGroups = await getStudyGroupsByUserId(userId);
	const myStudyBuddies = await getStudyBuddiesByUserId(userId);
	const studyGroups = await getAllStudyGroups();

	console.log('StudyGroups:', studyGroups);

	return (
		<div className="md:container px-8 mx-auto space-y-8">
			<h1 className="text-5xl font-extrabold">
				Welcome Back, {capitalize(user.name || 'User')}
			</h1>
			<div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
				{/* My Study Groups */}
				<Card>
					<CardHeader>
						<CardTitle>My Study Groups</CardTitle>
					</CardHeader>
					<CardContent>
						{myStudyGroups.length === 0 ? (
							<p className="text-muted-foreground text-xl">
								You are not part of any study groups yet.
							</p>
						) : (
							<Table>
								<TableHeader>
									<TableRow>
										<TableHead>Name</TableHead>
										<TableHead>Location</TableHead>
										<TableHead>Group Leader</TableHead>
									</TableRow>
								</TableHeader>
								<TableBody>
									{myStudyGroups.map((group) => (
										<StudyGroupDialog
											group={group}
											key={group?.id}
										>
											<TableRow>
												<TableCell>
													{group?.name || 'N/A'}
												</TableCell>
												<TableCell>
													{getLocationsFromStudyGroup(
														group as RecordModel,
														// eslint-disable-next-line @typescript-eslint/no-explicit-any
													).map((location: any) => (
														<span key={location.id}>
															{location.school} -{' '}
															{location.room}
														</span>
													)) || 'N/A'}
												</TableCell>
												<TableCell>
													{group?.expand?.leader
														?.id === user.id
														? 'You'
														: group?.expand?.leader
																?.name || 'N/A'}
												</TableCell>
											</TableRow>
										</StudyGroupDialog>
									))}
								</TableBody>
							</Table>
						)}
					</CardContent>
				</Card>

				{/* My Study Buddies */}
				<Card>
					<CardHeader>
						<CardTitle>My Study Buddies</CardTitle>
					</CardHeader>
					<CardContent>
						{myStudyBuddies.length === 0 ? (
							<p className="text-muted-foreground text-xl">
								You have no study buddies yet.
							</p>
						) : (
							<div className="flex flex-wrap gap-4">
								{myStudyBuddies.map((buddy) => (
									<div
										key={buddy?.id}
										className="flex flex-col items-center w-20"
									>
										<Image
											src={
												buddy?.img ||
												'/default-avatar.png'
											}
											width={40}
											height={40}
											alt={buddy?.name || 'Study Buddy'}
											className="w-10 h-10 md:w-12 md:h-12 rounded-full object-cover"
										/>
										<span className="text-xs mt-1 text-center">
											{buddy?.name || 'Unknown'}
										</span>
									</div>
								))}
							</div>
						)}
					</CardContent>
				</Card>

				{/* Explore Study Groups */}
				<Card className="lg:col-span-2">
					<CardHeader>
						<CardTitle>Explore Study Groups</CardTitle>
					</CardHeader>
					<CardContent>
						{studyGroups.length === 0 ? (
							<p className="text-muted-foreground">
								No study groups available at the moment.
							</p>
						) : (
							<div className="space-y-3">
								{studyGroups.map((group) => {
									return (
										<StudyGroupDialog
											group={group}
											key={group?.id}
										>
											<div
												key={group.id}
												className={`p-4 rounded`}
												style={{
													backgroundColor:
														group.color ||
														'#f0f0f0',
												}}
											>
												<div className="flex justify-between items-start">
													<h3 className="font-bold">
														{group.name}
													</h3>
												</div>
												<p className="text-sm mt-1">
													{group.description ||
														'No description available.'}
												</p>
											</div>
										</StudyGroupDialog>
									);
								})}
							</div>
						)}
					</CardContent>
				</Card>
			</div>
		</div>
	);
}
