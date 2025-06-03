import { redirect } from 'next/navigation';
import { getCurrentUserId } from '../../../../lib/getCurrentUserId';
import { pb } from '../../../../lib/pocketbase';
import StudyGroupClient from '../../../../components/StudyGroupClient';

export default async function StudyGroupDetailPage({ params }: { params: { id: string } }) {
  const userId = await getCurrentUserId();

  if (!userId) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="bg-white shadow rounded-lg p-6">
          <h1 className="text-2xl font-semibold">Please log in to continue</h1>
        </div>
      </div>
    );
  }

  const { id } = params;

  if (!id) {
    redirect('/studygroups');
  }

  // Fetch group details
  const group = await pb.collection('studygroup').getOne(id, {
    expand: 'location_studygroup_via_studygroup.location, user_studygroup_via_studygroup.user, leader',
  });

  // Fetch events for the group
  const events = await pb.collection('event').getFullList({
    filter: `studygroup = "${id}"`,
  });

  return (
    <StudyGroupClient
      userId={userId}
      group={group}
      events={events}
    />
  );
}
