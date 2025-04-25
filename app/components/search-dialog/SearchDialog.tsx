"use client";

import {
  useGlobalContext,
  useGlobalContextUpdate,
} from "@/app/context/global-context";
import { commandIcon } from "@/app/utils/icons";
import DefaultStates from "@/app/utils/default-states";
import { Button } from "@/components/ui/button";
import { Command, CommandInput } from "@/components/ui/command";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Search } from "lucide-react";
import React, { useState, useEffect } from "react";

const SearchDialog = () => {
  const { locationSearchData, isLoading } = useGlobalContext();
  const { fetchLocationSearchData, setActiveCityCoords, fetchAllData } =
    useGlobalContextUpdate();
  const [searchQuery, setSearchQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  // Debounce search to avoid making too many API calls
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (searchQuery.trim().length > 2) {
        fetchLocationSearchData(searchQuery);
      }
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [searchQuery, fetchLocationSearchData]);

  const handleSelect = (item: {
    name: string;
    state: string;
    country: string;
    lat: number;
    lon: number;
  }) => {
    setActiveCityCoords(item.lat, item.lon);
    fetchAllData();
    setIsOpen(false);
    setSearchQuery("");
  };

  // Determine which locations to display
  const displayLocations =
    searchQuery.trim().length > 0 ? locationSearchData : DefaultStates;

  return (
    <div className="search-btn">
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger asChild>
          <Button
            variant="outline"
            className="inline-flex h-10 w-full items-center justify-between px-3 duration-200 ease-in-out hover:bg-slate-100 hover:dark:bg-[#131313]"
            onClick={() => setIsOpen(true)}
          >
            <div className="flex items-center">
              <Search className="mr-2 h-4 w-4" />
              <p className="text-muted-foreground text-sm">Search Here...</p>
            </div>
            <div className="command ml-0 flex items-center gap-2 rounded-sm bg-slate-200 py-[2px] pr-[7px] pl-[5px] sm:ml-[10rem] dark:bg-[#262626]">
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
            <CommandInput
              placeholder="Search locations..."
              value={searchQuery}
              onValueChange={setSearchQuery}
            />
            <ul className="px-3 pb-2">
              <p className="text-muted-foreground p-2 text-sm">
                {searchQuery.length === 0
                  ? "Suggested locations"
                  : searchQuery.length < 3
                    ? "Type at least 3 characters to search"
                    : isLoading.locationSearch
                      ? "Searching..."
                      : "Search results"}
              </p>

              {searchQuery.length >= 3 &&
                !isLoading.locationSearch &&
                locationSearchData.length === 0 && (
                  <p className="text-muted-foreground p-2 text-sm">
                    No locations found
                  </p>
                )}

              {displayLocations.map(
                (
                  item: {
                    name: string;
                    state: string;
                    country: string;
                    lat: number;
                    lon: number;
                  },
                  index: number,
                ) => {
                  const { name, state, country } = item;
                  return (
                    <li
                      key={index}
                      className="cursor-pointer rounded px-2 py-3 text-sm hover:bg-slate-100 dark:hover:bg-gray-800"
                      onClick={() => handleSelect(item)}
                    >
                      <p className="text-sm">
                        {name}
                        {state ? `, ${state}` : ""}
                        {country ? `, ${country}` : ""}
                      </p>
                    </li>
                  );
                },
              )}
            </ul>
          </Command>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default SearchDialog;
