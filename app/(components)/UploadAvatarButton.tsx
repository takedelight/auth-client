"use client";

import { Button } from "@/src/shared/ui";
import { useMutation } from "@tanstack/react-query";
import { Camera, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { ChangeEvent, useRef } from "react";

export function UploadAvatarButton() {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  const updateAvatar = useMutation({
    mutationKey: ["updateAvatar"],
    mutationFn: async (file: File) => {
      const formData = new FormData();
      formData.append("file", file);

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/user/avatar`,
        {
          method: "PATCH",
          body: formData,
          credentials: "include",
        },
      );

      if (!res.ok) throw new Error("Failed to update avatar");
    },
    onSuccess: () => {
      router.refresh();
    },
  });

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      updateAvatar.mutate(file);
    }
    event.target.value = "";
  };

  return (
    <div className="absolute inset-0 flex items-center justify-center">
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        className="hidden"
        accept="image/*"
      />

      <Button
        variant="ghost"
        disabled={updateAvatar.isPending}
        onClick={handleButtonClick}
        className="size-full rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 bg-black/60 hover:bg-black/70 text-white backdrop-blur-[2px]"
        title="Змінити фото"
      >
        {updateAvatar.isPending ? (
          <Loader2 className="animate-spin" size={28} />
        ) : (
          <Camera size={28} />
        )}
      </Button>
    </div>
  );
}
