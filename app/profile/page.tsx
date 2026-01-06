import {
  Avatar,
  AvatarFallback,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/src/shared/ui";
import { cookies } from "next/headers";
import { EditProfileForm } from "./(components)/EditProfileForm";

interface Profile {
  id: string;
  username: string;
  email: string;
  role: string;
  createdAt: string;
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
    <section className="container mt-3 px-1 mx-auto">
      <Card>
        <CardHeader className="px-2 flex items-center ">
          <Avatar className="size-10">
            <AvatarFallback className="bg-primary">
              <span className="font-semibold text-white text-xl ">
                {profile.username.slice(0, 2).toUpperCase()}
              </span>
            </AvatarFallback>
          </Avatar>

          <div>
            <CardTitle>{profile.username}</CardTitle>
            <CardDescription className="text-muted-foreground">
              {profile.email}
            </CardDescription>
          </div>
        </CardHeader>

        <CardContent className="px-2">
          <EditProfileForm email={profile.email} username={profile.username} />
        </CardContent>
      </Card>
    </section>
  );
}
