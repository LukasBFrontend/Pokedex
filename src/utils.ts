import type { FetchPokemonSpeciesResponse } from "./api/types";
import {
  POKEMON_TYPES,
  RESULTS_PER_PAGE_FALLBACK,
  type pokemonType,
  type typeURL,
} from "./constants";

const pokemonTypeSlugs = new Set<string>(Object.values(POKEMON_TYPES));

export const getPokemonTypeFromUrl = (url: typeURL | string): pokemonType | null => {
  const slug = url.split("/").pop();
  if (slug == null || !pokemonTypeSlugs.has(slug)) {
    return null;
  }
  return slug as pokemonType;
};

export const getPokemonIdFromUrl = (url: string): number => {
  const match = /\/(\d+)\/?$/.exec(url);
  if (match == null) {
    throw new Error(`Invalid pokemon URL: ${url}`);
  }
  return Number(match[1]);
};

export const getEnglishDescription = (species: FetchPokemonSpeciesResponse): string => {
  const englishEntries = species.flavor_text_entries.filter(
    (entry) => entry.language.name === "en",
  );
  const entry = englishEntries[englishEntries.length - 1];
  return entry?.flavor_text.replace(/\f/g, " ").replace(/\n/g, " ") ?? "";
};

export const parsePageIndex = (params: URLSearchParams): number => {
  return Number(params.get("index")) || 1;
};

export const parseResultsPerPage = (params: URLSearchParams): number => {
  return Number(params.get("results")) || RESULTS_PER_PAGE_FALLBACK;
};
