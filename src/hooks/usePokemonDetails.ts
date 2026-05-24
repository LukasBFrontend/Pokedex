import { useCallback, useEffect } from "react";
import { useSearchResults } from "./useSearchResults";
import { getPokemonIdFromUrl } from "../utils";
import { FetchPokemonDetails } from "../api/api";
import type { FetchPokemonDetailsResponse } from "../api/types";

const detailsCache = new Map<number, FetchPokemonDetailsResponse>();

type PokemonDetailsContextType = {
  pokemonDetails: (id: number) => FetchPokemonDetailsResponse | null;
  setPokemonDetails: (details: FetchPokemonDetailsResponse) => void;
};

export const usePokemonDetails = (): PokemonDetailsContextType => {
  const { results } = useSearchResults();
  const pokemonDetails = useCallback(
    (id: number): FetchPokemonDetailsResponse | null => {
      return detailsCache.get(id) ?? null;
    },
    [],
  );

  const setPokemonDetails = useCallback(
    (details: FetchPokemonDetailsResponse): void => {
      detailsCache.set(details.id, details);
    },
    [],
  );

  useEffect(() => {
    const prefetchDetails = async (): Promise<void> => {
      if (results == null) {
        return;
      }

      for (let i = 0; i < results.length; i++) {
        const entry = results[i];
        const id = getPokemonIdFromUrl(entry.url);
        let pokemon = pokemonDetails(id);
        if (pokemon == null) {
          pokemon = await FetchPokemonDetails(entry.url);
          if (pokemon != null) {
            setPokemonDetails(pokemon);
          }
        }
      }
    };

    void prefetchDetails();
  }, [results, pokemonDetails, setPokemonDetails]);

  return { pokemonDetails, setPokemonDetails };
};
