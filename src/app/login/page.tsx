import {LoginForm} from '@/components/login-form';
import {pb} from '../../lib/pocketbase';

export default async function Page() {
	const records = await pb.collection('studygroup').getFullList({
		sort: '-created',
	});

	console.log('Records:', records);
	return (
		<div className="flex w-full items-center justify-center p-6 md:p-10 min-h-screen">
				<LoginForm className='h-full w-full max-w-sm'/>
		</div>
	);
}
