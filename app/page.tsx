import { EditProfileForm } from "./(components)/EditProfileForm";
import { LogoutButton } from "./(components)/LogoutButton";
import {
  Button,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Label,
  Separator,
  Switch,
} from "@/src/shared/ui";
import { UserAvatar } from "./(components)/Avatar";

import { FaChrome, FaFirefox, FaEdge, FaSafari } from "react-icons/fa";
import { DeleteSessionButton } from "./(components)/DeleteSessionButton";
import { useQuery } from "@tanstack/react-query";
import { Trash2 } from "lucide-react";
import { cookies } from "next/headers";

interface Profile {
  id: string;
  firstName: string;
  lastName?: string;
  email: string;
  role: string;
  sessions: { id: string; expiresAt: string; userAgent: string }[];
  createdAt: string;
  avatar: string;
}

async function fetchProfile(): Promise<Profile> {
  const cookieStore = await cookies();

  const token = cookieStore.get("sid")?.value;

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
    throw new Error("Failed to fetch profile");
  }

  return res.json();
}

export default async function ProfilePage() {
  const profile = await fetchProfile();

  function getBrowserIcon(name: string) {
    switch (name) {
      case "Chrome":
        return <FaChrome size={30} />;
      case "Firefox":
        return <FaFirefox size={30} />;
      case "Edge":
        return <FaEdge size={30} />;
      case "Safari":
        return <FaSafari size={30} />;
      default:
        return <FaChrome size={30} />;
    }
  }

  return (
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
          <div className="border p-2 rounded-md">
            <EditProfileForm
              email={profile.email}
              lastName={profile.lastName}
              firstName={profile.firstName}
            />
          </div>

          <div className="border p-2 rounded-md">
            <div className=" mb-2">
              <h3 className="text-lg font-semibold">2FA</h3>
              <p className="text-sm text-muted-foreground mt-1">
                You can enable 2FA to improve the security of your account.
              </p>
            </div>

            <div className="flex items-center ">
              <Switch id="airplane-mode" />
              <Label htmlFor="airplane-mode">Enable 2FA</Label>
            </div>
          </div>

          <div className="border p-2 rounded-md">
            <h3 className="text-lg font-semibold mb-2">Active Sessions</h3>
            <ul className="flex flex-col gap-2 max-h-60 overflow-y-auto">
              {profile.sessions.map((session) => (
                <li
                  key={session.id}
                  className="flex justify-between transition-colors ease-in-out duration-150
                  hover:bg-gray-400/10 items-center p-2 border rounded-md"
                >
                  <div className="flex items-center gap-2">
                    <div>{getBrowserIcon(session.userAgent)}</div>

                    <div className="flex flex-col">
                      <span className="font-semibold">{session.userAgent}</span>

                      <span className="text-sm text-gray-500 dark:text-gray-400">
                        {new Date(session.expiresAt).toLocaleString("en-US", {
                          day: "2-digit",
                          month: "2-digit",
                          year: "numeric",
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </span>
                    </div>
                  </div>

                  <DeleteSessionButton sessionId={session.id} />
                </li>
              ))}
            </ul>
          </div>

          <div className="border p-2 rounded-md">
            <h3 className="text-lg font-semibold mb-2">Delete account</h3>
            <p className="text-sm text-muted-foreground mt-1">
              Once you delete your account, there is no going back. Please be
              certain.
            </p>

            <Button variant="destructive">
              <Trash2 />
              Delete
            </Button>
          </div>
        </CardContent>
      </Card>
    </section>
  );
}
