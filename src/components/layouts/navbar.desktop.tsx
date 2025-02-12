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

const NavbarDesktop = ({ isScrolled, pathname }: NavbarComponentProps) => {
  const searchParams = useSearchParams();
  const { replace } = useRouter();

  const handleSearch = useDebouncedCallback((search) => {
    const params = new URLSearchParams(searchParams);
    if (search) {
      params.set("title", search);
    } else {
      params.delete("title");
    }

    replace(`/search/?${params.toString()}`);
  }, 300);

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
          height={120}
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
      <div className="flex items-center gap-2 flex-1 justify-end">
        {/* Search Input */}
        <SearchInput onChange={handleSearch} />
        <NavigationMenu>
          <NavigationMenuList>
            <NavigationMenuItem>
              {NAVBAR_DETAILS.NAVLINKS_RIGHT_SIDE.map(({ href, label }) => (
                <NavigationMenuLink key={href} asChild>
                  <Link href={href} className="text-base px-4 hover:font-bold">
                    {label}
                  </Link>
                </NavigationMenuLink>
              ))}
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
        <ToggleTheme />
      </div>
    </nav>
  );
};

export default NavbarDesktop;
