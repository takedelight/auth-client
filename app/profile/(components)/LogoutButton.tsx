"use client";

import { Button } from "@/src/shared/ui";
import { useMutation } from "@tanstack/react-query";
import { LogOut } from "lucide-react";
import { useRouter } from "next/navigation";

export function LogoutButton() {
  const router = useRouter();

  const logoutMutation = useMutation({
    mutationKey: ["logout"],
    mutationFn: async () => {
      await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/logout`, {
        method: "POST",
        credentials: "include",
      });
    },
    onSuccess: () => router.push("/"),
  });
  return (
    <Button
      onClick={() => logoutMutation.mutate()}
      disabled={logoutMutation.isPending}
      variant="ghost"
      className="flex w-full  justify-normal  rounded-none items-center gap-1"
    >
      <LogOut /> Logout
    </Button>
  );
}
