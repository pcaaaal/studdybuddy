import {pb} from '../pocketbase';

// PUBLIC API
export async function getAllEvents() {
	try {
		const events = await pb.collection('event').getFullList();
		return events;
	} catch (err) {
		console.error('Failed to fetch all events:', err);
		return [];
	}
}

export async function getEventsByStudyGroupId(studyGroupId: string) {
	try {
		console.log(`Fetching events for study group: ${studyGroupId}`);
		const events = await pb.collection('event').getFullList({
			filter: `studygroup = "${studyGroupId}"`,
			requestKey: null,
		});
		return events;
	} catch (err) {
		console.error(
			`Failed to fetch events for study group ${studyGroupId}:`,
			err,
		);
		return [];
	}
}
