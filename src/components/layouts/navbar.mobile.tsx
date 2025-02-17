"use client";
import { APP_NAME, ROUTES } from "@/constants";
import { NAVBAR_DETAILS } from "@/constants";
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";

import { NavbarComponentProps } from "@/types/component";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { LogOut, Menu, UserIcon } from "lucide-react";
import { Button } from "../ui/button";
import SearchDialog from "../search.dialog";
import ToggleTheme from "../toggle.mode";
import { useAction } from "next-safe-action/hooks";
import { signOutAction } from "@/server-actions/auth.action";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

const NavbarMobile = ({ pathname, isAuthenticated }: NavbarComponentProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const { push } = useRouter();
  const { execute: signOut } = useAction(signOutAction, {
    onSuccess: ({ data }) => {
      if (data?.success) {
        push(ROUTES.HOME);
      }
    },
    onError: ({ error }) => {
      toast.error(error.serverError || "Something went wrong");
    },
  });
  return (
    <div
      data-testid="mobile-nav"
      className="lg:hidden fixed top-0 left-0 right-0 z-50 border-b border-secondary px-2  bg-white/80 dark:bg-black/90 backdrop-blur-sm"
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger className="px-2">
              <Menu
                data-testid="menu-button"
                className="flex lg:hidden"
                onClick={() => setIsOpen(true)}
              />
            </SheetTrigger>

            <SheetContent side={"left"}>
              <SheetHeader>
                <SheetTitle className="text-2xl font-bold text-primary mb-6">
                  {APP_NAME}
                </SheetTitle>
                <SheetDescription className="hidden">
                  Mobile Nav
                </SheetDescription>
              </SheetHeader>
              {/* Navigation Menu */}
              <nav className="mt-4 flex flex-col items-center justify-center gap-4">
                {NAVBAR_DETAILS.NAVLINKS_LEFT_SIDE.map(({ href, label }) => (
                  <Link
                    rel="noreferrer noopener"
                    key={label}
                    href={href}
                    onClick={() => setIsOpen(false)}
                    className={
                      pathname === href
                        ? `flex gap-y-12 text-lg cursor-pointer items-center justify-center bg-gradient-to-b from-primary/60
                            to-primary bg-clip-text pb-1.5 text-[16px] font-bold text-transparent
                            transition-all hover:font-bold`
                        : `flex gap-y-12 text-lg cursor-pointer items-center justify-center pb-1.5 text-[16px] font-[400]
                            transition-all hover:font-bold`
                    }
                  >
                    {label}
                  </Link>
                ))}
                <ToggleTheme />
              </nav>
            </SheetContent>
          </Sheet>
          <Link href={ROUTES.HOME} className="cursor-pointer">
            <Image
              src={NAVBAR_DETAILS.LOGO}
              alt="Moviesflix"
              width={120}
              height={40}
              className="w-auto h-auto"
              priority
            />
          </Link>
        </div>
        <div className="flex items-center gap-2">
          <SearchDialog data-testid="search-dialog" />
          {isAuthenticated ? (
            <div className="flex items-center">
              <Button variant={"ghost"} className="rounded-full" asChild>
                <Link href={ROUTES.PROFILE} aria-label="Profile">
                  <UserIcon className="w-6 h-6" />
                </Link>
              </Button>

              <Button
                variant={"ghost"}
                className="rounded-full"
                onClick={() => signOut()}
              >
                <LogOut className="w-6 h-6" />
              </Button>
            </div>
          ) : (
            <Button variant={"outline"} className="rounded-full" asChild>
              <Link href={ROUTES.SIGN_IN}>Sign In</Link>
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default NavbarMobile;
