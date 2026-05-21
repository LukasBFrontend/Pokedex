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
      "col-start-2",
      "py-10",
      "px-20",
      "bg-white",
      "rounded-2xl",
      "border-x-1",
      "border-secondary/75",
      "overflow-y-auto",
      className,
    ].join(" ")}
  >
    {children}
  </article>
);
