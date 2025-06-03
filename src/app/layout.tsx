import { Toaster } from 'sonner';
import './globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
	title: 'StudyBuddy',
	description: 'Find, Plan, Learn – Together',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html lang="en">
			<body className="bg-background text-foreground selection:bg-primary/20 flex min-h-full flex-col scroll-smooth antialiased">
				{children}
				<Toaster />
			</body>
		</html>
	);
}
