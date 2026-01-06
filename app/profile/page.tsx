import { cookies } from "next/headers";
import { EditProfileForm } from "./(components)/EditProfileForm";
import { Avatar, AvatarFallback, buttonVariants } from "@/src/shared/ui";
import { User2Icon } from "lucide-react";
import { LogoutButton } from "./(components)/LogoutButton";
import Link from "next/link";
import { cn } from "@/src/shared/lib";

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
    <section className="container flex items-center h-[90vh] justify-center mt-3 px-1 mx-auto">
      <div className="grid w-[800px] h-[500px] border-muted border rounded-md grid-cols-[270px_1fr]">
        <aside className="col-start-1  flex flex-col justify-between col-end-2 border-r">
          <div>
            <div className="flex items-center p-2 border-b gap-2 ">
              <Avatar className="size-9">
                <AvatarFallback className="bg-primary">
                  <span className="font-semibold text-white text-lg">
                    {profile.username.slice(0, 2).toUpperCase()}
                  </span>
                </AvatarFallback>
              </Avatar>

              <div className="flex flex-col  ">
                <span className="font-semibold">{profile.username}</span>
                <span className="text-sm font-semibold text-muted-foreground ">
                  {profile.email}
                </span>
              </div>
            </div>

            <ul>
              <li>
                <Link
                  href="/profile"
                  className={cn(
                    buttonVariants({ variant: "ghost" }),
                    "flex w-full  justify-normal transition-colors ease-linear text-lg  duration-150 py-6 rounded-none items-center gap-2"
                  )}
                >
                  <User2Icon />
                  Profile
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <LogoutButton />
          </div>
        </aside>

        <div className="p-2">
          <EditProfileForm email={profile.email} username={profile.username} />
        </div>
      </div>
    </section>
  );
}

//  <CardHeader className="px-2 col flex items-center ">
//           <Avatar className="size-10">
//             <AvatarFallback className="bg-primary">
//               <span className="font-semibold text-white text-xl ">
//                 {profile.username.slice(0, 2).toUpperCase()}
//               </span>
//             </AvatarFallback>
//           </Avatar>

//           <div>
//             <CardTitle>{profile.username}</CardTitle>
//             <CardDescription className="text-muted-foreground">
//               {profile.email}
//             </CardDescription>
//           </div>
//         </CardHeader>

//         <CardContent className="px-2">
//           <EditProfileForm email={profile.email} username={profile.username} />
//         </CardContent>
