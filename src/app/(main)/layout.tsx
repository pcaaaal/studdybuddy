import '../globals.css';
import type {Metadata} from 'next';
import Header from '../../components/Header';
import Footer from '../../components/Footer';

export const metadata: Metadata = {
	title: 'StudyBuddy',
	description: 'Find, Plan, Learn – Together',
};

export default function RootLayout({children}: {children: React.ReactNode}) {
	const navItems = [
		{
			name: 'Home',
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
		<>
			<Header navItems={navItems} />
			<main className="min-h-view-full flex w-full flex-col items-center justify-center pt-24">
				{children}
			</main>
			<Footer/>
		</>
	);
}
