import { getCurrentUserId } from "@/lib/getCurrentUserId";
import { getUserByUserId } from "@/lib/collections/user";
import { getStudyGroupsByUserId } from "@/lib/collections/studygroup";
import { getStudyBuddiesByUserId } from "@/lib/collections/studybuddy";
import { deleteUserFromStudyGroup } from "@/lib/collections/studygroup"; 
import EditableProfile from "@/components/editableProfile";
import StudyGroupsTable from "@/components/StudyGroupTable";
import StudyBuddiesTable from "@/components/StudyBuddiesTable"; // Neue Client-Komponente
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/card";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";

export default async function ProfilePage() {
  const userId = await getCurrentUserId();

  if (!userId) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Card>
          <CardHeader>
            <CardTitle>Please log in to continue</CardTitle>
          </CardHeader>
        </Card>
      </div>
    );
  }

  const user = await getUserByUserId(userId);
  const myStudyGroups = await getStudyGroupsByUserId(userId);
  const myStudyBuddies = await getStudyBuddiesByUserId(userId);

  // Funktion zum Verlassen einer Studiengruppe
  const handleLeaveGroup = async (groupId: string) => {
    try {
      await deleteUserFromStudyGroup(userId, groupId); // Benutzer aus der Gruppe entfernen
      console.log(`Successfully left group with ID: ${groupId}`);
      // Aktualisiere die Gruppenliste
      const updatedGroups = await getStudyGroupsByUserId(userId);
      myStudyGroups.length = 0; // Bestehendes Array leeren
      myStudyGroups.push(...updatedGroups); // Aktualisierte Gruppen hinzufügen
    } catch (error) {
      console.error(`Failed to leave group with ID: ${groupId}`, error);
    }
  };

  return (
    <div className="container mx-auto px-4 space-y-8">
      <h1 className="text-5xl font-extrabold">Profile</h1>

      {/* User Information */}
      <EditableProfile user={user ?? {}} />

      {/* Study Groups */}
      <Card>
        <CardHeader>
          <CardTitle>My Study Groups</CardTitle>
        </CardHeader>
        <CardContent>
          <StudyGroupsTable userId={userId} studyGroups={myStudyGroups} />
        </CardContent>
      </Card>

      {/* Study Buddies */}
      <Card>
        <CardHeader>
          <CardTitle>My Study Buddies</CardTitle>
        </CardHeader>
        <CardContent>
          <StudyBuddiesTable userId={userId} studyBuddies={myStudyBuddies} />
        </CardContent>
      </Card>

      {/* Extra Space */}
      <div className="py-5"></div>
    </div>
  );
}