import React from "react";

interface Props {
  children: React.ReactNode;
  className?: string;
}

export const PageFooter: React.FC<Props> = ({ children, className }) => (
  <footer
    className={[
      "row-start-3",
      "col-start-2",
      className,
    ].join(" ")}
  >
    {children}
  </footer>
);
