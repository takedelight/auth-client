import { Avatar, AvatarFallback, AvatarImage } from "@/src/shared/ui"; // Перевірте імпорти
import { PropsWithChildren } from "react";
import { UploadAvatarButton } from "./UploadAvatarButton";

interface Props {
  avatar?: string;
}

export function UserAvatar({ avatar, children }: PropsWithChildren<Props>) {
  return (
    <div className="relative group size-24">
      <Avatar className="size-full shadow-sm border">
        <AvatarImage src={avatar} className="object-cover" />
        <AvatarFallback className="text-4xl bg-primary/20 text-primary">
          {children}
        </AvatarFallback>
      </Avatar>

      <UploadAvatarButton />
    </div>
  );
}
