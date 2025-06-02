"use client";

import * as React from "react";
import { removeStudyBuddy } from "@/lib/collections/studybuddy";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";

type StudyBuddy = {
  id: string;
  name: string;
  email: string;
  avatar?: string;
};

export default function StudyBuddiesTable({
  userId,
  studyBuddies,
}: {
  userId: string;
  studyBuddies: StudyBuddy[];
}) {
  const [buddies, setBuddies] = React.useState(studyBuddies);

  const handleRemoveBuddy = async (buddyId: string) => {
    try {
      const success = await removeStudyBuddy(userId, buddyId);
      if (success) {
        setBuddies((prev) => prev.filter((buddy) => buddy.id !== buddyId));
        console.log(`Successfully removed buddy with ID: ${buddyId}`);
      } else {
        console.error(`Failed to remove buddy with ID: ${buddyId}`);
      }
    } catch (error) {
      console.error(`Error removing buddy with ID: ${buddyId}`, error);
    }
  };

  if (buddies.length === 0) {
    return <p className="text-muted-foreground text-xl">You have no study buddies yet.</p>;
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Email</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {buddies.map((buddy) => (
          <TableRow key={buddy.id}>
            <TableCell>{buddy.name || "N/A"}</TableCell>
            <TableCell>{buddy.email || "N/A"}</TableCell>
            <TableCell>
              <button
                className="text-blue-500 hover:underline"
                onClick={() => handleRemoveBuddy(buddy.id)}
              >
                Remove
              </button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}