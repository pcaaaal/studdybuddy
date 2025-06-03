import { pb } from "../pocketbase"; // PocketBase-Instanz importieren
import { getUsersByIds } from "./user";

// Get all studybuddy user records (all buddies of all users)
export async function getAllStudyBuddies() {
	// Fetch all studybuddy links
	const studybuddyLinks = await pb.collection('studybuddy').getFullList();

	// Extract all unique user_b IDs
	const userBIds = Array.from(
		new Set(studybuddyLinks.map((link) => link.user_b).filter(Boolean)),
	);

	// Fetch user records for those IDs
	return getUsersByIds(userBIds);
}

export async function getStudyBuddiesByUserId(userId: string) {
  try {
    // Fetch all studybuddy links for the given user
    const studybuddyLinks = await pb.collection("studybuddy").getFullList({
      filter: `user_a = "${userId}" || user_b = "${userId}"`,
    });

    console.log(
      `Fetched ${studybuddyLinks.length} studybuddy links for user ${userId}`
    );
    console.log(
      `Studybuddy links: ${JSON.stringify(studybuddyLinks, null, 2)}`
    );

    // Extract all unique buddy IDs (exclude the current user)
    const buddyIds = Array.from(
      new Set(
        studybuddyLinks.map((link) =>
          link.user_a === userId ? link.user_b : link.user_a
        )
      )
    ).filter((id) => id !== userId); // Exclude the current user

    // Fetch user records for those IDs
    const buddies = await getUsersByIds(buddyIds);

	console.log(`Fetched ${buddies.length} buddies for user ${userId}`);
	console.log(`Buddies: ${JSON.stringify(buddies, null, 2)}`);

    return buddies;
  } catch (err) {
    console.error(`Failed to fetch study buddies for user ${userId}:`, err);
    return [];
  }
}

export async function removeStudyBuddy(
  userAId: string,
  userBId: string
) {
  try {
	// Find the studybuddy link between userA and userB
	const link = await pb.collection("studybuddy").getFirstListItem(
	  `user_a = "${userAId}" && user_b = "${userBId}" || user_a = "${userBId}" && user_b = "${userAId}"`
	);

	if (!link) {
	  console.warn(`No study buddy link found between ${userAId} and ${userBId}`);
	  return false;
	}

	// Delete the studybuddy link
	await pb.collection("studybuddy").delete(link.id);
	console.log(`Removed study buddy link between ${userAId} and ${userBId}`);
	return true;
  } catch (err) {
	console.error(`Failed to remove study buddy between ${userAId} and ${userBId}:`, err);
	return false;
  }
}
