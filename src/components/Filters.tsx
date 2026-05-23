import React, { useCallback, useEffect, useRef, useState } from "react";
import { Search } from "@mui/icons-material";
import { useIndexSearchParams, useMediaQuery } from "../hooks";
import { SEARCH_DEBOUNCE_MS } from "../constants";
import { Button, SearchBar } from "./particles";
import { FilterOverlay } from "./FilterOverlay";

export const Filters: React.FC = () => {
  const [
    searchInput,
    setSearchInput,
  ] = useState<string>("");
  const [, setIndexSearchParams] = useIndexSearchParams();
  const [overlayActive, setOverlayActive] = useState(false);
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
      <form
        className={[
          "h-full",
          "relative",
          "flex",
          "items-center",
        ].join(" ")}
        onSubmit={handleSubmit}
      >
        <button
          type="button"
          aria-label="Search"
          className={[
            "size-11",
            "rounded-full",
            "bg-white/90",
            "flex",
            "items-center",
            "justify-center",
            "hover:bg-white",
          ].join(" ")}
          onClick={() => setOverlayActive(true)}
        >
          <Search
            className={[
              "absolute",
              "mb-0.5",
            ].join(" ")}
          />
        </button>
        <FilterOverlay active={overlayActive}>
          <div className="absolute -bottom-2 right-0 w-full flex justify-center">
            <Button
              variant="alt"
              onClick={() => setOverlayActive(false)}
            >
              Close
            </Button>
          </div>
          <SearchBar
            className="w-full max-h-12"
            onChange={handleInputChange}
          />
        </FilterOverlay>
      </form>
    );
  }

  return (
    <form onSubmit={handleSubmit}>
      <SearchBar onChange={handleInputChange} />
    </form>
  );
};
