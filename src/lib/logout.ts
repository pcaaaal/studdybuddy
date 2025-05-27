// lib/logout.ts
import {pb} from './pocketbase';

export async function logout() {
	console.log('Logging out...');
	pb.authStore.clear();

	// Call API route to clear the auth cookie
	await fetch('/api/auth/logout', {
		method: 'POST',
		credentials: 'include',
	});

	// Redirect after logout
	window.location.href = '/login';
}
