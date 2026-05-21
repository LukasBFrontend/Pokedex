import React from "react";

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary";
}

export const Button: React.FC<Props> = ({
  variant = "primary",
  children,
  ...props
}) => {
  return (
    <button
      className={[
        "-skew-x-20",
        "inline-flex",
        "items-center",
        "justify-center",
        "px-4",
        "py-1.5",
        "uppercase",
        "transition-all",
        "hover:opacity-100",
        "hover:cursor-pointer",
        "hover:text-white",
        "hover:bg-accent",
        variant === "secondary" ? "bg-black/75" : "",
        variant === "secondary" ? "" : "opacity-75",
        variant === "secondary" ? "text-white" : "",
      ].join(" ")}
      {...props}
    >
      <span
        className={[
          "inline-flex",
          "skew-x-20",
          "items-center",
          "gap-2",
          "[&>svg]:-mx-2",
        ].join(" ")}
      >
        {children}
      </span>
    </button>
  );
};
