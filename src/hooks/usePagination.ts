import { useCallback, useEffect, type Dispatch, type SetStateAction } from "react";
import { parsePageIndex, parseResultsPerPage } from "../utils";
import { useIndexSearchParams } from "./useIndexSearchParams";
import { RESULTS_PER_PAGE } from "../constants";

type PaginationContextType = {
  pageIndex: number;
  setPageIndex: Dispatch<SetStateAction<number>>;
  resultsPerPage: number;
  setResultsPerPage: Dispatch<SetStateAction<number>>;
};

export const usePagination = (): PaginationContextType => {
  const [searchParams, setIndexSearchParams, isIndexRoute] = useIndexSearchParams();

  const pageIndex = parsePageIndex(searchParams);
  const resultsPerPage = parseResultsPerPage(searchParams);

  useEffect(() => {
    if (!isIndexRoute) {
      return;
    }
    setIndexSearchParams((prev) => {
      if (prev.get("index") != null) {
        return prev;
      }
      const next = new URLSearchParams(prev);
      next.set("index", "1");

      if (next.get("results") == null) {
        next.set("results", RESULTS_PER_PAGE.toString());
      }
      return next;
    });
  }, [isIndexRoute, setIndexSearchParams]);

  const setPageIndex = useCallback<Dispatch<SetStateAction<number>>>(
    (value) => {
      setIndexSearchParams((prev) => {
        const next = new URLSearchParams(prev);
        const current = parsePageIndex(prev);
        const index = typeof value === "function" ? value(current) : value;
        next.set("index", index.toString());
        return next;
      });
    },
    [setIndexSearchParams],
  );

  const setResultsPerPage = useCallback<Dispatch<SetStateAction<number>>>(
    (value) => {
      setIndexSearchParams((prev) => {
        const next = new URLSearchParams(prev);
        const current = parseResultsPerPage(prev);
        const perPage = typeof value === "function" ? value(current) : value;
        next.set("results", perPage.toString());
        return next;
      });
    },
    [setIndexSearchParams],
  );

  return {
    pageIndex,
    setPageIndex,
    resultsPerPage,
    setResultsPerPage,
  };
};
