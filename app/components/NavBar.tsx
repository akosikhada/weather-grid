"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import React from "react";
import { github } from "../utils/icons";
import ThemeDropdown from "./theme-dropdown/ThemeDropdown";
import SearchDialog from "./search-dialog/SearchDialog";
import { useGlobalContext } from "../context/global-context";

const NavBar = () => {
  const router = useRouter();
  const { state } = useGlobalContext();

  return (
    <div className="flex w-full items-center justify-between py-4">
      <div className="left"></div>
      <div className="search-container flex w-full shrink-0 gap-2 sm:w-fit">
        <SearchDialog />
        <div className="btn-group flex items-center gap-2"></div>
        <ThemeDropdown />
        <Button
          className="source-code flex cursor-pointer items-center gap-2"
          onClick={() =>
            router.push("https://github.com/akosikhada/weather-grid")
          }
        >
          {github} Source Code
        </Button>
      </div>
    </div>
  );
};

export default NavBar;
