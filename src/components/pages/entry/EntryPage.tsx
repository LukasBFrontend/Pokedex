import { Link, useParams } from "react-router";
import { useEffect, useState } from "react";
import { usePokemonDetails, usePokemonSpecies, usePokemonTypes } from "../../../hooks";
import {
  PokemonSummaryCard,
  PokemonSummaryCardSkeleton,
  PokemonSummaryCardTransition,
} from "../../PokemonSummaryCard";
import {
  clearEntryViewTransition,
  markEntryViewTransition,
} from "../../../utils/viewTransitionBack";
import {
  FetchPokemonDetails,
  FetchPokemonSpecies,
  FetchPokemonType,
} from "../../../api/api";
import {
  getEnglishDescription,
  getPokemonTypeFromUrl,
  summaryFromCache,
} from "../../../utils";
import type {
  FetchPokemonDetailsResponse,
  FetchPokemonSpeciesResponse,
  FetchPokemonTypeResponse,
} from "../../../api/types";
import type { PokemonMetaData } from "./types";
import type { PokemonSummary } from "../search_results/types";
import { API_BASE_URL } from "../../../constants";
import { ArrowBack, ArrowForward, ArrowLeft, ArrowRight } from "@mui/icons-material";

const formatMetaData = (
  pokemon: FetchPokemonDetailsResponse,
  types: FetchPokemonTypeResponse[],
  species: FetchPokemonSpeciesResponse,
): PokemonMetaData => ({
  id: pokemon.id,
  name: pokemon.name,
  artworkURL: pokemon.sprites.other["official-artwork"].front_default,
  typeNameURLs: types.map(
    (type) => type?.sprites["generation-viii"]["sword-shield"].name_icon,
  ),
  description: getEnglishDescription(species),
});

const EntryPage: React.FC = () => {
  const { id } = useParams();
  const { pokemonType } = usePokemonTypes();
  const { pokemonDetails, setPokemonDetails } = usePokemonDetails();
  const { pokemonSpecies, setPokemonSpecies } = usePokemonSpecies();

  const [pokemonMeta, setPokemonMeta] = useState<PokemonMetaData>();

  useEffect(() => {
    markEntryViewTransition();
    window.scrollTo(0, 0);
    return clearEntryViewTransition;
  }, []);

  const pokemonId = id != null ? Number(id) : NaN;
  const cachedPokemon = !Number.isNaN(pokemonId) ? pokemonDetails(pokemonId) : null;
  const cachedSummary: PokemonSummary | null = summaryFromCache(
    cachedPokemon,
    pokemonType,
  );

  useEffect(() => {
    let cancelled = false;

    const loadMetaData = async (): Promise<void> => {
      if (id == null) {
        return;
      }

      const pokemonId = Number(id);
      if (Number.isNaN(pokemonId)) {
        return;
      }

      const pokemonUrl = `${API_BASE_URL}pokemon/${pokemonId}/`;
      let pokemon = pokemonDetails(pokemonId);
      if (pokemon == null) {
        pokemon = await FetchPokemonDetails(pokemonUrl);
        setPokemonDetails(pokemon);
      }

      if (cancelled) {
        return;
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

      if (cancelled) {
        return;
      }

      let species = pokemonSpecies(pokemonId);
      if (species == null) {
        species = await FetchPokemonSpecies(pokemon.species.url);
        setPokemonSpecies(species);
      }

      if (cancelled) {
        return;
      }

      setPokemonMeta(
        formatMetaData(pokemon, types as FetchPokemonTypeResponse[], species),
      );
    };

    void loadMetaData();

    return (): void => {
      cancelled = true;
    };
  }, [
    id,
    pokemonDetails,
    setPokemonDetails,
    pokemonSpecies,
    setPokemonSpecies,
    pokemonType,
  ]);

  const cardSummary: PokemonSummary | null = pokemonMeta ?? cachedSummary;

  return (
    <>
      <div className="entry-pokemon-card">
        <PokemonSummaryCardTransition className="w-full">
          {cardSummary != null ? (
            <PokemonSummaryCard
              summary={cardSummary}
              titleVariant="lg"
            />
          ) : (
            <PokemonSummaryCardSkeleton titleVariant="lg" />
          )}
        </PokemonSummaryCardTransition>
      </div>
      <div className="w-full my-8 flex justify-between">
        <Link
          className="tw-flex tw-items-center"
          to={pokemonMeta ? `/pokemon/${pokemonMeta.id - 1}` : ""}
          viewTransition
        >
          <ArrowLeft /> Back
        </Link>
        <Link
          className="tw-flex tw-items-center"
          to={pokemonMeta ? `/pokemon/${pokemonMeta.id + 1}` : ""}
          viewTransition
        >
          Next <ArrowRight />{" "}
        </Link>
      </div>

      <hr className="my-8 text-secondary" />
      <div className="px-8">
        {pokemonMeta != null && (
          <blockquote className="text-2xl">
            <i>{pokemonMeta.description}</i>
          </blockquote>
        )}
        <hr className="my-8 text-transparent" />
        <section>
          <h3>Weaknesses</h3>
        </section>
        <hr className="my-8 text-transparent" />
        <section>
          <h3>Resistances</h3>
        </section>
      </div>
    </>
  );
};

export default EntryPage;
