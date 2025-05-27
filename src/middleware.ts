import {NextResponse} from 'next/server';
import type {NextRequest} from 'next/server';
import {pb} from './lib/pocketbase';

// Toggle auth middleware for dev or preview environments
const isDev = true;

export async function middleware(req: NextRequest) {
	const {pathname} = req.nextUrl;

	// Bypass middleware entirely if dev mode is enabled
	if (isDev) {
		console.log('Auth middleware disabled in dev mode');
		return NextResponse.next();
	}

	// Bypass auth for login & register pages
	if (pathname === '/login' || pathname === '/register') {
		return NextResponse.next();
	}

	// Enforce PocketBase auth
	await pb.authStore.loadFromCookie(req.headers.get('cookie') || '');
	if (!pb.authStore.isValid) {
		const loginUrl = new URL('/login', req.url);
		loginUrl.searchParams.set('from', pathname);
		return NextResponse.redirect(loginUrl);
	}

	return NextResponse.next();
}

export const config = {
	matcher: [
		'/((?!api|_next/static|_next/image|favicon\\.ico|sitemap\\.xml|robots\\.txt|login|register).*)',
	],
};
