"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { github } from "../utils/icons";
import ThemeDropdown from "./theme-dropdown/ThemeDropdown";
import SearchDialog from "./search-dialog/SearchDialog";
import Image from "next/image";
import { Menu, X } from "lucide-react";

const NavBar = () => {
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <div className="relative">
      {/* Main navbar - always visible */}
      <div className="flex w-full items-center justify-between py-4">
        {/* Logo and Title */}
        <div className="flex items-center gap-2">
          <Image
            src="/logo.png"
            alt="Weather Grid"
            width={100}
            height={100}
            quality={100}
            className="h-8 w-8"
          />
          <p className="text-xl font-bold sm:text-2xl">Weather Grid</p>
        </div>

        {/* Mobile/Tablet Menu Button - visible on mobile and tablet */}
        <Button
          variant="ghost"
          size="icon"
          onClick={toggleMenu}
          className="h-10 w-10 lg:hidden"
        >
          {isMenuOpen ? (
            <X className="h-8 w-8" />
          ) : (
            <Menu className="h-8 w-8" />
          )}
        </Button>

        {/* Desktop Controls - only visible on large screens */}
        <div className="hidden items-center space-x-2 lg:flex">
          <SearchDialog />
          <ThemeDropdown />
          <Button
            variant="outline"
            className="source-code flex h-9 items-center px-3"
            onClick={() =>
              router.push("https://github.com/akosikhada/weather-grid")
            }
            title="Source Code"
          >
            {github} Source Code
          </Button>
        </div>
      </div>

      {/* Mobile/Tablet Menu - conditionally rendered */}
      {isMenuOpen && (
        <div className="bg-background top-[72px] left-0 z-50 w-full border-t-2 p-4 shadow-md lg:hidden">
          <div className="flex flex-col space-y-3">
            <SearchDialog />
            <ThemeDropdown />
            <Button
              variant="outline"
              className="source-code flex h-10 w-full items-center justify-center px-3"
              onClick={() =>
                router.push("https://github.com/akosikhada/weather-grid")
              }
            >
              {github} Source Code
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default NavBar;
