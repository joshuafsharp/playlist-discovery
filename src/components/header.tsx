"use client";

import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import { useState } from "react";
import LoginButton from "./login-button";

export const Header = () => {
  const [expanded, setExpanded] = useState(false);

  return (
    <header className="bg-black py-4 sm:py-6">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          <div className="shrink-0">
            <a href="#" title="" className="flex">
              <Image
                src="https://landingfoliocom.imgix.net/store/collection/dusk/images/logo.svg"
                alt=""
                height="44"
                width="120"
              />
            </a>
          </div>

          {/* Mobile nav show/hide button */}
          <div className="flex md:hidden">
            <button
              type="button"
              className="text-white"
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
            <a
              href="#"
              title=""
              className="text-base font-normal text-gray-400 transition-all duration-200 hover:text-white"
            >
              Discover
            </a>

            <a
              href="#"
              title=""
              className="text-base font-normal text-gray-400 transition-all duration-200 hover:text-white"
            >
              Library
            </a>

            <a
              href="#"
              title=""
              className="text-base font-normal text-gray-400 transition-all duration-200 hover:text-white"
            >
              Support
            </a>
          </nav>

          <div className="group relative hidden md:inline-flex md:items-center md:justify-center">
            <LoginButton />
          </div>
        </div>

        {/* Mobile nav */}
        {expanded && (
          <nav>
            <div className="flex flex-col space-y-6 pt-8 pb-4">
              <a
                href="#"
                title=""
                className="text-base font-normal text-gray-400 transition-all duration-200 hover:text-white"
              >
                Discover
              </a>

              <a
                href="#"
                title=""
                className="text-base font-normal text-gray-400 transition-all duration-200 hover:text-white"
              >
                Library
              </a>

              <a
                href="#"
                title=""
                className="text-base font-normal text-gray-400 transition-all duration-200 hover:text-white"
              >
                Support
              </a>

              <div className="group relative inline-flex items-center justify-center">
                <LoginButton />
              </div>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
};
