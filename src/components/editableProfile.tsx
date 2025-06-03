"use client";

import * as React from "react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { User } from "@/lib/types";
import { updateUserByUserId } from "@/lib/collections/user";

export default function EditableProfile({ user }: { user: User }) {
  const [isEditing, setIsEditing] = React.useState(false);
  const [profile, setProfile] = React.useState<User>(user);
  const [isSaving, setIsSaving] = React.useState(false);

  const handleEditToggle = () => {
    if (isEditing) {
      handleSave();
    } else {
      setIsEditing(true);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProfile((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      await updateUserByUserId(profile.id, {
        name: profile.name,
        email: profile.email,
        avatar: profile.avatar,
      });
      setIsEditing(false);
      console.log("Profile updated successfully");
    } catch (error) {
      console.error("Failed to update profile:", error);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="bg-white shadow rounded-lg p-6 space-y-6">
      <div className="flex items-center space-x-4">
        <Avatar className="w-16 h-16 rounded-full">
          <AvatarImage
            src={`${process.env.NEXT_PUBLIC_PB_URL_PICTURES}/${profile.id}/${profile.avatar}`}
            alt={profile.name}
          />
          <AvatarFallback>{profile.name?.charAt(0)}</AvatarFallback>
        </Avatar>
        <div>
          <h2 className="text-2xl font-bold">{profile.name}</h2>
          <p className="text-gray-600">{profile.email}</p>
        </div>
      </div>
      <Button variant="outline" onClick={handleEditToggle} disabled={isSaving}>
        {isEditing ? (isSaving ? "Saving..." : "Save") : "Edit"}
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
  );
}