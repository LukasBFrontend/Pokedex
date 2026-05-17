import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router";
import { FetchPokemons } from "../api/api";
import type { NamedApiResource } from "../api/types";

export type SearchResultsContextType = {
  results: NamedApiResource[] | null;
  count: number | null;
};

export const useSearchResults = (): SearchResultsContextType => {
  const [
    pokemon,
    setPokemon,
  ] = useState<NamedApiResource[]>();

  const [
    searchParams,
  ] = useSearchParams();

  const filteredPokemon = useMemo(() => {
    const querystring = searchParams.get("q");
    if (!pokemon) {
      return;
    } else if (!querystring || querystring == "") {
      return pokemon;
    }
    return pokemon.filter((pokemon) =>
      pokemon.name.includes(querystring.toLowerCase()),
    );
  }, [
    pokemon,
    searchParams,
  ]);

  useEffect(() => {
    if (pokemon != null) {
      return;
    }
    const prefetchPage = async (): Promise<void> => {
      const response = await FetchPokemons();
      setPokemon(response.results);
    };

    void prefetchPage();
  }, [pokemon]);
  return { results: filteredPokemon || null, count: filteredPokemon?.length || null };
};
