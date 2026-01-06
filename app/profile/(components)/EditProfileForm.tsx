"use client";

import { Button, Field, FieldGroup, FieldLabel, Input } from "@/src/shared/ui";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { ChangeEvent, useState } from "react";

interface Props {
  email: string;
  username: string;
}

export function EditProfileForm({ email, username }: Props) {
  const [profile, setProfile] = useState({ email, username });

  const router = useRouter();

  function handleUpdate(e: ChangeEvent<HTMLInputElement>) {
    const {
      target: { value, name },
    } = e;

    setProfile((prev) => ({ ...prev, [name]: value }));
  }

  const isDisabled = profile.email === email && profile.username === username;

  const updateUserMutation = useMutation({
    mutationKey: ["update-user"],
    mutationFn: async () => {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/user/me`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(profile),
      });

      console.log(res.headers);
    },
    onError: (error) => console.error(error),
    onSuccess: () => router.refresh(),
  });

  return (
    <form
      className="mt-2 flex flex-col gap-2 "
      onSubmit={(e) => {
        e.preventDefault();
        updateUserMutation.mutate();
      }}
    >
      <FieldGroup className="gap-2 flex flex-row">
        <Field className="gap-1">
          <FieldLabel htmlFor="email">Email</FieldLabel>
          <Input
            id="email"
            name="email"
            value={profile.email}
            onChange={handleUpdate}
            type="email"
            placeholder="m@example.com"
            required
          />
        </Field>

        <Field className="gap-1">
          <FieldLabel htmlFor="username">Username</FieldLabel>
          <Input
            id="username"
            name="username"
            value={profile.username}
            onChange={handleUpdate}
            type="text"
            placeholder="John Doe"
            required
          />
        </Field>
      </FieldGroup>
      <Button
        type="submit"
        disabled={updateUserMutation.isPending || isDisabled}
      >
        {updateUserMutation.isPending ? "Updating..." : "Update"}
      </Button>
    </form>
  );
}
