'use client';

import * as React from 'react';
import Link from 'next/link';
import {Menu, ChevronRight} from 'lucide-react';

import {
	Drawer,
	DrawerClose,
	DrawerContent,
	DrawerFooter,
	DrawerHeader,
	DrawerTitle,
	DrawerTrigger,
} from './ui/drawer';
import {cn} from '../lib/utils';
import {Button} from './ui/button';
import LogoutButton from './LogoutButton';

type NavItem = {
	name: string;
	href: string;
};

interface MobileHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
	navItems: NavItem[];
}
const MobileHeader = React.forwardRef<HTMLDivElement, MobileHeaderProps>(
	({className, navItems}, ref) => {
		const [open, setOpen] = React.useState(false);

		return (
			<div
				className={cn('md:hidden', className)}
				ref={ref}
				data-slot="mobile-header"
			>
				<Drawer open={open} onOpenChange={setOpen}>
					<DrawerTrigger asChild>
						<Button variant="outline" size="icon">
							<Menu className="h-6 w-6" />
							<span className="sr-only">Toggle menu</span>
						</Button>
					</DrawerTrigger>
					<DrawerContent>
						<DrawerHeader>
							<DrawerTitle className="text-center text-xl font-bold">
								Navigation
							</DrawerTitle>
						</DrawerHeader>
						<nav
							aria-label="Mobile navigation"
							className="grid gap-2 px-2 py-2"
						>
							{navItems.map((item) => (
								<Link
									href={item.href}
									key={item.name}
									className="hover:bg-accent flex w-full items-center justify-between rounded-md px-4 py-2 text-lg font-medium"
									onClick={() => setOpen(false)}
								>
									<span>{item.name}</span>
									<ChevronRight className="h-6 w-6" />
								</Link>
							))}
						</nav>
						<DrawerFooter>
							<LogoutButton />
							<DrawerClose asChild>
								<Button>Close</Button>
							</DrawerClose>
						</DrawerFooter>
					</DrawerContent>
				</Drawer>
			</div>
		);
	},
);

MobileHeader.displayName = 'MobileHeader';

export default MobileHeader;
