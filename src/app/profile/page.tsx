"use client";

import * as React from "react";
import PocketBase from "pocketbase";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal } from "lucide-react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

const pb = new PocketBase(process.env.NEXT_PUBLIC_PB_URL);

// Typ für Benutzer definieren
type User = {
  id: string;
  email: string;
  name: string;
  avatar: string;
};

export default function ProfilePage() {
  const [isEditing, setIsEditing] = React.useState(false);
  const [profile, setProfile] = React.useState<User | null>(null);
  const [studyGroups, setStudyGroups] = React.useState<any[]>([]);
  const [studyBuddies, setStudyBuddies] = React.useState<any[]>([]);

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch user data
        const response = await pb.collection("_pb_users_auth_").authRefresh();
        const user = response as unknown as User; // Typcasting
        setProfile(user);
  
        // Fetch study groups
        const groups = await pb.collection("user_studygroup").getFullList({
          filter: `user="${user.id}"`,
          expand: "studygroup",
        });
        setStudyGroups(
          groups
            .map((g) => g.expand?.studygroup) // Überprüfen, ob expand definiert ist
            .filter((group) => group !== undefined) // Entfernen von undefined-Werten
        );
  
        // Fetch study buddies
        const buddies = await pb.collection("studybuddy").getFullList({
          filter: `user_a="${user.id}" || user_b="${user.id}"`,
          expand: "user_a,user_b",
        });
        setStudyBuddies(
          buddies
            .map((b) =>
              b.expand?.user_a?.id === user.id ? b.expand?.user_b : b.expand?.user_a
            )
            .filter((buddy) => buddy !== undefined) // Entfernen von undefined-Werten
        );
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const handleEditToggle = () => setIsEditing(!isEditing);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProfile((prev) => (prev ? { ...prev, [name]: value } : null));
  };

  if (!profile) {
    return <div>Loading...</div>;
  }

  return (
    <div className="space-y-10">
      <h1 className="text-5xl font-extrabold">Profile</h1>

      {/* User Information */}
      <div className="bg-white shadow rounded-lg p-6 space-y-6">
        <div className="flex items-center space-x-4">
          <Avatar className="w-16 h-16 rounded-full">
            <AvatarImage
              src={`${process.env.NEXT_PUBLIC_PB_URL}/api/files/user/${profile.id}/${profile.avatar}`}
              alt={profile.name}
            />
            <AvatarFallback>{profile.name?.charAt(0)}</AvatarFallback>
          </Avatar>
          <div>
            <h2 className="text-2xl font-bold">{profile.name}</h2>
            <p className="text-gray-600">{profile.email}</p>
          </div>
        </div>
        <Button variant="outline" onClick={handleEditToggle}>
          {isEditing ? "Save" : "Edit"}
        </Button>
        {isEditing && (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Name
              </label>
              <Input
                name="name"
                value={profile.name}
                onChange={handleInputChange}
                className="mt-1"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <Input
                name="email"
                value={profile.email}
                onChange={handleInputChange}
                className="mt-1"
              />
            </div>
          </div>
        )}
      </div>

      {/* Study Groups */}
      <div className="bg-white shadow rounded-lg p-6">
        <h2 className="text-2xl font-bold mb-4">Study Groups</h2>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Group Name</TableHead>
              <TableHead>Description</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {studyGroups.map((group) => (
              <TableRow key={group.id}>
                <TableCell>{group.name}</TableCell>
                <TableCell>{group.description}</TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="h-8 w-8 p-0">
                        <MoreHorizontal />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>View Details</DropdownMenuItem>
                      <DropdownMenuItem>Leave Group</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Study Buddies */}
      <div className="bg-white shadow rounded-lg p-6 mb-10">
        <h2 className="text-2xl font-bold mb-4">Study Buddies</h2>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {studyBuddies.map((buddy) => (
              <TableRow key={buddy.id}>
                <TableCell>{buddy.name}</TableCell>
                <TableCell>{buddy.email}</TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="h-8 w-8 p-0">
                        <MoreHorizontal />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>Send Message</DropdownMenuItem>
                      <DropdownMenuItem>Remove Buddy</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Extra Space */}
      <div className="py-20"></div>
    </div>
  );
}
