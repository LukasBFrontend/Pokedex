import type {
  FetchPokemonDetailsResponse,
  FetchPokemonSpeciesResponse,
  FetchPokemonTypeResponse,
} from "./api/types";
import type { TypeRelations } from "./components/pages/entry/types";
import type { PokemonSummary } from "./components/pages/search_results/types";
import {
  POKEMON_TYPES,
  RESULTS_PER_PAGE,
  type pokemonType,
  type typeURL,
} from "./constants";

const pokemonTypeSlugs = new Set<string>(Object.values(POKEMON_TYPES));

export const toPokemonSummary = (
  pokemon: FetchPokemonDetailsResponse,
  types: FetchPokemonTypeResponse[],
): PokemonSummary => ({
  id: pokemon.id,
  name: pokemon.name,
  artworkURL: pokemon.sprites.other["official-artwork"].front_default,
  typeSprites: types.map((type) => type?.sprites),
});

export const summaryFromCache = (
  pokemon: FetchPokemonDetailsResponse | null,
  pokemonType: (type: pokemonType) => FetchPokemonTypeResponse | null,
): PokemonSummary | null => {
  if (pokemon == null) {
    return null;
  }

  const types = pokemon.types.map((slot) => {
    const type = getPokemonTypeFromUrl(slot.type.url);
    if (type == null) {
      return null;
    }
    return pokemonType(type);
  });

  if (types.some((type) => type == null)) {
    return null;
  }

  return toPokemonSummary(pokemon, types as FetchPokemonTypeResponse[]);
};

export const getPokemonTypeFromUrl = (url: typeURL | string): pokemonType | null => {
  const slug = url
    .split("/")
    .filter((segment) => segment.length > 0)
    .pop();
  if (slug == null || !pokemonTypeSlugs.has(slug)) {
    return null;
  }
  return slug as pokemonType;
};

export const getPokemonIdFromUrl = (url: string): number => {
  const match = /\/(\d+)\/?$/.exec(url);
  if (match == null) {
    throw new Error(`Invalid pokemon URL: ${url}`);
  }
  return Number(match[1]);
};

export const getEnglishDescription = (species: FetchPokemonSpeciesResponse): string => {
  const englishEntries = species.flavor_text_entries.filter(
    (entry) => entry.language.name === "en",
  );
  const entry = englishEntries[englishEntries.length - 1];
  return entry?.flavor_text.replace(/\f/g, " ").replace(/\n/g, " ") ?? "";
};

export const parsePageIndex = (params: URLSearchParams): number => {
  return Number(params.get("index")) || 1;
};

export const parseResultsPerPage = (params: URLSearchParams): number => {
  return Number(params.get("results")) || RESULTS_PER_PAGE;
};

const INCOMING_DAMAGE_KEYS = [
  "double_damage_from",
  "half_damage_from",
  "no_damage_from",
] as const;

const incomingDamageMultiplier = (
  defendingType: FetchPokemonTypeResponse,
  incomingTypeUrl: string,
): number => {
  const relations = defendingType.damage_relations;
  if (relations.no_damage_from.some((resource) => resource.url === incomingTypeUrl)) {
    return 0;
  }
  if (
    relations.double_damage_from.some((resource) => resource.url === incomingTypeUrl)
  ) {
    return 2;
  }
  if (relations.half_damage_from.some((resource) => resource.url === incomingTypeUrl)) {
    return 0.5;
  }
  return 1;
};

export const mergeTypeDamageRelations = (
  defendingTypes: FetchPokemonTypeResponse[],
  resolveType: (url: string) => FetchPokemonTypeResponse | null,
): TypeRelations => {
  const incomingTypeUrls = new Set<string>();
  for (const defendingType of defendingTypes) {
    for (const key of INCOMING_DAMAGE_KEYS) {
      for (const resource of defendingType.damage_relations[key]) {
        incomingTypeUrls.add(resource.url);
      }
    }
  }

  const merged: TypeRelations = {
    weakness: [],
    doubleWeakness: [],
    resistance: [],
    doubleResistance: [],
    immuneTo: [],
  };

  for (const incomingTypeUrl of incomingTypeUrls) {
    let multiplier = 1;
    for (const defendingType of defendingTypes) {
      multiplier *= incomingDamageMultiplier(defendingType, incomingTypeUrl);
    }

    const incomingType = resolveType(incomingTypeUrl);
    if (incomingType == null) {
      continue;
    }

    const sprites = incomingType.sprites;
    if (multiplier === 0) {
      merged.immuneTo.push(sprites);
    } else if (multiplier === 4) {
      merged.doubleWeakness.push(sprites);
    } else if (multiplier === 2) {
      merged.weakness.push(sprites);
    } else if (multiplier === 0.25) {
      merged.doubleResistance.push(sprites);
    } else if (multiplier === 0.5) {
      merged.resistance.push(sprites);
    }
  }

  return merged;
};

export type PaginationItem =
  | { kind: "page"; page: number }
  | { kind: "ellipsis"; key: string };

const PAGINATION_ITEMS = 4;

export const getCompactPaginationItems = (
  currentPage: number,
  pageCount: number,
): PaginationItem[] => {
  if (pageCount <= PAGINATION_ITEMS) {
    return Array.from({ length: pageCount }, (_, i) => ({
      kind: "page" as const,
      page: i + 1,
    }));
  }

  const last = pageCount;

  if (currentPage <= 2) {
    return [
      { kind: "page", page: 1 },
      { kind: "page", page: 2 },
      { kind: "ellipsis", key: "start" },
      { kind: "page", page: last },
    ];
  }

  if (currentPage >= last - 1) {
    return [
      { kind: "page", page: 1 },
      { kind: "ellipsis", key: "end" },
      { kind: "page", page: last - 1 },
      { kind: "page", page: last },
    ];
  }

  return [
    { kind: "page", page: 1 },
    { kind: "ellipsis", key: "middle" },
    { kind: "page", page: currentPage },
    { kind: "page", page: currentPage + 1 },
  ];
};
