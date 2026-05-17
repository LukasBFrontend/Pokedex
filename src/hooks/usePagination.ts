import { useCallback, useEffect, type Dispatch, type SetStateAction } from "react";
import { useSearchParams } from "react-router";

export const RESULTS_PER_PAGE = 30;

const parsePageIndex = (params: URLSearchParams): number => {
  return Number(params.get("index")) || 1;
};

const parseResultsPerPage = (params: URLSearchParams): number => {
  return Number(params.get("results")) || RESULTS_PER_PAGE;
};

type PaginationContextType = {
  pageIndex: number;
  setPageIndex: Dispatch<SetStateAction<number>>;
  resultsPerPage: number;
  setResultsPerPage: Dispatch<SetStateAction<number>>;
};

export const usePagination = (): PaginationContextType => {
  const [searchParams, setSearchParams] = useSearchParams();

  const pageIndex = parsePageIndex(searchParams);
  const resultsPerPage = parseResultsPerPage(searchParams);

  useEffect(() => {
    setSearchParams((prev) => {
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
  }, [setSearchParams]);

  const setPageIndex = useCallback<Dispatch<SetStateAction<number>>>(
    (value) => {
      setSearchParams((prev) => {
        const next = new URLSearchParams(prev);
        const current = parsePageIndex(prev);
        const index = typeof value === "function" ? value(current) : value;
        next.set("index", index.toString());
        return next;
      });
    },
    [setSearchParams],
  );

  const setResultsPerPage = useCallback<Dispatch<SetStateAction<number>>>(
    (value) => {
      setSearchParams((prev) => {
        const next = new URLSearchParams(prev);
        const current = parseResultsPerPage(prev);
        const perPage = typeof value === "function" ? value(current) : value;
        next.set("results", perPage.toString());
        return next;
      });
    },
    [setSearchParams],
  );

  return {
    pageIndex,
    setPageIndex,
    resultsPerPage,
    setResultsPerPage,
  };
};
