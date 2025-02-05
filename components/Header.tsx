import siteMetadata from "@/data/siteMetadata";
import Link from "./Link";
import ThemeSwitch from "./ThemeSwitch";
import SearchButton from "./SearchButton";
import { cn } from "./lib/utils";
import { NavigationMenu } from "./navigation/NavigationMenu";

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
                  <div className="hidden text-3xl font-semibold sm:block">
                    {siteMetadata.headerTitle}
                    <br />
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
