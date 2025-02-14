"use client";

import { ROUTES, NAVBAR_DETAILS } from "@/constants";
import Link from "next/link";
import Image from "next/image";
import React from "react";
import SearchInput from "../search.input";
import ToggleTheme from "../toggle.mode";
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuLink,
} from "../ui/navigation-menu";
import { NavbarComponentProps } from "@/types/component";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";
import { Button } from "../ui/button";
import { LogOut, User2 } from "lucide-react";
import { signOutAction } from "@/server-actions/auth.action";
import { useAction } from "next-safe-action/hooks";
import { toast } from "sonner";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";

const NavbarDesktop = ({
  isScrolled,
  pathname,
  isAuthenticated,
}: NavbarComponentProps) => {
  const searchParams = useSearchParams();
  const { replace, push } = useRouter();
  const { execute: signOut } = useAction(signOutAction, {
    onSuccess: ({ data }) => {
      if (data?.success) {
        push(ROUTES.HOME);
      }
    },
    onError: ({ error }) => {
      toast.error(error?.serverError);
    },
  });

  const handleSearch = useDebouncedCallback((search) => {
    const params = new URLSearchParams(searchParams);
    if (search) {
      params.set("title", search);
    } else {
      params.delete("title");
    }

    replace(`/search/?${params.toString()}`);
  }, 500);

  return (
    <nav
      data-testid="desktop-nav"
      className={`w-[90%] hidden lg:flex md:w-[70%] lg:w-[75%] lg:max-w-screen-2xl fixed left-1/2 -translate-x-1/2 top-2 border border-secondary z-[9999] rounded-xl justify-between items-center p-2 transition-all duration-200 shadow-md ${
        isScrolled
          ? "bg-white/80 dark:bg-black/90 backdrop-blur-sm border-none "
          : "bg-transparent border-none shadow-none"
      }`}
    >
      {/* Logo Section */}
      <Link href={ROUTES.HOME} className="cursor-pointer">
        <Image
          src={NAVBAR_DETAILS.LOGO}
          alt="Moviesflix logo"
          width={120}
          height={40}
          className="w-auto h-auto"
          priority
        />
      </Link>

      {/* Navbar Links Left Side*/}
      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem>
            {NAVBAR_DETAILS.NAVLINKS_LEFT_SIDE.map(({ href, label }) => (
              <NavigationMenuLink key={href} asChild>
                <Link
                  href={href}
                  className={`text-base px-4 hover:font-bold ${
                    pathname === href ? "font-bold" : ""
                  }`}
                >
                  {label}
                </Link>
              </NavigationMenuLink>
            ))}
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
      {/* Navbar Links Right Side*/}
      <div className="flex items-center justify-end flex-1 gap-2">
        {/* Search Input */}
        <SearchInput onChange={handleSearch} />
        {isAuthenticated ? (
          <div className="flex items-center gap-2">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant={"ghost"}
                    size="icon"
                    onClick={() => push(ROUTES.PROFILE)}
                  >
                    <User2 className="h-5 w-5" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Profile</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>

            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant={"ghost"}
                    size="icon"
                    onClick={() => signOut()}
                  >
                    <LogOut className="h-5 w-5" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Sign out</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        ) : (
          <>
            <Button
              variant={"outline"}
              className="rounded-full"
              onClick={() => push(ROUTES.SIGN_IN)}
            >
              Login
            </Button>
          </>
        )}
        <ToggleTheme />
      </div>
    </nav>
  );
};

export default NavbarDesktop;
