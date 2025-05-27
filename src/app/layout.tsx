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
			<body className="bg-gray-50 text-gray-800 relative">
				<Header navItems={navItems} />
				<main className="md:container px-8 mt-16 pt-8">{children}</main>
				<Toaster />
			</body>
		</html>
	);
}
