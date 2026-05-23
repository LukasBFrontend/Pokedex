import React from "react";

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "alt";
}

export const Button: React.FC<Props> = ({
  variant = "primary",
  children,
  className,
  ...props
}) => {
  return (
    <button
      className={[
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
        "-skew-x-20",
        "hover:bg-accent",
        variant === "secondary" ? "bg-black/75" : "",
        variant === "primary" ? "opacity-75" : "",
        variant === "secondary" ? "text-white" : "",
        variant === "alt" ? "bg-white/90" : "",
        className,
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
