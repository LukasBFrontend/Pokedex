import React from "react";
import { Link } from "react-router";
import { Button } from "../../particles";
import { ArrowLeft, ArrowRight } from "@mui/icons-material";

type Props = {
  enabled: boolean;
  prevIndex: number;
  nextIndex: number;
};

export const EntryPageNav: React.FC<Props> = ({ enabled, prevIndex, nextIndex }) => {
  return (
    <nav
      className={[
        "w-full",
        "my-8",
        "flex",
        "justify-between",
        "items-center",
        "gap-2",
      ].join(" ")}
    >
      <Link
        className="tw-flex tw-items-center"
        to={enabled ? `/pokemon/${prevIndex}` : ""}
        viewTransition
      >
        <Button>
          <ArrowLeft /> Prev
        </Button>
      </Link>
      <hr className="grow my-6 text-secondary" />
      <Link
        className="tw-flex tw-items-center"
        to={enabled ? `/pokemon/${nextIndex}` : ""}
        viewTransition
      >
        <Button>
          Next <ArrowRight />
        </Button>
      </Link>
    </nav>
  );
};
