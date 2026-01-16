import { EditProfileForm } from "./(components)/EditProfileForm";
import { LogoutButton } from "./(components)/LogoutButton";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Separator,
} from "@/src/shared/ui";
import { UserAvatar } from "./(components)/Avatar";

import { cookies } from "next/headers";
import { Profile } from "./(types)/profile.type";
import { DeleteProfileSection } from "./(components)/DeleteProfileSection";
import { SessionList } from "./(components)/SessionList";
import { UpdatePassword } from "./(components)/UpdatePassword";
import { redirect } from "next/navigation";
import { PagesConfig } from "@/src/shared/configs";

async function fetchProfile(): Promise<Profile> {
  const cookieStore = await cookies();

  const token = cookieStore.get("sid")?.value;

  console.log(token);

  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/user/me`, {
    method: "GET",
    cache: "no-store",
    credentials: "include",
    headers: {
      Cookie: `sid=${token}`,
      "Content-Type": "application/json",
    },
  });

  if (!res.ok) {
   if(res.status === 401){
    redirect(PagesConfig.LOGIN_PAGE)
   }
  }

  return res.json();
}

export default async function ProfilePage() {
  const profile = await fetchProfile();

  return (
    <>
      <section className="flex h-[89vh] justify-center items-center">
        <Card className="border-border/60 shadow-sm rounded-md w-[700px] h-[650px] max-h-[90vh] overflow-y-auto [&::-webkit-scrollbar]:w-1 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-neutral-200 [&::-webkit-scrollbar-thumb]:rounded-full dark:[&::-webkit-scrollbar-thumb]:bg-neutral-800">
          <CardHeader className="flex justify-between items-center gap-4">
            <div className="flex items-center gap-3">
              <UserAvatar avatar={profile.avatar}>
                {(
                  profile.firstName[0] +
                  (profile.lastName ? profile.lastName[0] : "")
                ).toUpperCase()}
              </UserAvatar>

              <div>
                <CardTitle className="text-xl">{`${profile.firstName} ${profile.lastName || ""}`}</CardTitle>
                <CardDescription className="text-sm font-semibold text-muted-foreground">
                  {profile.email}
                </CardDescription>
              </div>
            </div>

            <LogoutButton />
          </CardHeader>

          <Separator />

          <CardContent className="flex flex-col gap-4">
            <EditProfileForm
              lastName={profile.lastName}
              firstName={profile.firstName}
            />

            <UpdatePassword />

            <SessionList sessions={profile.sessions} />

            <DeleteProfileSection userId={profile.id} />
          </CardContent>
        </Card>
      </section>
    </>
  );
}
