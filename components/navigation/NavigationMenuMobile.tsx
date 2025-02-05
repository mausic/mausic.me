"use client";

import * as React from "react";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "../ui/drawer";
import headerNavLinks from "@/data/headerNavLinks";
import Link, { LinkProps } from "next/link";
import { cn } from "../lib/utils";
import { useRouter } from "next/navigation";

export const NavigationMenuMobile = () => {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <Drawer open={isOpen} onOpenChange={setIsOpen}>
      <DrawerTrigger>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          className="h-8 w-8 text-gray-900 dark:text-gray-100">
          <path
            fillRule="evenodd"
            d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
            clipRule="evenodd"
          />
        </svg>
      </DrawerTrigger>
      <DrawerContent className="max-h-[80svh] p-0">
        <div className="overflow-auto p-6">
          <div className="flex flex-col space-y-3">
            <MobileLink href="/" className="text-base" onOpenChange={setIsOpen}>
              Home
            </MobileLink>
            {headerNavLinks
              .filter((link) => link.href !== "/")
              .map((link) => (
                <MobileLink
                  key={link.title}
                  href={link.href}
                  className="text-base"
                  onOpenChange={setIsOpen}>
                  {link.title}
                </MobileLink>
              ))}
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  );
};

interface IMobileLinkProps extends LinkProps {
  href: string;
  children: React.ReactNode;
  className?: string;
  onOpenChange?: (open: boolean) => void;
}

const MobileLink = ({ href, children, className, onOpenChange, ...props }: IMobileLinkProps) => {
  const router = useRouter();
  return (
    <Link
      href={href}
      className={cn("text-base", className)}
      {...props}
      onClick={() => {
        router.push(href);
        onOpenChange?.(false);
      }}>
      {children}
    </Link>
  );
};
