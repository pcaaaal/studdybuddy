import {Toaster} from 'sonner';
import './globals.css';
import type {Metadata} from 'next';
import Header from './components/Header';

export const metadata: Metadata = {
	title: 'StudyBuddy',
	description: 'Find, Plan, Learn – Together',
};

export default function RootLayout({children}: {children: React.ReactNode}) {
	const navItems = [
		{
			name: 'home',
			href: '/',
		},
		{
			name: 'Study Groups',
			href: '/studygroups',
		},
		{
			name: 'Calendar',
			href: '/calendar',
		},
		{
			name: 'Profile',
			href: '/profile',
		},
	];

	return (
		<html lang="en">
			<body className="bg-background text-foreground selection:bg-primary/20 flex min-h-full flex-col scroll-smooth antialiased">
				<Header navItems={navItems} />
				<main className="min-h-view-full flex w-full flex-col items-center justify-center pt-24">
					{children}
				</main>
				<Toaster />
			</body>
		</html>
	);
}
