import React from "react";
import type { PokemonTypeSprites } from "../../../api/types";

type Props = {
  multiplier: number;
  sprites: PokemonTypeSprites[];
  emphasized?: boolean;
};

export const EntryResistanceGroup: React.FC<Props> = ({
  multiplier,
  sprites,
  emphasized = false,
}) => {
  return (
    <>
      {sprites?.map((sprite) => (
        <div
          className={[
            "flex",
            "flex-col",
            "items-center",
            "gap-2.5",
            emphasized ? "text-primary/75" : "",
          ].join(" ")}
        >
          <img
            className="w-35 rounded-md"
            src={sprite["generation-viii"]["sword-shield"].name_icon}
          />
          {`${multiplier}x`}
        </div>
      ))}
    </>
  );
};
