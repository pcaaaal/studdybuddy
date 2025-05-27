import {NextResponse} from 'next/server';
import {pb} from '@/lib/pocketbase';

export async function POST(req: Request) {
	console.log('Login request received');

	try {
		const {email, password} = await req.json();
		console.log('Email:', email);
		console.log('Password:', password);

		if (!email || !password) {
			return NextResponse.json(
				{error: 'Email and password are required'},
				{status: 400},
			);
		}

		const authData = await pb
			.collection('user')
			.authWithPassword(email, password);

		// Get authStore cookie value
		const cookie = pb.authStore.exportToCookie({
			httpOnly: true,
			secure: true,
			sameSite: 'lax',
		});

		console.log('Auth data:', authData);
		console.log('Cookie:', cookie);

		const res = NextResponse.json({user: authData.record});
		res.headers.set('set-cookie', cookie);
		return res;
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
	} catch (error: any) {
		console.error('Error during login:', error);

		// PocketBase throws structured errors
		if (error?.response?.message || error?.message) {
			return NextResponse.json(
				{error: error.response?.message || error.message},
				{status: error.status || 401},
			);
		}

		// Fallback error response
		return NextResponse.json(
			{error: 'Internal server error'},
			{status: 500},
		);
	}
}
