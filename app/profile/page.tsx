import { cookies } from "next/headers";
import { EditProfileForm } from "./(components)/EditProfileForm";
import { LogoutButton } from "./(components)/LogoutButton";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Separator,
} from "@/src/shared/ui";

interface Profile {
  id: string;
  firstName: string;
  lastName?: string;
  email: string;
  role: string;
  createdAt: string;
  avatar: string;
}

async function getProfile(): Promise<Profile> {
  const cookieStore = await cookies();
  const token = cookieStore.get("sid")?.value;

  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/user/me`, {
    method: "GET",
    cache: "no-cache",
    headers: {
      "Content-Type": "application/json",
      Cookie: `sid=${token}`,
    },
  });

  return await response.json();
}

export default async function ProfilePage() {
  const profile = await getProfile();

  return (
    <section className="flex h-screen justify-center items-center">
      <Card className="border-border/60 shadow-sm rounded-md w-[700px] h-[650px] max-h-[90vh] overflow-y-auto [&::-webkit-scrollbar]:w-1 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-neutral-200 [&::-webkit-scrollbar-thumb]:rounded-full dark:[&::-webkit-scrollbar-thumb]:bg-neutral-800">
        <CardHeader className="flex justify-between items-center gap-4">
          <div className="flex items-center gap-3">
            <Avatar className="size-24 shadow-sm border">
              <AvatarImage src={profile.avatar} className="object-cover" />
              <AvatarFallback className="text-4xl bg-primary/20 text-primary">
                {(
                  profile.firstName[0] +
                  (profile.lastName && profile.lastName[0])
                ).toUpperCase()}
              </AvatarFallback>
            </Avatar>

            <div>
              <CardTitle className="text-xl">
                {`${profile.firstName} ${profile.lastName}`}
              </CardTitle>
              <CardDescription className="text-sm font-semibold text-muted-foreground">
                {profile.email}
              </CardDescription>
            </div>
          </div>

          <LogoutButton />
        </CardHeader>

        <Separator />

        <CardContent>
          <div className="border p-2 rounded-md">
            <EditProfileForm
              email={profile.email}
              lastname={profile.lastName}
              firstname={profile.firstName}
            />
          </div>
        </CardContent>
      </Card>
    </section>
  );
}
