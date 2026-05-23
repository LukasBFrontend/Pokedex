import React from "react";

interface Props {
  children: React.ReactNode;
  className?: string;
}

export const PageArticle: React.FC<Props> = ({ children, className }) => (
  <article
    className={[
      "scrollbar",
      "row-start-2",
      "min-h-0",
      "px-6",
      "py-6",
      "sm:py-10",
      "sm:px-20",
      "bg-white",
      "sm:rounded-2xl",
      "border-x-1",
      "border-secondary/75",
      "overflow-y-auto",
      className,
    ].join(" ")}
  >
    {children}
  </article>
);
