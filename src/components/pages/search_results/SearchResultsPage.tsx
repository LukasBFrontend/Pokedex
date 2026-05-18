import React, { useEffect, useState } from "react";
import { useSearchResults } from "../../../hooks/useSearchResults";
import { FetchPokemonDetails, FetchPokemonType } from "../../../api/api";
import { getPokemonIdFromUrl, getPokemonTypeFromUrl } from "../../../utils";
import { PokemonSummaryCard, PokemonSummaryCardSkeleton } from "./PokemonSummaryCard";
import { usePagination } from "../../../hooks/usePagination";
import { usePokemonDetails } from "../../../hooks/usePokemonDetails";
import type { PokemonSummary } from "./types";
import type {
  FetchPokemonDetailsResponse,
  FetchPokemonTypeResponse,
} from "../../../api/types";
import { usePokemonTypes } from "../../../hooks/usePokemonTypes";
import { useParams } from "react-router";

const ROW_SIZE = 3;

const toPokemonSummary = (
  pokemon: FetchPokemonDetailsResponse,
  types: FetchPokemonTypeResponse[],
): PokemonSummary => ({
  id: pokemon.id,
  name: pokemon.name,
  artworkURL: pokemon.sprites.other["official-artwork"].front_default,
  typeNameURLs: types.map(
    (type) => type?.sprites["generation-viii"]["sword-shield"].name_icon,
  ),
});

export const SearchResultsPage: React.FC = () => {
  const { pokemonType } = usePokemonTypes();
  const { pokemonDetails, setPokemonDetails } = usePokemonDetails();
  const { results } = useSearchResults();
  const { pageIndex, resultsPerPage } = usePagination();
  const [summaries, setSummaries] = useState<PokemonSummary[]>([]);

  useEffect(() => {
    if (q != null) {
      alert(q.va);
    }
  }, [q]);

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

          const types = await Promise.all(
            pokemon.types.map(async (slot) => {
              const type = getPokemonTypeFromUrl(slot.type.url);
              let typeResponse = pokemonType(type);

              if (typeResponse == null) {
                typeResponse = await FetchPokemonType(slot.type.url);
              }
              return typeResponse;
            }),
          );

          mappedSummaries.push(toPokemonSummary(pokemon, types));
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
    pokemonType,
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
          <PokemonSummaryCard
            key={summary.name}
            summary={summary}
          />
        ))}
        {Array.from({ length: skeletonCount }, (_, index) => (
          <PokemonSummaryCardSkeleton
            key={`skeleton-${displaySummaries.length + index}`}
          />
        ))}
      </div>
    </>
  );
};

export default SearchResultsPage;
