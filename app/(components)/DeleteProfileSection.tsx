import { Button } from "@/src/shared/ui";
import { Trash2 } from "lucide-react";

interface Props {
  userId: string;
}

export function DeleteProfileSection({ userId }: Props) {
  return (
    <div className="border p-2 rounded-md">
      <h3 className="text-lg font-semibold mb-2">Delete account</h3>
      <p className="text-sm text-muted-foreground mt-1">
        Once you delete your account, there is no going back. Please be certain.
      </p>

      <Button variant="destructive">
        <Trash2 />
        Delete
      </Button>
    </div>
  );
}
