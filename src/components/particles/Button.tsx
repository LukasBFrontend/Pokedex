import React from "react";

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary";
}

export const Button: React.FC<Props> = ({ variant = "primary", ...props }) => {
  return (
    <button
      className={[
        "rounded-md",
        "opacity-75",
        "px-3.5",
        "py-2.5",
        "flex",
        "gap-2",
        "uppercase",
        "transition:opacity",
        "hover:opacity-100",
        "hover:cursor-pointer",
        "hover:bg-secondary/50",
        "[&>svg]:-mx-2",
      ].join(" ")}
      {...props}
    ></button>
  );
};
