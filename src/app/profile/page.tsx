import { getCurrentUserId } from "@/lib/getCurrentUserId";
import { getUserByUserId } from "@/lib/collections/user";
import { getStudyGroupsByUserId } from "@/lib/collections/studygroup";
import { getStudyBuddiesByUserId } from "@/lib/collections/studybuddy";
import EditableProfile from "@/components/editableProfile";
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
import { User } from "@/lib/types";
 
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
          {!myStudyGroups || myStudyGroups.length === 0 ? (
            <p className="text-muted-foreground text-xl">
              You are not part of any study groups yet.
            </p>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Description</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
              {myStudyGroups
            ?.filter((group) => group !== null) // Filtere ungültige Gruppen heraus
            .map((group) => (
              <TableRow key={group.id}>
                <TableCell>{group.name || "N/A"}</TableCell>
                <TableCell>{group.description || "N/A"}</TableCell>
                <TableCell>
                  <button className="text-blue-500">Leave Group</button>
                </TableCell>
              </TableRow>
            ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
 
      {/* Study Buddies */}
      <Card>
        <CardHeader>
          <CardTitle>My Study Buddies</CardTitle>
        </CardHeader>
        <CardContent>
          {!myStudyBuddies || myStudyBuddies.length === 0 ? (
            <p className="text-muted-foreground text-xl">
              You have no study buddies yet.
            </p>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
              {myStudyBuddies
            ?.filter((buddy) => buddy !== null) // Filtere ungültige Buddies heraus
            .map((buddy) => (
              <TableRow key={buddy.id}>
                <TableCell>{buddy.name || "N/A"}</TableCell>
                <TableCell>{buddy.email || "N/A"}</TableCell>
                <TableCell>
                  <button className="text-blue-500">Remove Buddy</button>
                </TableCell>
              </TableRow>
            ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
     
       {/* Extra Space */}
       <div className="py-5"></div>
    </div>
  );
}