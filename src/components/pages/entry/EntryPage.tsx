import { useParams } from "react-router";
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
  mergeTypeDamageRelations,
  summaryFromCache,
} from "../../../utils";
import { API_BASE_URL, type pokemonType } from "../../../constants";
import { PageArticle, PageFooter } from "../../layout";
import { EntryPageNav, EntryResistanceGroup } from ".";
import type {
  FetchPokemonDetailsResponse,
  FetchPokemonSpeciesResponse,
  FetchPokemonTypeResponse,
} from "../../../api/types";
import type { PokemonMetaData, TypeRelations } from "./types";
import type { PokemonSummary } from "../search_results/types";

const formatMetaData = (
  pokemon: FetchPokemonDetailsResponse,
  types: FetchPokemonTypeResponse[],
  damageRelations: TypeRelations,
  species: FetchPokemonSpeciesResponse,
): PokemonMetaData => ({
  id: pokemon.id,
  name: pokemon.name,
  artworkURL: pokemon.sprites.other["official-artwork"].front_default,
  typeSprites: types.map((type) => type?.sprites),
  typeRelationsSprites: damageRelations,
  description: getEnglishDescription(species),
});

const EntryPage: React.FC = () => {
  const { id } = useParams();
  const { pokemonType, setPokemonType } = usePokemonTypes();
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

      const typeByUrl = new Map<string, FetchPokemonTypeResponse>();

      const types = await Promise.all(
        pokemon.types.map(async (slot) => {
          const cached = typeByUrl.get(slot.type.url);
          if (cached != null) {
            return cached;
          }

          const type =
            getPokemonTypeFromUrl(slot.type.url) ?? (slot.type.name as pokemonType);
          let typeResponse = pokemonType(type);

          if (typeResponse == null) {
            typeResponse = await FetchPokemonType(slot.type.url);
            setPokemonType(typeResponse);
          }

          typeByUrl.set(slot.type.url, typeResponse);
          return typeResponse;
        }),
      );

      const incomingTypeUrls = new Set<string>();
      for (const defendingType of types) {
        for (const key of [
          "double_damage_from",
          "half_damage_from",
          "no_damage_from",
        ] as const) {
          for (const resource of defendingType.damage_relations[key]) {
            incomingTypeUrls.add(resource.url);
          }
        }
      }

      await Promise.all(
        [...incomingTypeUrls].map(async (url) => {
          if (typeByUrl.has(url)) {
            return;
          }
          const typeResponse = await FetchPokemonType(url);
          setPokemonType(typeResponse);
          typeByUrl.set(url, typeResponse);
        }),
      );

      const damageRelations = mergeTypeDamageRelations(
        types,
        (url) => typeByUrl.get(url) ?? null,
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

      setPokemonMeta(formatMetaData(pokemon, types, damageRelations, species));
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
    setPokemonType,
  ]);

  const cardSummary: PokemonSummary | null = pokemonMeta ?? cachedSummary;

  return (
    <>
      <PageArticle>
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
        <EntryPageNav
          enabled={Boolean(pokemonMeta)}
          prevIndex={pokemonId - 1}
          nextIndex={pokemonId + 1}
        />

        <div className="px-8">
          {pokemonMeta != null && (
            <blockquote className="text-2xl">
              <i>{pokemonMeta.description}</i>
            </blockquote>
          )}
          <hr className="my-8 text-transparent" />
          <section>
            <h3>Weaknesses</h3>
            <div className={["flex", "flex-wrap", "gap-4"].join(" ")}>
              <EntryResistanceGroup
                multiplier={2}
                sprites={pokemonMeta?.typeRelationsSprites.weakness}
              />
              <EntryResistanceGroup
                multiplier={4}
                sprites={pokemonMeta?.typeRelationsSprites.doubleWeakness}
                emphasized
              />
            </div>
          </section>
          <hr className="my-8 text-transparent" />
          <section>
            <h3>Resistances</h3>
            <div className={["flex", "flex-wrap", "gap-4"].join(" ")}>
              <EntryResistanceGroup
                multiplier={0.5}
                sprites={pokemonMeta?.typeRelationsSprites.resistance}
              />
              <EntryResistanceGroup
                multiplier={0.25}
                sprites={pokemonMeta?.typeRelationsSprites.doubleResistance}
                emphasized
              />
            </div>
          </section>
        </div>
      </PageArticle>
      <PageFooter
        className={[
          "w-full",
          "text-center",
          "text-white",
          "text-shadow-lg",
        ].join(" ")}
      >
        <span
          className={[
            "bg-black/35",
            "px-2.5",
            "py-1.5",
            "rounded-full",
          ].join(" ")}
        >
          Connected to PokéAPI
        </span>
      </PageFooter>
    </>
  );
};

export default EntryPage;
