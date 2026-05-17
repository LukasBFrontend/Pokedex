import type { PokemonTypeSlot } from "../../../api/types";

export type PokemonSummary = {
  id: number;
  name: string;
  types: PokemonTypeSlot[];
  artworkURL: string;
};
