"use client";

import { commandIcon } from "@/app/utils/icons";
import { Button } from "@/components/ui/button";
import { Command, CommandInput } from "@/components/ui/command";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import React from "react";

const SearchDialog = () => {
  return (
    <div className="search-btn">
      <Dialog>
        <DialogTrigger asChild>
          <Button
            variant="outline"
            className="inline-flex items-center justify-center border text-sm font-medium duration-200 ease-in-out hover:bg-slate-100 hover:dark:bg-[#131313]"
          >
            <p className="text-muted-foreground text-sm">Search Here...</p>
            <div className="command ml-[10rem] flex items-center gap-2 rounded-sm bg-slate-200 py-[2px] pr-[7px] pl-[5px] dark:bg-[#262626]">
              {commandIcon}
              <span className="text-[9px]">WG</span>
            </div>
          </Button>
        </DialogTrigger>

        <DialogContent className="border-0 p-1.5 outline-0">
          <DialogTitle className="sr-only">Search Weather Grid</DialogTitle>
          <DialogDescription className="sr-only">
            Search for weather locations and forecasts
          </DialogDescription>
          <Command className="rounded-lg border shadow-md">
            <CommandInput placeholder="Search..." />
            <ul className="px-3 pb-2">
              <p className="text-muted-foreground p-2 text-sm">Suggestions</p>
            </ul>
          </Command>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default SearchDialog;
