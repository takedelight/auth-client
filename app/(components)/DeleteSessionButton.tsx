"use client";

import { Button, Spinner } from "@/src/shared/ui";
import { useMutation } from "@tanstack/react-query";
import { LogOut } from "lucide-react";
import { useRouter } from "next/navigation";

interface Props {
  sessionId: string;
}

export function DeleteSessionButton({ sessionId }: Props) {
  const router = useRouter();

  const deleteSessionMutation = useMutation({
    mutationKey: ["delete-session"],
    mutationFn: async () => {
      await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/session/delete/${sessionId}`,
        {
          method: "DELETE",
          credentials: "include",
        },
      );
    },
    onSuccess: () => {
      router.refresh();
      router.push("/");
    },
  });
  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={() => deleteSessionMutation.mutate()}
      title="Завершити сесію"
      disabled={deleteSessionMutation.isPending}
      className="hover:bg-red-800/30! transition-colors ease-in-out duration-150"
    >
      {deleteSessionMutation.isPending ? (
        <Spinner className="text-white" />
      ) : (
        <LogOut className="size-5   " />
      )}
    </Button>
  );
}
