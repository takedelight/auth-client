import Link from "next/link";
import { ToggleTheme } from "./ToggleTheme";
import { cookies } from "next/headers";
import { cn } from "@/src/shared/lib";
import { buttonVariants } from "@/src/shared/ui";

export async function Header() {
  const cookieStore = await cookies();

  const token = cookieStore.get("sid")?.value;

  return (
    <header className="py-2">
      <nav className="container flex items-center justify-between mx-auto px-2">
        <Link className="font-semibold text-lg " href="/">
          Logo
        </Link>

        <div className="flex items-center gap-2">
          <ToggleTheme />

          {token ? (
            <Link
              href="/profile"
              className={cn(buttonVariants({ variant: "default" }))}
            >
              Profile
            </Link>
          ) : (
            <Link
              href="/login"
              className={cn(buttonVariants({ variant: "default" }))}
            >
              Login
            </Link>
          )}
        </div>
      </nav>
    </header>
  );
}
