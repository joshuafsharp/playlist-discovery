"use client";

import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import LoginButton from "../../login-button.client";
import { InternalLink } from "~/common/types";

export const Header = () => {
  const [expanded, setExpanded] = useState(false);

  const navLinks: InternalLink[] = [
    {
      href: "/dashboard/discover",
      label: "Discover",
    },
    {
      href: "/dashboard/library",
      label: "Library",
    },
    {
      href: "/support",
      label: "Support",
    },
  ];

  return (
    <header className="w-full py-4 dark:bg-black sm:py-6">
      <div className="relative px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          <div className="shrink-0">
            <Link href="/" title="Home" className="flex">
              <Image
                src="https://landingfoliocom.imgix.net/store/collection/dusk/images/logo.svg"
                alt=""
                height="44"
                width="120"
              />
            </Link>
          </div>

          {/* Mobile nav show/hide button */}
          <div className="flex md:hidden">
            <button
              type="button"
              className="dark:text-white"
              onClick={() => setExpanded(!expanded)}
              aria-expanded={expanded}
            >
              {expanded ? (
                <XMarkIcon className="h-7 w-7" />
              ) : (
                <Bars3Icon className="h-7 w-7" />
              )}
            </button>
          </div>

          {/* Desktop nav */}
          <nav className="hidden space-x-10 md:flex md:items-center md:justify-center lg:space-x-12">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="text-base font-normal text-gray-400 transition-all duration-200 hover:text-white"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="group relative hidden md:inline-flex md:items-center md:justify-center">
            <LoginButton />
          </div>
        </div>

        {/* Mobile nav - TODO: Add click outside close */}
        {expanded && (
          <div className="absolute inset-x-0 top-0 z-10 mt-12 flex h-[calc(100vh-4rem)] flex-col">
            <nav className=" flex flex-col border-b border-gray-800 dark:bg-black">
              {navLinks.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className="p-4 text-base font-normal transition-all duration-200 hover:text-white dark:text-gray-400"
                >
                  {link.label}
                </Link>
              ))}

              <div className="group relative m-4 inline-flex items-center justify-center">
                <LoginButton />
              </div>
            </nav>

            <div className="flex-grow backdrop-blur-sm" />
          </div>
        )}
      </div>
    </header>
  );
};
