import { Search } from "@mui/icons-material";
import React from "react";

export const SearchBar: React.FC<React.ButtonHTMLAttributes<HTMLInputElement>> = ({
  onChange,
  className,
}) => {
  return (
    <div
      className={[
        "h-full",
        "px-6",
        "pt-3.5",
        "pb-3",
        "rounded-full",
        "bg-white/90",
        "flex",
        "justify-between",
        "hover:bg-white",
        className,
      ].join(" ")}
    >
      <input
        placeholder="Search for a pokemon..."
        className="h-full focus:outline-0"
        type="search"
        onChange={onChange}
      />
      <button type="submit">
        <Search />
      </button>
    </div>
  );
};
