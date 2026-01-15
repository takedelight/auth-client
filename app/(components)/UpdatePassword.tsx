"use client";

import {
  Button,
  Field,
  FieldGroup,
  FieldLabel,
  Input,
  Spinner,
} from "@/src/shared/ui";
import { useMutation } from "@tanstack/react-query";
import { ChangeEvent, useState } from "react";

export function UpdatePassword() {
  const [passwords, setPasswords] = useState({
    currentPassword: "",
    newPassword: "",
  });

  const isPasswordsEntered =
    passwords.currentPassword.length > 0 && passwords.newPassword.length > 0;

  const isDisabled = !isPasswordsEntered;

  const handlePasswordUpdate = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPasswords((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const updatePasswordMutation = useMutation({
    mutationKey: ["update-password"],
    mutationFn: async () => {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/user/update-password`,
        {
          method: "PATCH",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(passwords),
        },
      );
    },
  });
  return (
    <div className="flex border p-2 flex-col gap-4">
      <div>
        <h3 className="text-lg font-medium leading-none">Update Password</h3>
        <p className="text-sm text-muted-foreground ">
          Update your password for added security.
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

      <div className="flex justify-end pt-2">
        <Button
          disabled={isDisabled}
          onClick={() => updatePasswordMutation.mutate()}
          type="submit"
          className="relative"
        >
          <span className={updatePasswordMutation.isPending ? "opacity-0" : ""}>
            Update Password
          </span>
          {updatePasswordMutation.isPending && (
            <div className="absolute inset-0 flex items-center justify-center">
              <Spinner className="text-white" />
            </div>
          )}
        </Button>
      </div>
    </div>
  );
}
