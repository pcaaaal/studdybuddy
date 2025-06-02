import Link from 'next/link';
import {Contact, Cookie, FolderGit2, Home, ShieldUser} from 'lucide-react';
import {Button} from './ui/button';

export default function Footer() {
	const FooterLink = ({
		href,
		icon: Icon,
		children,
	}: {
		href: string;
		icon: React.ComponentType;
		children: React.ReactNode;
	}) => (
		<Button asChild variant="link" className="text-lg">
			<Link href={href}>
				<Icon />
				{children}
			</Link>
		</Button>
	);

	return (
		<footer
			className="flex-col flex items-center justify-center size-full py-8"
			id="footer"
		>
			<div className="grid w-full grid-cols-1 gap-4 px-8 sm:grid-cols-2 md:container">
				<div className="col-span-1 flex flex-col gap-4">
					<div>
						<h3 className="text-xl font-bold">{'Copyright'}</h3>
						<p className="text-lg">
							{'Copyright'} © {new Date().getFullYear()}
						</p>
						<p className="text-muted-foreground text-sm">
							{'Copyright'}
						</p>
					</div>
					<div>
						<h3 className="text-xl font-bold">
							{'Privacy & Legal'}
						</h3>
						<p className="text-muted-foreground text-sm">
							{'Privacy and legal information for this website.'}
						</p>
						<ul className="flex flex-col">
							<li>
								<FooterLink href="/privacy" icon={Cookie}>
									Privacy Policy
								</FooterLink>
							</li>
							<li>
								<FooterLink href="/impressum" icon={Contact}>
									Impressum
								</FooterLink>
							</li>
						</ul>
					</div>
				</div>

				<div className="col-span-1 flex flex-col gap-4">
					<div>
						<h3 className="text-xl font-bold">{'Navigation'}</h3>
						<ul className="flex flex-col">
							<li>
								<FooterLink href="/" icon={Home}>
									{'Home'}
								</FooterLink>
							</li>
							<li>
								<FooterLink href="/studygroups" icon={Contact}>
									{'Study Groups'}
								</FooterLink>
							</li>
							<li>
								<FooterLink href="/calendar" icon={FolderGit2}>
									{'Calendar'}
								</FooterLink>
							</li>
							<li>
								<FooterLink href="/profile" icon={ShieldUser}>
									{'Profile'}
								</FooterLink>
							</li>
						</ul>
					</div>
				</div>
			</div>
		</footer>
	);
}
