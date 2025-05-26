type Props = {
  group: {
    id: string;
    name: string;
    subject: string;
    level: string;
    location: string;
    members: string[];
  };
};

export default function StudyGroupCard({ group }: Props) {
  return (
    <div className="border p-4 rounded shadow">
      <h2 className="text-xl font-semibold">{group.name}</h2>
      <p>Fach: {group.subject}</p>
      <p>Niveau: {group.level}</p>
      <p>Ort: {group.location}</p>
      <p>Mitglieder: {group.members.join(', ')}</p>
    </div>
  );
}
