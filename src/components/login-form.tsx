'use client';

import {cn} from '@/lib/utils';
import {Button} from '@/components/ui/button';
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import {Input} from '@/components/ui/input';
import {Label} from '@/components/ui/label';
import {toast} from 'sonner';
import {useRouter} from 'next/navigation';

export function LoginForm({className, ...props}: React.ComponentProps<'div'>) {
	const router = useRouter();
	async function onSubmit(e: React.FormEvent) {
		e.preventDefault();
		const form = new FormData(e.target as HTMLFormElement);
		console.log('form', form.get('email'), form.get('password'));
		const res = await fetch('/api/auth/login', {
			method: 'POST',
			headers: {'Content-Type': 'application/json'},
			body: JSON.stringify({
				email: form.get('email'),
				password: form.get('password'),
			}),
		});
		console.log('res', res);
		if (res.ok) router.push('/');
		else {
			const error = await res.json();
			toast.error(error.message || 'Login failed');
		}
	}

	return (
		<div className={cn('flex flex-col gap-6', className)} {...props}>
			<Card>
				<CardHeader>
					<CardTitle>Login to your account</CardTitle>
					<CardDescription>
						Enter your email below to login to your account
					</CardDescription>
				</CardHeader>
				<CardContent>
					<form onSubmit={onSubmit}>
						<div className="flex flex-col gap-6">
							<div className="grid gap-3">
								<Label htmlFor="email">Email</Label>
								<Input
									name="email"
									id="email"
									type="email"
									placeholder="m@example.com"
									required
								/>
							</div>
							<div className="grid gap-3">
								<div className="flex items-center">
									<Label htmlFor="password">Password</Label>
								</div>
								<Input
									name="password"
									id="password"
									type="password"
									required
								/>
							</div>
							<div className="flex flex-col gap-3">
								<Button type="submit" className="w-full">
									Login
								</Button>
							</div>
						</div>
						<div className="mt-4 text-center text-sm">
							Don&apos;t have an account?{' '}
							<a
								href="/register"
								className="underline underline-offset-4"
							>
								Sign up
							</a>
						</div>
					</form>
				</CardContent>
			</Card>
		</div>
	);
}
