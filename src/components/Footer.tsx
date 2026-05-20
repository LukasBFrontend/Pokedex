import React from "react";

type Props = {};

const Footer: React.FC<Props> = () => {
  return (
    <footer className="w-full">
      <div
        className={[
          "max-w-[var(--page-max-width)]",
          "mx-auto",
          "px-6",
          "text-center",
        ].join(" ")}
      >
        <small>Connected to PokéAPI</small>
      </div>
    </footer>
  );
};

export default Footer;
