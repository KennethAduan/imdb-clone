"use client";

import Link from "next/link";
import Image from "next/image";
import { FOOTER_DETAILS, ROUTES } from "@/constants";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="mt-auto w-full border-t bg-background">
      <div className="mx-auto w-full max-w-screen-xl p-4 py-6 lg:py-8">
        <div className="md:flex md:justify-between">
          {/* Logo and Description Section */}
          <div className="mb-6 md:mb-0 max-w-sm">
            <Link href={ROUTES.HOME} className="flex items-center">
              <Image
                src={FOOTER_DETAILS.LOGO}
                alt="Moviesflix logo"
                width={130}
                height={130}
                className="mb-4"
              />
            </Link>
            <p className="text-sm text-muted-foreground">
              {FOOTER_DETAILS.DESCRIPTION}
            </p>
          </div>

          {/* Links Sections */}
          <div className="grid grid-cols-2 gap-8 sm:gap-6 sm:grid-cols-3">
            {FOOTER_DETAILS.SECTIONS.map((section) => (
              <div key={section.title}>
                <h2 className="mb-6 text-sm font-semibold uppercase">
                  {section.title}
                </h2>
                <ul className="font-medium space-y-4">
                  {section.links.map((link) => (
                    <li key={link.label}>
                      <Link
                        href={link.href}
                        className="text-sm text-muted-foreground hover:underline"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Section with Copyright and Social Links */}
        <hr className="my-6 border-muted sm:mx-auto lg:my-8" />
        <div className="sm:flex sm:items-center sm:justify-between">
          <span className="text-sm text-muted-foreground sm:text-center">
            © {currentYear}{" "}
            <Link href={ROUTES.HOME} className="hover:underline">
              {FOOTER_DETAILS.COPYRIGHT}
            </Link>
            . All Rights Reserved.
          </span>

          {/* Social Media Links */}
          <div className="flex mt-4 space-x-5 sm:justify-center sm:mt-0">
            {FOOTER_DETAILS.SOCIAL_LINKS.map((social) => (
              <Link
                key={social.name}
                href={social.href}
                className="text-muted-foreground hover:text-foreground"
                aria-label={`Visit our ${social.name} page`}
              >
                <social.icon className="w-4 h-4" />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
