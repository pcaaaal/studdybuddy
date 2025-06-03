import PocketBase from 'pocketbase';

export const pb = new PocketBase(
	process.env.PB_URL ||
	process.env.NEXT_PUBLIC_PB_URL ||
	'http://localhost:8090',
);
