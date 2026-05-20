import type { PokemonTypeSprites } from "../../../api/types";

export type PokemonMetaData = {
  id: number;
  name: string;
  typeSprites: PokemonTypeSprites[];
  typeRelationsSprites: TypeRelations;
  artworkURL: string;
  description: string; 
};

export type TypeRelations = {
  weakness: PokemonTypeSprites[];
  doubleWeakness: PokemonTypeSprites[];
  resistance: PokemonTypeSprites[];
  doubleResistance: PokemonTypeSprites[];
  immuneTo: PokemonTypeSprites[];
};
