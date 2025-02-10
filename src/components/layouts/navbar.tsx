"use client";
import { useState, useEffect } from "react";
import ToggleTheme from "../toggle.mode";
import { NAVBAR_DETAILS, ROUTES } from "@/constants";
import Link from "next/link";
import Image from "next/image";
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuLink,
} from "@/components/ui/navigation-menu";
import SearchInput from "../search.input";
import { usePathname } from "next/navigation";

const Navbar = () => {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      {/* Desktop Nav */}
      <nav
        className={`w-[90%] hidden lg:flex md:w-[70%] lg:w-[75%] lg:max-w-screen-2xl fixed left-1/2 -translate-x-1/2 top-5 border border-secondary z-[9999] rounded-xl justify-between items-center p-2 transition-all duration-200 shadow-md ${
          isScrolled
            ? "bg-white/80 dark:bg-black/90 backdrop-blur-sm border-none lg:max-w-screen-md"
            : "bg-transparent border-none shadow-none"
        }`}
      >
        {/* Logo Section */}
        <Link href={ROUTES.HOME} className="cursor-pointer">
          <Image
            src={NAVBAR_DETAILS.LOGO}
            alt="VitalJourney Logo"
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
          <SearchInput />
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                {NAVBAR_DETAILS.NAVLINKS_RIGHT_SIDE.map(({ href, label }) => (
                  <NavigationMenuLink key={href} asChild>
                    <Link
                      href={href}
                      className="text-base px-4 hover:font-bold"
                    >
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
    </>
  );
};

export default Navbar;
