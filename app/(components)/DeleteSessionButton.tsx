"use client";

import { Button, Spinner } from "@/src/shared/ui";
import { useMutation } from "@tanstack/react-query";
import { LogOut } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

interface Props {
  sessionId: string;
}

export function DeleteSessionButton({ sessionId }: Props) {
  const router = useRouter();

  const deleteSessionMutation = useMutation({
    mutationKey: ["delete-session"],
    mutationFn: async () => {
      const res = await fetch(`api/session/delete/${sessionId}`, {
        method: "DELETE",
        credentials: "include",
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message);
      }

      return data;
    },
    onSuccess: (data) => {
      router.refresh();
      router.push("/");
      toast.success(data.message);
    },
  });
  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={() => deleteSessionMutation.mutate()}
      disabled={deleteSessionMutation.isPending}
      className="hover:bg-red-400/50!  hover:text-white transition-colors ease-in-out duration-150"
    >
      {deleteSessionMutation.isPending ? (
        <Spinner className="text-white" />
      ) : (
        <LogOut className="size-5" />
      )}
    </Button>
  );
}
