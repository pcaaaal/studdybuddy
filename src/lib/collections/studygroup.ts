import {pb} from '../pocketbase';

export async function getAllStudyGroups() {
	return await pb.collection('studygroup').getFullList();
}

export async function getStudyGroupsByUserId(userId: string) {
	const studyGroupLinks = await pb.collection('user_studygroup').getFullList({
		filter: `user = "${userId}"`,
	});

	const studyGroupIds = studyGroupLinks
		.map((link) => link.studygroup)
		.filter(Boolean);
	return fetchStudyGroupByIds(studyGroupIds);
}

async function fetchStudyGroupByIds(ids: string[]) {
	if (ids.length === 0) return [];

	const studygroups = await Promise.all(
		ids.map(async (id) => {
			try {
				return await pb.collection('studygroup').getOne(id);
			} catch {
				return null;
			}
		}),
	);

	return studygroups.filter(Boolean);
}
