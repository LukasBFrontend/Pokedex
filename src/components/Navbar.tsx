import React, { useState } from "react";
import { Search } from "@mui/icons-material";
import { useSearchParams } from "react-router";
import { SearchPaginator } from "./pages/SearchPage/SearchPaginator";
import { usePagination } from "../hooks/usePagination";

type Props = {
  resultsCount?: number;
};

export const Navbar: React.FC<Props> = ({ resultsCount }) => {
  const { pageIndex, setPageIndex, resultsPerPage } = usePagination();
  const [
    searchInput,
    setSearchInput,
  ] = useState<string>("");
  const [
    ,
    setSearchParams,
  ] = useSearchParams();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setSearchInput(e.currentTarget.value);
  };

  const handleSubmit = (e: React.FormEvent): void => {
    e.preventDefault();
    setSearchParams((prev) => {
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
      <SearchPaginator
        index={pageIndex}
        results={resultsCount ?? 0}
        resultsPerPage={resultsPerPage}
        setPageIndex={setPageIndex}
      />
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
