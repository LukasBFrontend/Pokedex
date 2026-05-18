import React, { useState } from "react";
import { Search } from "@mui/icons-material";
import { SearchPaginator } from "./pages/search_results";
import { usePagination, useIndexSearchParams } from "../hooks";
import { useSearchResults } from "../hooks/useSearchResults";

export const Navbar: React.FC = () => {
  const { pageIndex, setPageIndex, resultsPerPage } = usePagination();
  const { count } = useSearchResults();
  const [
    searchInput,
    setSearchInput,
  ] = useState<string>("");
  const [, setIndexSearchParams, isIndexRoute] = useIndexSearchParams();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setSearchInput(e.currentTarget.value);
  };

  const handleSubmit = (e: React.FormEvent): void => {
    e.preventDefault();
    setIndexSearchParams((prev) => {
      const next = new URLSearchParams(prev);
      next.set("index", "1");
      if (searchInput.trim() !== "") {
        next.set("q", searchInput);
      } else {
        next.delete("q");
      }

      return next;
    });
  };

  return (
    <nav className="flex items-center gap-5">
      {isIndexRoute && (
        <SearchPaginator
          index={pageIndex}
          results={count ?? 0}
          resultsPerPage={resultsPerPage}
          setPageIndex={setPageIndex}
        />
      )}
      <form
        className="p-4 rounded-2xl bg-white/85"
        onSubmit={handleSubmit}
      >
        <input
          className="w-100 focus:outline-0"
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
