import { RESULTS_PER_PAGE_FALLBACK } from "./constants";

export const getPokemonIdFromUrl = (url: string): number => {
  const match = /\/(\d+)\/?$/.exec(url);
  if (match == null) {
    throw new Error(`Invalid pokemon URL: ${url}`);
  }
  return Number(match[1]);
};

export const parsePageIndex = (params: URLSearchParams): number => {
  return Number(params.get("index")) || 1;
};

export const parseResultsPerPage = (params: URLSearchParams): number => {
  return Number(params.get("results")) || RESULTS_PER_PAGE_FALLBACK;
};
