import {pb} from '../pocketbase';

export async function getAllUsers() {
	return await pb.collection('user').getFullList();
}

export async function getUserByUserId(userId: string) {
	return await pb.collection('user')	.getOne(userId);
}
