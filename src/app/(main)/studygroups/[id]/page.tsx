import {redirect} from 'next/navigation';
import {getCurrentUserId} from '../../../../lib/getCurrentUserId';
import {pb} from '../../../../lib/pocketbase';
import StudyGroupClient from '../../../../components/StudyGroupClient';

interface StudyBuddyPageProps {
	params: {
		id: string;
	};
}

export default async function StudyGroupDetailPage({
	params,
}: StudyBuddyPageProps) {
	const userId = await getCurrentUserId();

	if (!userId) {
		return (
			<div className="container mx-auto px-4 py-8">
				<div className="bg-white shadow rounded-lg p-6">
					<h1 className="text-2xl font-semibold">
						Please log in to continue
					</h1>
				</div>
			</div>
		);
	}

	const {id} = params;

	if (!id) {
		redirect('/studygroups');
	}

	const group = await pb.collection('studygroup').getOne(id, {
		expand: 'location_studygroup_via_studygroup.location, user_studygroup_via_studygroup.user, leader',
	});

	const events = await pb.collection('event').getFullList({
		filter: `studygroup = "${id}"`,
	});

	return <StudyGroupClient userId={userId} group={group} events={events} />;
}
