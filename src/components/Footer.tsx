import Link from 'next/link';
import {Home, Users, Calendar, ShieldUser, FileText, Info} from 'lucide-react';
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
        <Button
            asChild
            variant="link"
            className="text-base flex items-center gap-2 justify-start"
        >
            <Link href={href}>
                <Icon size={18} />
                {children}
            </Link>
        </Button>
    );

    return (
        <footer className="border-t border-gray-300 bg-gray-50 py-8 mt-8">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3">
                    {/* Copyright Section */}
                    <div className="flex flex-col gap-4">
                        <h3 className="text-lg font-semibold text-gray-800">Copyright</h3>
                        <p className="text-sm text-gray-600">
                            © {new Date().getFullYear()} StudyBuddy. All rights reserved.
                        </p>
                    </div>

                    {/* Privacy & Legal Section */}
                    <div className="flex flex-col gap-4">
                        <h3 className="text-lg font-semibold text-gray-800">Privacy & Legal</h3>
                        <ul className="flex flex-col gap-2">
                            <li>
                                <FooterLink href="/privacy" icon={FileText}>
                                    Privacy Policy
                                </FooterLink>
                            </li>
                            <li>
                                <FooterLink href="/impressum" icon={Info}>
                                    Impressum
                                </FooterLink>
                            </li>
                        </ul>
                    </div>

                    {/* Navigation Section */}
                    <div className="flex flex-col gap-4">
                        <h3 className="text-lg font-semibold text-gray-800">Navigation</h3>
                        <ul className="flex flex-col gap-2">
                            <li>
                                <FooterLink href="/" icon={Home}>
                                    Home
                                </FooterLink>
                            </li>
                            <li>
                                <FooterLink href="/studygroups" icon={Users}>
                                    Study Groups
                                </FooterLink>
                            </li>
                            <li>
                                <FooterLink href="/calendar" icon={Calendar}>
                                    Calendar
                                </FooterLink>
                            </li>
                            <li>
                                <FooterLink href="/profile" icon={ShieldUser}>
                                    Profile
                                </FooterLink>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </footer>
    );
}
