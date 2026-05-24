import React, { useEffect, useState } from "react";
import { useSearchResults } from "../../../hooks/useSearchResults";
import { usePagination, usePokemonDetails, usePokemonTypes } from "../../../hooks";
import { FetchPokemonDetails, FetchPokemonType } from "../../../api/api";
import {
  getPokemonIdFromUrl,
  getPokemonTypeFromUrl,
  toPokemonSummary,
} from "../../../utils";
import {
  PokemonSummaryCard,
  PokemonSummaryCardSkeleton,
  PokemonSummaryCardTransition,
} from "../../PokemonSummaryCard";
import { NavLink } from "react-router";
import { SEARCH_GRID_COLS } from "../../../constants";
import type { PokemonSummary } from "./types";
import type { FetchPokemonTypeResponse } from "../../../api/types";
import { PageMain, PageFooter } from "../../layout";
import { SearchPaginator } from "./SearchPaginator";

const PokemonSummaryLink: React.FC<{ summary: PokemonSummary }> = ({ summary }) => {
  const href = `/pokemon/${summary.id}`;

  return (
    <NavLink
      to={href}
      viewTransition
      className={({ isTransitioning }) =>
        [
          "block",
          "h-full",
          "min-h-0",
          isTransitioning ? "transitioning" : "",
        ].join(" ")
      }
    >
      <PokemonSummaryCardTransition>
        <PokemonSummaryCard summary={summary} />
      </PokemonSummaryCardTransition>
    </NavLink>
  );
};

export const SearchResultsPage: React.FC = () => {
  const { pokemonType } = usePokemonTypes();
  const { pokemonDetails, setPokemonDetails } = usePokemonDetails();
  const { results } = useSearchResults();
  const { pageIndex, setPageIndex, resultsPerPage } = usePagination();
  const [summaries, setSummaries] = useState<PokemonSummary[]>([]);

  useEffect(() => {
    let cancelled = false;

    const loadSummaries = async (pageIndex: number): Promise<void> => {
      if (results == null) {
        return;
      }
      const mappedSummaries: PokemonSummary[] = [];

      const fetchRow = async (startIndex: number): Promise<void> => {
        for (let i = startIndex; i < startIndex + SEARCH_GRID_COLS; i++) {
          if (i >= results.length) {
            break;
          }

          const entry = results[i];
          const id = getPokemonIdFromUrl(entry.url);
          let pokemon = pokemonDetails(id);
          if (pokemon == null) {
            pokemon = await FetchPokemonDetails(entry.url);
            if (pokemon == null) {
              continue;
            }
            setPokemonDetails(pokemon);
          }

          const types = (
            await Promise.all(
              pokemon.types.map(async (slot) => {
                const type = getPokemonTypeFromUrl(slot.type.url);
                if (type == null) {
                  return null;
                }
                let typeResponse = pokemonType(type);

                if (typeResponse == null) {
                  typeResponse = await FetchPokemonType(slot.type.url);
                }
                return typeResponse;
              }),
            )
          ).filter((t): t is FetchPokemonTypeResponse => t != null);

          if (types.length === 0) {
            continue;
          }

          mappedSummaries.push(toPokemonSummary(pokemon, types));
        }
      };

      const start = resultsPerPage * (pageIndex - 1);
      const end = Math.min(results.length, resultsPerPage * pageIndex);

      for (let i = start; i < end; i += SEARCH_GRID_COLS) {
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
      <PageMain>
        <article
          key={pageIndex}
          className={[
            "opacity-100",
            "starting:opacity-25",
            "transition-opacity",
            "duration-200",
            "ease-in",
          ].join(" ")}
        >
          <h2 className="ml-12 text-black/75">Results: {results?.length}</h2>
          <div
            className={[
              "grid",
              "grid-cols-(--search-grid-cols)",
              "md:grid-cols-(--search-grid-cols-md)",
              "lg:grid-cols-(--search-grid-cols-lg)",
              "gap-14",
            ].join(" ")}
          >
            {displaySummaries.map((summary) => (
              <PokemonSummaryLink
                key={`pokemon-summary-${summary.id}`}
                summary={summary}
              />
            ))}
            {Array.from({ length: skeletonCount }, (_, index) => (
              <PokemonSummaryCardSkeleton
                key={`skeleton-${displaySummaries.length + index}`}
              />
            ))}
          </div>
        </article>
      </PageMain>
      <PageFooter>
        <SearchPaginator
          index={pageIndex}
          results={results?.length ?? 0}
          resultsPerPage={resultsPerPage}
          setPageIndex={setPageIndex}
        />
      </PageFooter>
    </>
  );
};

export default SearchResultsPage;
