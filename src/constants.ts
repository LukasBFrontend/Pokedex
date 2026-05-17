export const API_BASE_URL = "https://pokeapi.co/api/v2/" as const;

export const RESULTS_PER_PAGE_FALLBACK = 30;

export const TYPE_URLS = {
  Normal: `${API_BASE_URL}type/normal`,
  Fire: `${API_BASE_URL}type/fire`,
  Water: `${API_BASE_URL}type/water`,
  Electric: `${API_BASE_URL}type/electric`,
  Grass: `${API_BASE_URL}type/grass`,
  Ice: `${API_BASE_URL}type/ice`,
  Fighting: `${API_BASE_URL}type/fighting`,
  Poison: `${API_BASE_URL}type/poison`,
  Ground: `${API_BASE_URL}type/ground`,
  Flying: `${API_BASE_URL}type/flying`,
  Psychic: `${API_BASE_URL}type/psychic`,
  Bug: `${API_BASE_URL}type/bug`,
  Rock: `${API_BASE_URL}type/rock`,
  Ghost: `${API_BASE_URL}type/ghost`,
  Dragon: `${API_BASE_URL}type/dragon`,
  Dark: `${API_BASE_URL}type/dark`,
  Steel: `${API_BASE_URL}type/steel`,
  Fairy: `${API_BASE_URL}type/fairy`,
} as const;

export type typeURL = (typeof TYPE_URLS)[keyof typeof TYPE_URLS];

export const POKEMON_TYPES = {
  Normal: "normal",
  Fire: "fire",
  Water: "water",
  Electric: "electric",
  Grass: "grass",
  Ice: "ice",
  Fighting: "fighting",
  Poison: "poison",
  Ground: "ground",
  Flying: "flying",
  Psychic: "psychic",
  Bug: "bug",
  Rock: "rock",
  Ghost: "ghost",
  Dragon: "dragon",
  Dark: "dark",
  Steel: "steel",
  Fairy: "fairy",
} as const;

export type pokemonType = (typeof POKEMON_TYPES)[keyof typeof POKEMON_TYPES];
