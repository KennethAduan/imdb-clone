"use client";
import { useState, useEffect } from "react";

import { usePathname } from "next/navigation";
import NavbarDesktop from "./navbar.desktop";
import NavbarMobile from "./navbar.mobile";

const Navbar = ({ isAuthenticated }: { isAuthenticated: boolean }) => {
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
      <NavbarDesktop
        isScrolled={isScrolled}
        pathname={pathname}
        isAuthenticated={isAuthenticated}
      />
      {/* Mobile Nav */}
      <NavbarMobile
        isAuthenticated={isAuthenticated}
        isScrolled={isScrolled}
        pathname={pathname}
      />
    </>
  );
};

export default Navbar;
