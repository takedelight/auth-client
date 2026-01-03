import Link from "next/link";
import { ToggleTheme } from "./ToggleTheme";

export function Header() {
  return (
    <header className="py-2">
      <nav className="container flex items-center justify-between mx-auto px-1">
        <Link className="font-semibold text-lg " href="/">
          Logo
        </Link>

        <ToggleTheme />
      </nav>
    </header>
  );
}
