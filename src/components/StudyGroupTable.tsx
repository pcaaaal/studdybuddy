"use client";

import * as React from "react";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { deleteUserFromStudyGroup } from "@/lib/collections/studygroup";

type StudyGroup = {
  id: string;
  name: string;
  description: string;
};

export default function StudyGroupsTable({
  userId,
  studyGroups,
}: {
  userId: string;
  studyGroups: StudyGroup[];
}) {
  const [groups, setGroups] = React.useState(studyGroups);

  const handleLeaveGroup = async (groupId: string) => {
    try {
      const response = await deleteUserFromStudyGroup(groupId, userId);
      if (response.success) {
        console.log(`Successfully left group with ID: ${groupId}`);
        setGroups((prevGroups) => prevGroups.filter((group) => group.id !== groupId));
      } else {
        console.error(`Failed to leave group with ID: ${groupId}`);
      }
    } catch (error) {
      console.error(`Error leaving group with ID: ${groupId}`, error);
    }
  };

  if (!groups || groups.length === 0) {
    return <p className="text-muted-foreground text-xl">You are not part of any study groups yet.</p>;
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Description</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {groups.map((group) => (
          <TableRow key={group.id}>
            <TableCell>{group.name || "N/A"}</TableCell>
            <TableCell>{group.description || "N/A"}</TableCell>
            <TableCell>
              <button
                className="text-blue-500"
                onClick={() => handleLeaveGroup(group.id)}
              >
                Leave Group
              </button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}