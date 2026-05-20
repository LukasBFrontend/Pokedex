import type { pokemonType } from "../constants";

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

export type TypeDamageRelations = {
  double_damage_from: NamedApiResource[];
  double_damage_to: NamedApiResource[];
  half_damage_from: NamedApiResource[];
  half_damage_to: NamedApiResource[];
  no_damage_from: NamedApiResource[];
  no_damage_to: NamedApiResource[];
};

type TypeGameIndex = {
  game_index: number;
  generation: NamedApiResource;
};

type LocalizedName = {
  language: NamedApiResource;
  name: string;
};

type PastTypeDamageRelations = {
  damage_relations: TypeDamageRelations;
  generation: NamedApiResource;
};

type TypePokemonEntry = {
  pokemon: NamedApiResource;
  slot: number;
};

type TypeSpriteIcons = {
  name_icon: string;
  symbol_icon: string | null;
};

type TypeSpritesGenerationIII = {
  colosseum: TypeSpriteIcons;
  emerald: TypeSpriteIcons;
  "firered-leafgreen": TypeSpriteIcons;
  "ruby-sapphire": TypeSpriteIcons;
  xd: TypeSpriteIcons;
};

type TypeSpritesGenerationIV = {
  "diamond-pearl": TypeSpriteIcons;
  "heartgold-soulsilver": TypeSpriteIcons;
  platinum: TypeSpriteIcons;
};

type TypeSpritesGenerationV = {
  "black-2-white-2": TypeSpriteIcons;
  "black-white": TypeSpriteIcons;
};

type TypeSpritesGenerationVI = {
  "omega-ruby-alpha-sapphire": TypeSpriteIcons;
  "x-y": TypeSpriteIcons;
};

type TypeSpritesGenerationVII = {
  "lets-go-pikachu-lets-go-eevee": TypeSpriteIcons;
  "sun-moon": TypeSpriteIcons;
  "ultra-sun-ultra-moon": TypeSpriteIcons;
};

type TypeSpritesGenerationVIII = {
  "brilliant-diamond-shining-pearl": TypeSpriteIcons;
  "legends-arceus": TypeSpriteIcons;
  "sword-shield": TypeSpriteIcons;
};

type TypeSpritesGenerationIX = {
  "scarlet-violet": TypeSpriteIcons;
};

export type PokemonTypeSprites = {
  "generation-iii": TypeSpritesGenerationIII;
  "generation-iv": TypeSpritesGenerationIV;
  "generation-v": TypeSpritesGenerationV;
  "generation-vi": TypeSpritesGenerationVI;
  "generation-vii": TypeSpritesGenerationVII;
  "generation-viii": TypeSpritesGenerationVIII;
  "generation-ix": TypeSpritesGenerationIX;
};

export type FetchPokemonTypeResponse = {
  damage_relations: TypeDamageRelations;
  game_indices: TypeGameIndex[];
  generation: NamedApiResource;
  id: number;
  move_damage_class: NamedApiResource;
  moves: NamedApiResource[];
  name: pokemonType;
  names: LocalizedName[];
  past_damage_relations: PastTypeDamageRelations[];
  pokemon: TypePokemonEntry[];
  sprites: PokemonTypeSprites;
};

type ApiResource = {
  url: string;
};

type FlavorTextEntry = {
  flavor_text: string;
  language: NamedApiResource;
  version: NamedApiResource;
};

type FormDescription = {
  description: string;
  language: NamedApiResource;
};

type GenusEntry = {
  genus: string;
  language: NamedApiResource;
};

type PalParkEncounter = {
  area: NamedApiResource;
  base_score: number;
  rate: number;
};

type PokedexNumberEntry = {
  entry_number: number;
  pokedex: NamedApiResource;
};

type PokemonVariety = {
  is_default: boolean;
  pokemon: NamedApiResource;
};

export type FetchPokemonSpeciesResponse = {
  base_happiness: number;
  capture_rate: number;
  color: NamedApiResource;
  egg_groups: NamedApiResource[];
  evolution_chain: ApiResource;
  evolves_from_species: NamedApiResource | null;
  flavor_text_entries: FlavorTextEntry[];
  form_descriptions: FormDescription[];
  forms_switchable: boolean;
  gender_rate: number;
  genera: GenusEntry[];
  generation: NamedApiResource;
  growth_rate: NamedApiResource;
  habitat: NamedApiResource;
  has_gender_differences: boolean;
  hatch_counter: number;
  id: number;
  is_baby: boolean;
  is_legendary: boolean;
  is_mythical: boolean;
  name: string;
  names: LocalizedName[];
  order: number;
  pal_park_encounters: PalParkEncounter[];
  pokedex_numbers: PokedexNumberEntry[];
  shape: NamedApiResource;
  varieties: PokemonVariety[];
};
