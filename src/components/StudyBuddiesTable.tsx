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
  const [showConfirmModal, setShowConfirmModal] = React.useState(false);
  const [selectedBuddyId, setSelectedBuddyId] = React.useState<string | null>(null);

  const handleRemoveBuddy = async () => {
    if (!selectedBuddyId) return;

    try {
      const success = await removeStudyBuddy(userId, selectedBuddyId);
      if (success) {
        setBuddies((prev) => prev.filter((buddy) => buddy.id !== selectedBuddyId));
        console.log(`Successfully removed buddy with ID: ${selectedBuddyId}`);
      } else {
        console.error(`Failed to remove buddy with ID: ${selectedBuddyId}`);
      }
    } catch (error) {
      console.error(`Error removing buddy with ID: ${selectedBuddyId}`, error);
    } finally {
      setShowConfirmModal(false);
      setSelectedBuddyId(null);
    }
  };

  const openConfirmModal = (buddyId: string) => {
    setSelectedBuddyId(buddyId);
    setShowConfirmModal(true);
  };

  const closeConfirmModal = () => {
    setShowConfirmModal(false);
    setSelectedBuddyId(null);
  };

  if (buddies.length === 0) {
    return <p className="text-muted-foreground text-xl">You have no study buddies yet.</p>;
  }

  return (
    <>
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
                  onClick={() => openConfirmModal(buddy.id)}
                >
                  Remove
                </button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {showConfirmModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white rounded-lg p-6 space-y-4 shadow-lg">
            <h2 className="text-lg font-bold">Are you sure?</h2>
            <p className="text-gray-600">Do you really want to remove this buddy? This action cannot be undone.</p>
            <div className="flex space-x-4">
              <button
                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                onClick={handleRemoveBuddy}
              >
                Remove
              </button>
              <button
                className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400"
                onClick={closeConfirmModal}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}