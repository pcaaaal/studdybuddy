import {pb} from '../pocketbase';

export async function getAllUsers() {
	return await pb.collection('user').getFullList();
}

export async function getUserByUserId(userId: string) {
	return await pb.collection('user').getOne(userId);
}

export async function updateUserByUserId(
	userId: string,
	data: Record<string, any>,
) {
	return await pb.collection('user').update(userId, data);
}

export async function getUsersByIds(userIds: string[]): Promise<any[]> {
	if (userIds.length === 0) return [];
  
	try {
	  const users = await Promise.all(
		userIds.map(async (id) => {
		  try {
			return await pb.collection("user").getOne(id);
		  } catch (err) {
			console.error(`Failed to fetch user with ID ${id}:`, err);
			return null;
		  }
		})
	  );
  
	  return users.filter(Boolean); // Entferne ungültige Benutzer
	} catch (err) {
	  console.error("Failed to fetch users by IDs:", err);
	  return [];
	}
  }
