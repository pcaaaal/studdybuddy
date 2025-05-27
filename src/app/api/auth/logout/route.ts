import {NextResponse} from 'next/server';
import {pb} from '@/lib/pocketbase';

export async function POST() {
	pb.authStore.clear();
	const res = NextResponse.json({ok: true});
	// Expire the cookie
	res.headers.set(
		'set-cookie',
		pb.authStore.exportToCookie({expires: new Date(0)}),
	);
	return res;
}
