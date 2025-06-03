"use client";

import * as React from "react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { User } from "@/lib/types";
import { updateUserByUserId } from "@/lib/collections/user";

export default function EditableProfile({ user }: { user: User }) {
  const [isEditing, setIsEditing] = React.useState(false);
  const [isSaving, setIsSaving] = React.useState(false);
  const [name, setName] = React.useState(user.name || "");
  const [email, setEmail] = React.useState(user.email || "");
  const [avatar, setAvatar] = React.useState<File | null>(null);
  const [currentUser, setCurrentUser] = React.useState(user); // Benutzerzustand

  const handleSave = async () => {
    setIsSaving(true);
    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("email", email);

      // Avatar hochladen, falls vorhanden
      if (avatar) {
        formData.append("avatar", avatar);
      }

      // Benutzer aktualisieren
      const updatedUser = await updateUserByUserId(user.id, formData);

      console.log("Profile updated successfully");
      setCurrentUser(updatedUser); // Benutzerzustand aktualisieren
      setIsEditing(false);
    } catch (error) {
      console.error("Failed to update profile:", error);
    } finally {
      setIsSaving(false);
    }
  };

  const handleCancel = () => {
    // Änderungen verwerfen und Bearbeitungsmodus verlassen
    setName(currentUser.name || "");
    setEmail(currentUser.email || "");
    setAvatar(null);
    setIsEditing(false);
  };

  return (
    <div className="bg-white shadow rounded-lg p-6 space-y-6">
      <div className="flex items-center space-x-4">
        <Avatar className="w-16 h-16 rounded-full">
          <AvatarImage
            src={`${process.env.NEXT_PUBLIC_PB_URL_PICTURES}/${currentUser.id}/${currentUser.avatar}?${Date.now()}`} // Cache-Busting
            alt={currentUser.name}
          />
          <AvatarFallback>{currentUser.name?.charAt(0)}</AvatarFallback>
        </Avatar>
        <div>
          <h2 className="text-2xl font-bold">{currentUser.name}</h2>
          <p className="text-gray-600">{currentUser.email}</p>
        </div>
      </div>
      {isEditing && (
        <div className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
              Name
            </label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <label htmlFor="avatar" className="block text-sm font-medium text-gray-700">
              Avatar
            </label>
            <Input
              id="avatar"
              type="file"
              accept="image/*"
              onChange={(e) => setAvatar(e.target.files?.[0] || null)}
            />
          </div>
        </div>
      )}
      <div className="flex space-x-4">
        {isEditing ? (
          <>
            <Button
              variant="outline"
              onClick={handleSave}
              disabled={isSaving}
            >
              {isSaving ? "Saving..." : "Save"}
            </Button>
            <Button
              variant="outline"
              onClick={handleCancel}
              disabled={isSaving}
            >
              Cancel
            </Button>
          </>
        ) : (
          <Button
            variant="outline"
            onClick={() => setIsEditing(true)}
          >
            Edit
          </Button>
        )}
      </div>
    </div>
  );
}