import React, { useCallback, useEffect, useRef, useState } from "react";
import { Search } from "@mui/icons-material";
import { useIndexSearchParams, useMediaQuery } from "../hooks";
import { SEARCH_DEBOUNCE_MS } from "../constants";

export const Navbar: React.FC = () => {
  const [
    searchInput,
    setSearchInput,
  ] = useState<string>("");
  const [, setIndexSearchParams] = useIndexSearchParams();
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const isLargeDevice = useMediaQuery("(min-width: 640px)");

  const search = useCallback(
    (query: string): void => {
      setIndexSearchParams((prev) => {
        const next = new URLSearchParams(prev);
        next.set("index", "1");
        if (query.trim() !== "") {
          next.set("q", query);
        } else {
          next.delete("q");
        }

        return next;
      });
    },
    [setIndexSearchParams],
  );

  const scheduleSearch = useCallback(
    (query: string): void => {
      if (debounceRef.current !== null) {
        clearTimeout(debounceRef.current);
      }
      debounceRef.current = setTimeout(() => {
        debounceRef.current = null;
        search(query);
      }, SEARCH_DEBOUNCE_MS);
    },
    [search],
  );

  useEffect(
    () => () => {
      if (debounceRef.current !== null) {
        clearTimeout(debounceRef.current);
      }
    },
    [],
  );

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const value = e.currentTarget.value;
    setSearchInput(value);
    scheduleSearch(value);
  };

  const handleSubmit = (e: React.FormEvent): void => {
    e.preventDefault();
    if (debounceRef.current !== null) {
      clearTimeout(debounceRef.current);
      debounceRef.current = null;
    }
    search(searchInput);
  };

  if (!isLargeDevice) {
    return (
      <button
        type="button"
        aria-label="Search"
        className={[
          "h-fit",
          "px-4",
          "pt-3",
          "pb-4",
          "rounded-full",
          "bg-white/90",
          "flex",
          "items-center",
          "hover:bg-white",
        ].join(" ")}
      >
        <Search />
      </button>
    );
  }

  return (
    <form
      className={[
        "h-full",
        "px-6",
        "pt-3",
        "pb-4",
        "rounded-full",
        "bg-white/90",
        "flex",
        "hover:bg-white",
      ].join(" ")}
      onSubmit={handleSubmit}
    >
      <input
        placeholder="Search for a pokemon..."
        className="h-full max-w-100 focus:outline-0"
        type="search"
        onChange={handleInputChange}
      />
      <button type="submit">
        <Search />
      </button>
    </form>
  );
};
