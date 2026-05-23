import type { PokemonTypeSprites } from "../../../api/types";

export interface NamedTypeSprites extends PokemonTypeSprites {
  name: string;
}

export type PokemonMetaData = {
  id: number;
  name: string;
  typeSprites: NamedTypeSprites[];
  typeRelationsSprites: TypeRelations;
  artworkURL: string;
  description: string;
};

export type TypeRelations = {
  weakness: NamedTypeSprites[];
  doubleWeakness: NamedTypeSprites[];
  resistance: NamedTypeSprites[];
  doubleResistance: NamedTypeSprites[];
  immuneTo: NamedTypeSprites[];
};
