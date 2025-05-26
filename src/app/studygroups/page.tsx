import { studyGroups } from '@/lib/data';

export default function StudyGroupsPage() {
    return (
        <div className="space-y-6">
            <h1 className="text-2xl font-bold">Study Groups</h1>
            <table className="w-full table-auto border-collapse shadow bg-white rounded overflow-hidden">
                <thead className="bg-gray-100">
                    <tr>
                        <th className="text-left p-3">Name</th>
                        <th className="text-left p-3">Subject</th>
                        <th className="text-left p-3">Level</th>
                        <th className="text-left p-3">Location</th>
                        <th className="text-left p-3">Members</th>
                    </tr>
                </thead>
                <tbody>
                    {studyGroups.map(group => (
                        <tr key={group.id} className="border-t hover:bg-gray-50">
                            <td className="p-3">{group.name}</td>
                            <td className="p-3">{group.subject}</td>
                            <td className="p-3">{group.level}</td>
                            <td className="p-3">{group.location}</td>
                            <td className="p-3">{group.members.join(', ')}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
