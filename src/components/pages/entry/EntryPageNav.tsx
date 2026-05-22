import React from "react";
import { Link } from "react-router";
import { Button } from "../../particles";
import { ArrowLeft, ArrowRight } from "@mui/icons-material";
import { MAX_RESULTS } from "../../../constants";

type Props = {
  enabled: boolean;
  prevIndex: number;
  nextIndex: number;
};

export const EntryPageNav: React.FC<Props> = ({ enabled, prevIndex, nextIndex }) => {
  const prevDisabled = prevIndex < 1;
  const nextDisabled = nextIndex > MAX_RESULTS;
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
        className={["tw-flex", "tw-items-center", prevDisabled && "invisible"].join(
          " ",
        )}
        to={enabled && prevIndex > 0 ? `/pokemon/${prevIndex}` : ""}
      >
        <Button>
          <ArrowLeft /> Prev
        </Button>
      </Link>
      <hr className="grow my-6 text-secondary" />
      <Link
        className={["tw-flex", "tw-items-center", nextDisabled && "invisible"].join(
          " ",
        )}
        to={enabled ? `/pokemon/${nextIndex}` : ""}
      >
        <Button>
          Next <ArrowRight />
        </Button>
      </Link>
    </nav>
  );
};
