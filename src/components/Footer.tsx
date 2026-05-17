import React from "react";

type Props = {};

const Footer: React.FC<Props> = () => {
  return (
    <footer>
      <div className="max-w-[var(--page-max-width)] mx-auto py-10 text-center">
        <small>Connected to PokéAPI</small>
      </div>
    </footer>
  );
};

export default Footer;
