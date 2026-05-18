import { useParams } from "react-router";
import { useEffect, useState } from "react";
import {
  FetchPokemonDetails,
  FetchPokemonSpecies,
  FetchPokemonType,
} from "../../../api/api";
import type {
  FetchPokemonDetailsResponse,
  FetchPokemonSpeciesResponse,
  FetchPokemonTypeResponse,
} from "../../../api/types";
import { API_BASE_URL } from "../../../constants";
import { usePokemonDetails } from "../../../hooks/usePokemonDetails";
import { usePokemonSpecies } from "../../../hooks/usePokemonSpecies";
import { usePokemonTypes } from "../../../hooks/usePokemonTypes";
import {
  getEnglishDescription,
  getPokemonIdFromUrl,
  getPokemonTypeFromUrl,
} from "../../../utils";
import type { pokemonMetaData } from "./types";
import {
  PokemonSummaryCard,
  PokemonSummaryCardSkeleton,
} from "../search_results/PokemonSummaryCard";

type Props = {};

const formatMetaData = (
  pokemon: FetchPokemonDetailsResponse,
  types: FetchPokemonTypeResponse[],
  species: FetchPokemonSpeciesResponse,
): pokemonMetaData => ({
  id: pokemon.id,
  name: pokemon.name,
  artworkURL: pokemon.sprites.other["official-artwork"].front_default,
  typeNameURLs: types.map(
    (type) => type?.sprites["generation-viii"]["sword-shield"].name_icon,
  ),
  description: getEnglishDescription(species),
});

const Entry: React.FC<Props> = () => {
  const { id } = useParams();
  const { pokemonType } = usePokemonTypes();
  const { pokemonDetails, setPokemonDetails } = usePokemonDetails();
  const { pokemonSpecies, setPokemonSpecies } = usePokemonSpecies();

  const [pokemonMeta, setPokemonMeta] = useState<pokemonMetaData>();

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

      setPokemonMeta(formatMetaData(pokemon, types, species));
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

  return (
    <>
      {pokemonMeta == null ? (
        <PokemonSummaryCardSkeleton titleVariant="lg" />
      ) : (
        <PokemonSummaryCard
          summary={pokemonMeta}
          titleVariant="lg"
        />
      )}
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

export default Entry;
