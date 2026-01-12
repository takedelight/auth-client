"use client";

import { Button, Field, FieldGroup, FieldLabel, Input } from "@/src/shared/ui";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { ChangeEvent, useState } from "react";

interface Props {
  email: string;
  firstname: string;
  lastname?: string;
}

export function EditProfileForm({
  email,
  firstname = "",
  lastname = "",
}: Props) {
  const [profile, setProfile] = useState({
    email,
    firstname,
    lastname,
  });

  const [passwords, setPasswords] = useState({
    currentPassword: "",
    newPassword: "",
  });

  const router = useRouter();

  function handleProfileUpdate(e: ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setProfile((prev) => ({ ...prev, [name]: value }));
  }

  function handlePasswordUpdate(e: ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setPasswords((prev) => ({ ...prev, [name]: value }));
  }

  const isProfileChanged =
    profile.email !== email ||
    profile.firstname !== firstname ||
    profile.lastname !== lastname;

  const isPasswordEntered =
    passwords.currentPassword.length > 0 || passwords.newPassword.length > 0;

  const isDisabled = !isProfileChanged && !isPasswordEntered;

  const updateUserMutation = useMutation({
    mutationKey: ["update-user"],
    mutationFn: async () => {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/user/me`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(profile),
      });

      if (!res.ok) throw new Error("Failed to update profile");
    },
    onError: (error) => console.error(error),
    onSuccess: () => {
      router.refresh();
      setPasswords({ currentPassword: "", newPassword: "" });
    },
  });

  return (
    <form
      className="mt-3 flex flex-col gap-5"
      onSubmit={(e) => {
        e.preventDefault();
        updateUserMutation.mutate();
      }}
    >
      <div className="flex flex-col gap-4">
        <div>
          <h3 className="text-lg font-medium leading-none">Profile Info</h3>
          <p className="text-sm text-muted-foreground mt-1">
            Update your personal details here.
          </p>
        </div>

        <FieldGroup className="grid  gap-5 grid-cols-2">
          <Field className="gap-1.5">
            <FieldLabel htmlFor="firstname">First Name</FieldLabel>
            <Input
              id="firstname"
              name="firstname"
              value={profile.firstname}
              onChange={handleProfileUpdate}
              type="text"
              placeholder="John"
            />
          </Field>

          <Field className="gap-1.5">
            <FieldLabel htmlFor="lastname">Last Name</FieldLabel>
            <Input
              id="lastname"
              name="lastname"
              value={profile.lastname}
              onChange={handleProfileUpdate}
              type="text"
              placeholder="Doe"
            />
          </Field>
        </FieldGroup>
      </div>

      <hr className="border-muted/60" />

      <div className="flex flex-col gap-4">
        <div>
          <h3 className="text-lg font-medium leading-none">Security</h3>
          <p className="text-sm text-muted-foreground mt-1">
            Ensure your account is using a long, random password to stay secure.
          </p>
        </div>

        <FieldGroup className="grid  gap-5 grid-cols-2">
          <Field className="gap-1.5">
            <FieldLabel htmlFor="currentPassword">Current Password</FieldLabel>
            <Input
              id="currentPassword"
              name="currentPassword"
              value={passwords.currentPassword}
              onChange={handlePasswordUpdate}
              type="password"
              placeholder="•••••••"
              autoComplete="current-password"
            />
          </Field>

          <Field className="gap-1.5">
            <FieldLabel htmlFor="newPassword">New Password</FieldLabel>
            <Input
              id="newPassword"
              name="newPassword"
              value={passwords.newPassword}
              onChange={handlePasswordUpdate}
              type="password"
              placeholder="•••••••"
              autoComplete="new-password"
            />
          </Field>
        </FieldGroup>
      </div>

      <div className="flex justify-end pt-2">
        <Button
          type="submit"
          disabled={updateUserMutation.isPending || isDisabled}
        >
          {updateUserMutation.isPending ? "Updating..." : "Save Changes"}
        </Button>
      </div>
    </form>
  );
}
