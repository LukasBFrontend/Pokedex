import type { FetchPokemonDetailsResponse } from "./api/types";

const detailsCache = new Map<number, FetchPokemonDetailsResponse>();

export const getPokemonIdFromUrl = (url: string): number => {
  const match = /\/(\d+)\/?$/.exec(url);
  if (match == null) {
    throw new Error(`Invalid pokemon URL: ${url}`);
  }
  return Number(match[1]);
};

export const getCachedPokemonDetails = (
  id: number,
): FetchPokemonDetailsResponse | null => {
  return detailsCache.get(id) ?? null;
};

export const cachePokemonDetails = (
  pokemonDetails: FetchPokemonDetailsResponse,
): void => {
  detailsCache.set(pokemonDetails.id, pokemonDetails);
};
