import React from "react";
import type { PokemonSummary } from "./types";

type Props = {
  summary: PokemonSummary;
};

export const SearchResultCard: React.FC<Props> = ({ summary }) => {
  return (
    <section
      className="h-full flex flex-col justify-between rounded-2xl p-6 bg-light-gray opacity-75 hover:shadow-2xl hover:opacity-100"
      key={summary.name}
    >
      <h3 className="capitalize">
        {summary.name} <span className="text-gray-500">#{summary.id}</span>
      </h3>
      <img
        className="tw-max-h-100 shrink"
        src={summary.artworkURL}
      />
      <div className="flex gap-4">
        {summary.types.map((typeslot) => (
          <span className="rounded-3xl px-4 pt-2 pb-2.5 bg-primary leading-none text-secondary">
            {typeslot.type.name}
          </span>
        ))}
      </div>
    </section>
  );
};

export const SearchResultCardSkeleton: React.FC = (key: string) => {
  return (
    <section
      className="h-full flex flex-col justify-between rounded-2xl p-6 bg-light-gray opacity-75 hover:shadow-2xl hover:opacity-100 animate-pulse"
      key={key}
    >
      <div className="w-40 h-10 rounded-2xl bg-secondary"></div>
      <div className="w-full h-100 rounded-2xl bg-secondary"></div>
      <div className="w-40 h-10 rounded-2xl bg-secondary"></div>
    </section>
  );
};
