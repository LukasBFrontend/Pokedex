import React from "react";
import type { NamedTypeSprites } from "./types";

type Props = {
  multiplier: number;
  sprites: NamedTypeSprites[];
  emphasized?: boolean;
};

export const EntryResistanceGroup: React.FC<Props> = ({
  multiplier,
  sprites,
  emphasized = false,
}) => {
  return (
    <>
      {sprites?.map((sprite) => {
        const icon = sprite["generation-viii"]["sword-shield"].name_icon;

        return (
          <div
            key={`type-img-${icon}`}
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
              src={icon}
              alt={sprite.name}
            />
            {`${multiplier}x`}
          </div>
        );
      })}
    </>
  );
};
