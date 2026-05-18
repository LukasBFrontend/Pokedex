import React from "react";
import type { PokemonSummary } from "./types";

type TitleVariant = "md" | "lg";

const titleClassName: Record<TitleVariant, string> = {
  md: "capitalize",
  lg: "capitalize text-4xl",
};

type Props = {
  summary: PokemonSummary;
  titleVariant?: TitleVariant;
};

export const PokemonSummaryCard: React.FC<Props> = ({
  summary,
  titleVariant = "md",
}) => {
  return (
    <section className="h-full flex flex-col justify-between items-center rounded-2xl p-6 bg-light-gray opacity-75 hover:shadow-2xl hover:opacity-100">
      <h3 className={titleClassName[titleVariant]}>
        {summary.name} <span className="text-gray-500">#{summary.id}</span>
      </h3>
      <img
        className="w-150 max-w-full"
        src={summary.artworkURL}
        alt=""
      />
      <div className="flex gap-4">
        {summary.typeNameURLs.map((url) => (
          <div
            className="grow"
            key={url}
          >
            <img
              className="rounded-md"
              src={url}
              alt=""
            />
          </div>
        ))}
      </div>
    </section>
  );
};

type SkeletonProps = {
  titleVariant?: TitleVariant;
};

const titleSkeletonClassName: Record<TitleVariant, string> = {
  md: "w-40 h-10",
  lg: "w-48 h-12",
};

export const PokemonSummaryCardSkeleton: React.FC<SkeletonProps> = ({
  titleVariant = "md",
}) => {
  return (
    <section className="h-full flex flex-col justify-between items-center rounded-2xl p-6 bg-light-gray opacity-75 hover:shadow-2xl hover:opacity-100 animate-pulse">
      <div
        className={`${titleSkeletonClassName[titleVariant]} rounded-2xl bg-secondary`}
      />
      <div className="w-150 max-w-full h-100 rounded-2xl bg-secondary" />
      <div className="flex gap-4 w-full">
        <div className="grow h-10 rounded-md bg-secondary" />
        <div className="grow h-10 rounded-md bg-secondary" />
      </div>
    </section>
  );
};
