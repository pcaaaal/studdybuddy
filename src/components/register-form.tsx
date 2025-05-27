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

export function RegisterForm({
	className,
	...props
}: React.ComponentProps<'div'>) {
	return (
		<div className={cn('flex flex-col gap-6', className)} {...props}>
			<Card>
				<CardHeader>
					<CardTitle>Create a New Account</CardTitle>
					<CardDescription>
						Enter your details below to sign up for an account.
					</CardDescription>
				</CardHeader>
				<CardContent>
					<form>
						<div className="flex flex-col gap-6">
							<div className="grid gap-3">
								<Label htmlFor="email">Email</Label>
								<Input
									id="email"
									type="email"
									placeholder="you@example.com"
									required
								/>
							</div>
							<div className="grid gap-3">
								<Label htmlFor="password">Password</Label>
								<Input id="password" type="password" required />
							</div>
							<div className="grid gap-3">
								<Label htmlFor="confirm-password">
									Confirm Password
								</Label>
								<Input
									id="confirm-password"
									type="password"
									required
								/>
							</div>
							<div className="flex flex-col gap-3">
								<Button type="submit" className="w-full">
									Sign Up
								</Button>
								<Button variant="outline" className="w-full">
									Sign Up with Google
								</Button>
							</div>
						</div>
						<div className="mt-4 text-center text-sm">
							Already have an account?{' '}
							<a
								href="/login"
								className="underline underline-offset-4"
							>
								Log in
							</a>
						</div>
					</form>
				</CardContent>
			</Card>
		</div>
	);
}
