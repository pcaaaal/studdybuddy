import {pb} from '../pocketbase'; // adjust path if needed

// Get all studybuddy user records (all buddies of all users)
export async function getAllStudyBuddies() {
	// Fetch all studybuddy links
	const studybuddyLinks = await pb.collection('studybuddy').getFullList();

	// Extract all unique user_b IDs
	const userBIds = Array.from(
		new Set(studybuddyLinks.map((link) => link.user_b).filter(Boolean)),
	);

	// Fetch user records for those IDs
	return fetchUsersByIds(userBIds);
}

// Get studybuddy user records for a specific user_a id
export async function getStudyBuddiesByUserId(userId: string) {
	// Fetch links where user_a = userId
	const studybuddyLinks = await pb.collection('studybuddy').getFullList({
		filter: `user_a = "${userId}"`,
	});

	// Extract user_b IDs
	const userBIds = studybuddyLinks.map((link) => link.user_b).filter(Boolean);

	// Fetch user records for those IDs
	return fetchUsersByIds(userBIds);
}

// Helper: fetch multiple user records by array of ids
async function fetchUsersByIds(ids: string[]) {
	if (ids.length === 0) return [];

	const users = await Promise.all(
		ids.map(async (id) => {
			try {
				return await pb.collection('users').getOne(id);
			} catch {
				return null;
			}
		}),
	);

	return users.filter(Boolean);
}
