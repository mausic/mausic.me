import headerNavLinks from "@/data/headerNavLinks";
import Link from "next/link";
import { NavigationMenuMobile } from "./NavigationMenuMobile";

export const NavigationMenu = () => {
  return (
    <>
      <div className="hidden sm:block">
        <div className="flex flex-row items-center justify-center gap-x-4">
          {headerNavLinks
            .filter((link) => link.href !== "/")
            .map((link) => (
              <Link
                key={link.title}
                href={link.href}
                className="hidden font-medium text-gray-900 dark:text-gray-100 sm:block">
                {link.title}
              </Link>
            ))}
        </div>
      </div>
      <div className="flex items-center sm:hidden">
        <NavigationMenuMobile />
      </div>
    </>
  );
};
