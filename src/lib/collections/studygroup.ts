import {pb} from '../pocketbase';

// PUBLIC API
export async function getAllStudyGroups() {
	try {
		const studygroups = await pb.collection('studygroup').getFullList({
			expand: 'location_studygroup_via_studygroup.location, user_studygroup_via_studygroup.user, leader',
		});
		return studygroups;
	} catch (err) {
		console.error('Failed to fetch all study groups:', err);
		return [];
	}
}

export async function getStudyGroupsByUserId(userId: string) {
	try {
		const links = await pb.collection('user_studygroup').getFullList({
			filter: `user = "${userId}"`,
		});

		const ids = links.map((l) => l.studygroup).filter(Boolean);
		return await fetchStudyGroupByIds(ids);
	} catch (err) {
		console.error(`Failed to fetch study groups for user ${userId}:`, err);
		return [];
	}
}

// PRIVATE
async function fetchStudyGroupByIds(ids: string[]) {
	if (ids.length === 0) return [];

	const results = await Promise.all(
		ids.map(async (id: string) => {
			try {
				const sg = await pb.collection('studygroup').getOne(id, {
					expand: 'location_studygroup_via_studygroup.location, user_studygroup_via_studygroup.user, leader',
				});
				return sg;
			} catch (err) {
				console.warn(`Failed to fetch study group with ID ${id}:`, err);
				return null;
			}
		}),
	);

	return results;
}

export function getLocationsFromStudyGroup(group) {
	const links = group.expand?.location_studygroup_via_studygroup ?? [];
	return links
		.map((link) => link.expand?.location)
		.filter((loc) => Boolean(loc));
}

export function getUsersFromStudyGroup(group) {
	const links = group.expand?.user_studygroup_via_studygroup ?? [];
	return links
		.map((link) => link.expand?.user)
		.filter((user) => Boolean(user));
}

// CREATE a new study group and associated links
export async function createStudyGroup({
	name,
	description,
	color,
	audience,
	leader,
	tags = [],
	locationIds = [], // array of location record IDs
	userIds = [], // array of user record IDs
}) {
	try {
		// 1. Create main studygroup record
		const newGroup = await pb.collection('studygroup').create({
			name,
			description,
			color,
			audience,
			leader,
			tags,
		});
		const groupId = newGroup.id;

		// 2. Link locations
		await Promise.all(
			locationIds.map((locId) =>
				pb.collection('location_studygroup').create({
					studygroup: groupId,
					location: locId,
				}),
			),
		);

		// 3. Link users
		await Promise.all(
			userIds.map((userId) =>
				pb.collection('user_studygroup').create({
					studygroup: groupId,
					user: userId,
				}),
			),
		);

		// 4. Return the full expanded group
		const fullGroup = await pb.collection('studygroup').getOne(groupId, {
			expand: 'location_studygroup_via_studygroup.location, user_studygroup_via_studygroup.user, leader',
		});

		return fullGroup;
	} catch (err) {
		console.error('Failed to create study group:', err);
		throw err;
	}
}

// DELETE a study group and clean up associated links
export async function deleteStudyGroup(groupId) {
	try {
		// 1. Remove all location links
		const locLinks = await pb
			.collection('location_studygroup')
			.getFullList({
				filter: `studygroup = "${groupId}"`,
			});
		await Promise.all(
			locLinks.map((link) =>
				pb.collection('location_studygroup').delete(link.id),
			),
		);

		// 2. Remove all user links
		const userLinks = await pb.collection('user_studygroup').getFullList({
			filter: `studygroup = "${groupId}"`,
		});
		await Promise.all(
			userLinks.map((link) =>
				pb.collection('user_studygroup').delete(link.id),
			),
		);

		// 3. Delete the studygroup record itself
		await pb.collection('studygroup').delete(groupId);

		return {success: true};
	} catch (err) {
		console.error(`Failed to delete study group ${groupId}:`, err);
		throw err;
	}
}

export async function deleteUserFromStudyGroup(
	groupId: string,
	userId: string,
): Promise<{success: boolean}> {
	try {
		// Find the link record for this user in the study group
		const links = await pb.collection('user_studygroup').getFullList({
			filter: `studygroup = "${groupId}" && user = "${userId}"`,
		});

		if (links.length === 0) {
			return {success: false}; // No link found
		}

		// Delete the first matching link
		await pb.collection('user_studygroup').delete(links[0].id);
		console.log(`Successfully removed user ${userId} from group ${groupId}`);
		return {success: true};
	} catch (err) {
		console.error(`Failed to remove user ${userId} from group ${groupId}:`, err);
		throw err;
	}
}

export async function addUserToStudyGroup(
	groupId: string,
	userId: string,
): Promise<{success: boolean}> {
	try {
		// Check if the user is already in the group
		const existingLinks = await pb.collection('user_studygroup').getFullList({
			filter: `studygroup = "${groupId}" && user = "${userId}"`,
		});

		if (existingLinks.length > 0) {
			console.warn(`User ${userId} is already in group ${groupId}`);
			return {success: false}; // User already in group
		}

		// Create a new link record
		await pb.collection('user_studygroup').create({
			studygroup: groupId,
			user: userId,
		});
		console.log(`Successfully added user ${userId} to group ${groupId}`);
		return {success: true};
	} catch (err) {
		console.error(`Failed to add user ${userId} to group ${groupId}:`, err);
		throw err;
	}
}
