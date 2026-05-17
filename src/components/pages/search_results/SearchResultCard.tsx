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
      <div className="grid grid-cols-2 gap-4">
        {summary.typeNameURLs.map((url) => (
          <img
            className="rounded-md"
            src={url}
            alt="a"
          />
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
