import { Close, Search } from "@mui/icons-material";
import React, { useState } from "react";

export const SearchBar: React.FC<React.InputHTMLAttributes<HTMLInputElement>> = ({
  onChange,
  className,
  ...inputProps
}) => {
  const [value, setValue] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setValue(e.currentTarget.value);
    onChange?.(e);
  };

  const handleClear = (): void => {
    setValue("");
    onChange?.({
      currentTarget: { value: "" },
      target: { value: "" },
    } as React.ChangeEvent<HTMLInputElement>);
  };

  return (
    <div
      className={[
        "h-full",
        "px-6",
        "py-3",
        "rounded-full",
        "bg-white/90",
        "flex",
        "items-center",
        "justify-between",
        "hover:bg-white",
        "outline-accent",
        "has-[:focus]:outline-2",
        className,
      ].join(" ")}
    >
      <input
        {...inputProps}
        placeholder="Search for a pokemon..."
        className={[
          "grow-1",
          "padding-1",
          "outline-0",
          "[&::-webkit-search-cancel-button]:hidden",
          "[&::-webkit-search-decoration]:hidden",
        ].join(" ")}
        aria-label="Search pokemon"
        id="search-input"
        type="search"
        value={value}
        onChange={handleChange}
      />
      {value ? (
        <button
          type="button"
          aria-label="Clear search"
          onClick={handleClear}
        >
          <Close className="" />
        </button>
      ) : (
        <button
          type="submit"
          aria-label="Search"
        >
          <Search />
        </button>
      )}
    </div>
  );
};
