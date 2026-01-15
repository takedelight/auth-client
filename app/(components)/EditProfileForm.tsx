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
import { useRouter } from "next/navigation";
import { ChangeEvent, useState } from "react";

interface Props {
  firstName: string;
  lastName?: string;
}

export function EditProfileForm({ firstName = "", lastName = "" }: Props) {
  const [profile, setProfile] = useState({
    firstName,
    lastName,
  });

  const router = useRouter();

  function handleProfileUpdate(e: ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setProfile((prev) => ({ ...prev, [name]: value }));
  }

  const isProfileChanged =
    profile.firstName !== firstName || profile.lastName !== lastName;

  const isDisabled = !isProfileChanged;

  const updateUserMutation = useMutation({
    mutationKey: ["update-user"],
    mutationFn: async () => {
      const res = await fetch("/api/profile/update", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(profile),
      });

      const text = await res.text();
      console.log(res.status, text);

      if (!res.ok) {
        throw new Error(text || `HTTP ${res.status}`);
      }
    },

    onError: (error) => console.error(error),
    onSuccess: () => {
      router.refresh();
    },
  });

  return (
    <section className="border p-2 rounded-md">
      <form
        className=" flex flex-col gap-5"
        onSubmit={(e) => {
          e.preventDefault();
          updateUserMutation.mutate();
        }}
      >
        <div className="flex flex-col gap-2">
          <div>
            <h3 className="text-lg font-medium leading-none">Profile Info</h3>
            <p className="text-sm text-muted-foreground ">
              Update your personal details here.
            </p>
          </div>

          <FieldGroup className="grid  gap-5 grid-cols-2">
            <Field className="gap">
              <FieldLabel htmlFor="firstname">First Name</FieldLabel>
              <Input
                id="firstname"
                name="firstName"
                value={profile.firstName}
                onChange={handleProfileUpdate}
                type="text"
                placeholder="John"
              />
            </Field>

            <Field className="gap">
              <FieldLabel htmlFor="lastname">Last Name</FieldLabel>
              <Input
                id="lastname"
                name="lastName"
                value={profile.lastName}
                onChange={handleProfileUpdate}
                type="text"
                placeholder="Doe"
              />
            </Field>
          </FieldGroup>
        </div>

        <div className="flex justify-end pt-2">
          <Button
            type="submit"
            disabled={updateUserMutation.isPending || isDisabled}
            className="relative"
          >
            <span className={updateUserMutation.isPending ? "opacity-0" : ""}>
              Update Profile
            </span>
            {updateUserMutation.isPending && (
              <div className="absolute inset-0 flex items-center justify-center">
                <Spinner className="text-white" />
              </div>
            )}
          </Button>
        </div>
      </form>
    </section>
  );
}
