import { useCallback, useEffect } from "react";
import { FetchPokemonDetails, FetchPokemonSpecies } from "../api/api";
import type { FetchPokemonSpeciesResponse } from "../api/types";
import { getPokemonIdFromUrl } from "../utils";
import { usePokemonDetails } from "./usePokemonDetails";
import { useSearchResults } from "./useSearchResults";

const speciesCache = new Map<number, FetchPokemonSpeciesResponse>();

type pokemonSpeciesContextType = {
  pokemonSpecies: (id: number) => FetchPokemonSpeciesResponse | null;
  setPokemonSpecies: (species: FetchPokemonSpeciesResponse) => void;
};

export const usePokemonSpecies = (): pokemonSpeciesContextType => {
  const { results } = useSearchResults();
  const { pokemonDetails, setPokemonDetails } = usePokemonDetails();

  const pokemonSpecies = useCallback(
    (id: number): FetchPokemonSpeciesResponse | null => {
      return speciesCache.get(id) ?? null;
    },
    [],
  );

  const setPokemonSpecies = useCallback(
    (species: FetchPokemonSpeciesResponse): void => {
      speciesCache.set(species.id, species);
    },
    [],
  );

  useEffect(() => {
    const prefetchSpecies = async (): Promise<void> => {
      if (results == null) {
        return;
      }

      for (let i = 0; i < results.length; i++) {
        const entry = results[i];
        const pokemonId = getPokemonIdFromUrl(entry.url);
        let details = pokemonDetails(pokemonId);
        if (details == null) {
          details = await FetchPokemonDetails(entry.url);
          setPokemonDetails(details);
        }

        const speciesId = getPokemonIdFromUrl(details.species.url);
        let species = pokemonSpecies(speciesId);
        if (species == null) {
          species = await FetchPokemonSpecies(details.species.url);
          setPokemonSpecies(species);
        }
      }
    };

    void prefetchSpecies();
  }, [
    results,
    pokemonDetails,
    setPokemonDetails,
    pokemonSpecies,
    setPokemonSpecies,
  ]);

  return { pokemonSpecies, setPokemonSpecies };
};
