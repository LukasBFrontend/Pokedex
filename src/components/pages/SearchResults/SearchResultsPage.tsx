import React, { useEffect, useState } from "react";
import { useSearchResults } from "../../../hooks/useSearchResults";
import { FetchPokemonDetails } from "../../../api/api";
import { getPokemonIdFromUrl } from "../../../utils";
import { SearchResultCard, SearchResultCardSkeleton } from "./SearchResultCard";
import { usePagination } from "../../../hooks/usePagination";
import { usePokemonDetails } from "../../../hooks/usePokemonDetails";
import type { PokemonSummary } from "./types";
import type { FetchPokemonTypeResponse } from "../../../api/types";

const ROW_SIZE = 3;

const toPokemonSummary = (pokemon: FetchPokemonTypeResponse): PokemonSummary => ({
  id: pokemon.id,
  name: pokemon.name,
  types: pokemon.types,
  artworkURL: pokemon.sprites.other["official-artwork"].front_default,
});

export const SearchResultsPage: React.FC = () => {
  const { pokemonDetails, setPokemonDetails } = usePokemonDetails();
  const { results } = useSearchResults();
  const { pageIndex, resultsPerPage } = usePagination();
  const [summaries, setSummaries] = useState<PokemonSummary[]>([]);

  useEffect(() => {
    let cancelled = false;

    const loadSummaries = async (pageIndex: number): Promise<void> => {
      if (results == null) {
        return;
      }
      const mappedSummaries: PokemonSummary[] = [];

      const fetchRow = async (startIndex: number): Promise<void> => {
        for (let i = startIndex; i < startIndex + ROW_SIZE; i++) {
          if (i >= results.length) {
            break;
          }

          const entry = results[i];
          const id = getPokemonIdFromUrl(entry.url);
          let pokemon = pokemonDetails(id);
          if (pokemon == null) {
            pokemon = await FetchPokemonDetails(entry.url);
            setPokemonDetails(pokemon);
          }

          mappedSummaries.push(toPokemonSummary(pokemon));
        }
      };

      const start = resultsPerPage * (pageIndex - 1);
      const end = Math.min(results.length, resultsPerPage * pageIndex);

      for (let i = start; i < end; i += ROW_SIZE) {
        if (cancelled) {
          return;
        }

        await fetchRow(i);

        if (!cancelled) {
          setSummaries([...mappedSummaries]);
        }
      }
    };

    void loadSummaries(pageIndex);

    return (): void => {
      cancelled = true;
    };
  }, [
    resultsPerPage,
    results,
    pageIndex,
    pokemonDetails,
    setPokemonDetails,
  ]);

  const displaySummaries = results ? summaries : [];
  const pageResultCount = results
    ? Math.min(results.length, resultsPerPage * pageIndex) -
      resultsPerPage * (pageIndex - 1)
    : 0;
  const skeletonCount = Math.max(0, pageResultCount - displaySummaries.length);

  return (
    <>
      <h2 className="ml-12">Results: {results?.length}</h2>
      {/* Grid */}
      <div className="grid grid-cols-3 auto-rows-[35rem] gap-14">
        {displaySummaries.map((summary) => (
          <SearchResultCard summary={summary} />
        ))}
        {Array.from({ length: skeletonCount }, (_, index) => (
          <SearchResultCardSkeleton
            key={`skeleton-${displaySummaries.length + index}`}
          />
        ))}
      </div>
    </>
  );
};

export default SearchResultsPage;
