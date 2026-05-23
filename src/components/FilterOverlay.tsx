import React from "react";

type Props = {
  active: boolean;
  children: React.ReactNode;
};

export const FilterOverlay: React.FC<Props> = ({ active = true, children }) => {
  return (
    <div
      className={[
        active ? "flex" : "hidden",
        "fixed",
        "inset-3.5",
        "rounded-4xl",
        "flex-col",
        "items-end",
        "overflow-visible",
        "min-h-0",
        "p-6",
        "gap-6",
        "border-1",
        "bg-black/95",
        "backdrop-blur-xl",
      ].join(" ")}
    >
      {children}
    </div>
  );
};
