/* eslint-disable @typescript-eslint/no-explicit-any */

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

		return users.filter(Boolean); // Delete invalid (null) users
	} catch (err) {
		console.error('Failed to fetch users by IDs:', err);
		return [];
	}
}

export async function addUser(data: Record<string, any>) {
	try {
		const userData = {
			emailVisibility: true,
			...data,
		};

		return await pb.collection('user').create(userData);
	} catch (err) {
		console.error('Failed to create user:', err);
		throw err; // Re-throw to handle 
	}
}

export async function existsUserByEmail(email: string): Promise<boolean> {
	try {
		const user = await pb
			.collection('user')
			.getFirstListItem(`email="${email}"`);
		return !!user; // Gibt true zurück, wenn der Benutzer existiert
	} catch (err: any) {
		if (err.status === 404) {
			return false;
		}
		console.error('Error checking user existence by email:', err);
		throw err;
	}
}
