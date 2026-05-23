import React from "react";
import { useNavigate } from "react-router";
import { Button } from "../../particles";
import { ArrowLeft, ArrowRight } from "@mui/icons-material";
import { MAX_RESULTS } from "../../../constants";

type Props = {
  index: number;
};

export const EntryPageNav: React.FC<Props> = ({ index }) => {
  const navigate = useNavigate();

  const prevIndex = index - 1;
  const nextIndex = index + 1;

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
      <Button
        className={[prevDisabled && "invisible"].join(" ")}
        onClick={() => navigate(`/pokemon/${prevIndex}`)}
      >
        <ArrowLeft /> Prev
      </Button>
      <hr className="grow my-6 text-secondary" />
      <Button
        className={[nextDisabled && "invisible"].join(" ")}
        onClick={() => navigate(`/pokemon/${nextIndex}`)}
      >
        Next <ArrowRight />
      </Button>
    </nav>
  );
};
