import { useCallback, useEffect } from "react";
import { FetchPokemonType } from "../api/api";
import { TYPE_URLS, type pokemonType } from "../constants";
import { getPokemonTypeFromUrl } from "../utils";
import type { FetchPokemonTypeResponse } from "../api/types";

const typeCache = new Map<pokemonType, FetchPokemonTypeResponse>();

type PokemonTypesContextType = {
  pokemonType: (type: pokemonType) => FetchPokemonTypeResponse | null;
  setPokemonType: (type: FetchPokemonTypeResponse) => void;
};

export const usePokemonTypes = (): PokemonTypesContextType => {
  const pokemonType = useCallback(
    (type: pokemonType): FetchPokemonTypeResponse | null => {
      if (type == null) {
        return null;
      }
      return typeCache.get(type) ?? null;
    },
    [],
  );

  const setPokemonType = useCallback((type: FetchPokemonTypeResponse): void => {
    typeCache.set(type.name, type);
  }, []);

  useEffect(() => {
    const prefetchTypes = async (): Promise<void> => {
      for (const url of Object.values(TYPE_URLS)) {
        const typeKey = getPokemonTypeFromUrl(url);
        if (typeKey == null) {
          continue;
        }
        let type = pokemonType(typeKey);
        if (type == null) {
          type = await FetchPokemonType(url);
          if (type != null) {
            setPokemonType(type);
          }
        }
      }
    };

    void prefetchTypes();
  }, [pokemonType, setPokemonType]);

  return { pokemonType, setPokemonType };
};
