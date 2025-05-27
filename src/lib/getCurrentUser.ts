import PocketBase from 'pocketbase';
import {cookies} from 'next/headers';

export async function getCurrentUserId() {
	const pb = new PocketBase(process.env.NEXT_PUBLIC_POCKETBASE_URL);
	const cookieStore = cookies();

	// Construct the full cookie string
	const cookieString = (await cookieStore)
		.getAll()
		.map(({name, value}) => `${name}=${value}`)
		.join('; ');

	// Load cookies into authStore
	pb.authStore.loadFromCookie(cookieString);

	// Verify authentication
	if (!pb.authStore.isValid) return null;

	// Optional: refresh authentication
	try {
		return pb.authStore.record;
	} catch {
		return null;
	}
}
