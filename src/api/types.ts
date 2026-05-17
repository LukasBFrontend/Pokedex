export type NamedApiResource = {
  name: string;
  url: string;
};

type PokemonAbility = {
  ability: NamedApiResource;
  is_hidden: boolean;
  slot: number;
};

type PokemonCries = {
  latest: string;
  legacy: string;
};

type HeldItemVersionDetail = {
  rarity: number;
  version: NamedApiResource;
};

type PokemonHeldItem = {
  item: NamedApiResource;
  version_details: HeldItemVersionDetail[];
};

type GameIndex = {
  game_index: number;
  version: NamedApiResource;
};

type VersionGroupDetail = {
  level_learned_at: number;
  move_learn_method: NamedApiResource;
  order: number | null;
  version_group: NamedApiResource;
};

type PokemonMove = {
  move: NamedApiResource;
  version_group_details: VersionGroupDetail[];
};

type PastAbilitySlot = {
  ability: NamedApiResource | null;
  is_hidden: boolean;
  slot: number;
};

type PastAbility = {
  abilities: PastAbilitySlot[];
  generation: NamedApiResource;
};

type PastStatEntry = {
  base_stat: number;
  effort: number;
  stat: NamedApiResource;
};

type PastStats = {
  generation: NamedApiResource;
  stats: PastStatEntry[];
};

type PokemonStat = {
  base_stat: number;
  effort: number;
  stat: NamedApiResource;
};

export type PokemonTypeSlot = {
  slot: number;
  type: NamedApiResource;
};

type PastTypes = {
  generation: NamedApiResource;
  types: PokemonTypeSlot[];
};

type SpriteResource = {
  front_default?: string | null;
  front_female?: string | null;
  front_shiny?: string | null;
  front_shiny_female?: string | null;
  back_default?: string | null;
  back_female?: string | null;
  back_shiny?: string | null;
  back_shiny_female?: string | null;
  [key: string]: string | null | SpriteResource | undefined;
};

type PokemonSprites = {
  back_default: string | null;
  back_female: string | null;
  back_shiny: string | null;
  back_shiny_female: string | null;
  front_default: string | null;
  front_female: string | null;
  front_shiny: string | null;
  front_shiny_female: string | null;
  other: {
    dream_world: {
      front_default: string | null;
      front_female: string | null;
    };
    home: {
      front_default: string | null;
      front_female: string | null;
      front_shiny: string | null;
      front_shiny_female: string | null;
    };
    "official-artwork": {
      front_default: string;
      front_shiny: string;
    };
    showdown: {
      back_default: string;
      back_female: string | null;
      back_shiny: string;
      back_shiny_female: string | null;
      front_default: string;
      front_female: string | null;
      front_shiny: string;
      front_shiny_female: string | null;
    };
  };
  versions: Record<string, Record<string, SpriteResource>>;
};

export type FetchPokemonsResponse = {
  count: number;
  next: string;
  previous: string;
  results: { name: string; url: string }[];
};

export type FetchPokemonDetailsResponse = {
  abilities: PokemonAbility[];
  base_experience: number;
  cries: PokemonCries;
  forms: NamedApiResource[];
  game_indices: GameIndex[];
  height: number;
  held_items: PokemonHeldItem[];
  id: number;
  is_default: boolean;
  location_area_encounters: string;
  moves: PokemonMove[];
  name: string;
  order: number;
  past_abilities: PastAbility[];
  past_stats: PastStats[];
  past_types: PastTypes[];
  species: NamedApiResource;
  sprites: PokemonSprites;
  stats: PokemonStat[];
  types: PokemonTypeSlot[];
  weight: number;
};
