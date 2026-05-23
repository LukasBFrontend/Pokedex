import React, { type ReactNode } from "react";
import type { PokemonSummary } from "./pages/search_results/types";

type TransitionProps = {
  children: ReactNode;
  className?: string;
};

export const PokemonSummaryCardTransition = ({
  children,
  className = "h-full w-full",
}: TransitionProps): React.JSX.Element => (
  <div className={`pokemon-summary-card-view-transition ${className}`}>{children}</div>
);

type TitleVariant = "md" | "lg";

type Props = {
  summary: PokemonSummary;
  titleVariant?: TitleVariant;
};

export const PokemonSummaryCard: React.FC<Props> = ({
  summary,
  titleVariant = "md",
}) => {
  const heading = (
    <>
      {summary.name} <span className="text-gray-500">#{summary.id}</span>
    </>
  );
  return (
    <section
      className={[
        "h-full",
        "rounded-2xl",
        "p-6",
        "flex",
        "flex-col",
        "justify-between",
        "items-center",
        "transition-all",
        "ease-in-out",
        "hover:opacity-100",
        titleVariant === "md" ? "hover:shadow-2xl" : "",
        titleVariant === "md" ? "opacity-75" : "",
      ].join(" ")}
    >
      {titleVariant === "md" ? (
        <h3 className={["capitalize"].join(" ")}>{heading}</h3>
      ) : (
        <h2 className={["capitalize"].join(" ")}>{heading}</h2>
      )}
      <img
        className="w-150 max-w-full"
        src={summary.artworkURL}
        alt={summary.name}
      />
      <div className="flex gap-4">
        {summary.typeSprites?.map((sprite) => (
          <div
            className="grow"
            key={sprite["generation-viii"]["sword-shield"].name_icon}
          >
            <img
              className="rounded-md"
              src={sprite["generation-viii"]["sword-shield"].name_icon}
              alt={sprite.name}
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
    <section
      className={[
        "h-full",
        "rounded-2xl",
        "opacity-75",
        "animate-pulse",
        "p-6",
        "flex",
        "flex-col",
        "justify-between",
        "items-center",
        "bg-light-gray",
        "hover:shadow-2xl",
        "hover:opacity-100",
      ].join(" ")}
    >
      <div
        className={[
          titleSkeletonClassName[titleVariant],
          "rounded-2xl",
          "bg-secondary",
        ].join(" ")}
      />
      <div
        className={[
          "w-150",
          "max-w-full",
          "h-100",
          "rounded-2xl",
          "bg-secondary",
        ].join(" ")}
      />
      <div className="flex gap-4 w-full">
        <div
          className={[
            "h-10",
            "grow",
            "rounded-md",
            "bg-secondary",
          ].join(" ")}
        />
        <div
          className={[
            "h-10",
            "grow",
            "rounded-md",
            "bg-secondary",
          ].join(" ")}
        />
      </div>
    </section>
  );
};
