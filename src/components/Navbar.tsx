import React, { useCallback, useEffect, useRef, useState } from "react";
import { Search } from "@mui/icons-material";
import { SearchPaginator } from "./pages/search_results";
import { usePagination, useIndexSearchParams } from "../hooks";
import { useSearchResults } from "../hooks/useSearchResults";

const SEARCH_DEBOUNCE_MS = 300;

export const Navbar: React.FC = () => {
  const { pageIndex, setPageIndex, resultsPerPage } = usePagination();
  const { count } = useSearchResults();
  const [
    searchInput,
    setSearchInput,
  ] = useState<string>("");
  const [, setIndexSearchParams, isIndexRoute] = useIndexSearchParams();
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

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

  return (
    <nav
      className={[
        "h-full",
        "py-6",
        "flex",
        "items-center",
        "gap-5",
      ].join(" ")}
    >
      {isIndexRoute && (
        <SearchPaginator
          index={pageIndex}
          results={count ?? 0}
          resultsPerPage={resultsPerPage}
          setPageIndex={setPageIndex}
        />
      )}
      <form
        className={[
          "h-full",
          "px-6",
          "pt-3",
          "pb-4",
          "rounded-full",
          "bg-white/90",
          "hover:bg-white",
        ].join(" ")}
        onSubmit={handleSubmit}
      >
        <input
          placeholder="Search for a pokemon..."
          className="h-full w-100 focus:outline-0"
          type="search"
          onChange={handleInputChange}
        />
        <button type="submit">
          <Search />
        </button>
      </form>
    </nav>
  );
};
