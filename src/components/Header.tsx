import * as React from 'react';
import Link from 'next/link';
import {cn} from '../lib/utils';
import {
	NavigationMenu,
	NavigationMenuItem,
	NavigationMenuLink,
	NavigationMenuList,
} from '@radix-ui/react-navigation-menu';
import LogoutButton from './LogoutButton';
import dynamic from 'next/dynamic';

const MobileHeader = dynamic(() => import('./MobileHeader'), {
	ssr: true,
});

type NavItem = {
	name: string;
	href: string;
};

interface HeaderProps extends React.HTMLAttributes<HTMLDivElement> {
	navItems: NavItem[];
}

const Header = React.forwardRef<HTMLDivElement, HeaderProps>(
	async ({className, navItems}, ref) => {
		return (
			<header
				className={cn(
					'bg-background/95 supports-[backdrop-filter]:bg-background/60 fixed top-0 z-40 flex w-full justify-center border-b px-4 backdrop-blur',
					className,
				)}
				ref={ref}
			>
				<div className="relative container flex h-16 items-center justify-between gap-4 md:gap-8 lg:gap-0">
					<Link
						href="/"
						className="flex items-center space-x-2 text-xl text-primary font-bold"
						aria-label="Portfolio homepage"
						title="Portfolio homepage"
					>
						StuddyBuddy
					</Link>
					{/* Desktop Navigation - hidden on mobile */}
					<div className="hidden md:flex flex-1 justify-end gap-8">
						<nav>
							<NavigationMenu>
								<NavigationMenuList className="flex items-center space-x-4">
									{navItems.map((item) => (
										<NavigationMenuItem key={item.name}>
											<NavigationMenuLink
												href={item.href}
												className={cn(
													'group hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground data-[active]:bg-accent/50 data-[state=open]:bg-accent/50 inline-flex h-10 w-max items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors hover:underline focus:outline-none disabled:pointer-events-none disabled:opacity-50',
												)}
											>
												{item.name}
											</NavigationMenuLink>
										</NavigationMenuItem>
									))}
								</NavigationMenuList>
							</NavigationMenu>
						</nav>
						<LogoutButton />
					</div>
					<div className="flex flex-1 items-center justify-end gap-4 md:flex-none">
						<MobileHeader navItems={navItems} />
					</div>
				</div>
			</header>
		);
	},
);

Header.displayName = 'Header';

export default Header;
