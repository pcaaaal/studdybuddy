import PocketBase from 'pocketbase';
import {cookies} from 'next/headers';

export async function getCurrentUserId(): Promise<string | null> {
	const pb = new PocketBase(process.env.NEXT_PUBLIC_POCKETBASE_URL);
	const cookieStore = cookies();
	const authCookie = (await cookieStore).get('pb_auth')?.value;

	if (!authCookie) return null;

	pb.authStore.loadFromCookie(`pb_auth=${authCookie}`);

	return pb.authStore.record?.id ?? null;
}
