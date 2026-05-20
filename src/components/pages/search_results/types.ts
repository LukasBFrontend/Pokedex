import type { PokemonTypeSprites } from "../../../api/types";

export type PokemonSummary = {
  id: number;
  name: string;
  typeSprites: PokemonTypeSprites[];
  artworkURL: string;
};
