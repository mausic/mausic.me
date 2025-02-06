import siteMetadata from "@/data/siteMetadata";
import Link from "./Link";
import ThemeSwitch from "./ThemeSwitch";
import SearchButton from "./SearchButton";
import { cn } from "./lib/utils";
import { NavigationMenu } from "./navigation/NavigationMenu";
import Image from "next/image";

import Logo from "../public/static/images/logo.png";

const Header = () => {
  return (
    <header
      className={cn(
        "",
        siteMetadata.stickyNav
          ? "sticky top-0 z-50 bg-background backdrop-blur supports-[backdrop-filter]:bg-background/60"
          : "",
        "px-4",
      )}>
      <div className="container-wrapper">
        <div className="container flex items-center justify-between py-6">
          <div className="">
            <Link href="/" aria-label={siteMetadata.headerTitle}>
              <div className="flex items-center justify-between">
                {typeof siteMetadata.headerTitle === "string" ? (
                  <div className="hidden sm:block">
                    <div className="flex flex-row items-baseline gap-2">
                      <Image
                        src={Logo}
                        alt="logo"
                        width={40}
                        height={40}
                        className="aspect-square h-6 w-6"
                      />
                      <div className="text-3xl font-semibold">{siteMetadata.headerTitle}</div>
                    </div>
                    <div className="text-sm font-normal text-muted-foreground sm:block">
                      {siteMetadata.description}
                    </div>
                  </div>
                ) : (
                  siteMetadata.headerTitle
                )}
              </div>
            </Link>
          </div>
          <div className="flex items-center space-x-4 leading-5 sm:space-x-6">
            <NavigationMenu />
            <SearchButton />
            <ThemeSwitch />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
