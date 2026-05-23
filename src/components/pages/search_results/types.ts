import type { NamedTypeSprites } from "../entry/types";

export type PokemonSummary = {
  id: number;
  name: string;
  typeSprites: NamedTypeSprites[];
  artworkURL: string;
};
