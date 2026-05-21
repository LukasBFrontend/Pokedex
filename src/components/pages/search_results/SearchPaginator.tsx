import React, { type Dispatch, type SetStateAction } from "react";
import { ArrowLeft, ArrowRight } from "@mui/icons-material";

type Props = {
  index: number;
  results: number;
  resultsPerPage: number;
  setPageIndex: Dispatch<SetStateAction<number>>;
};

export const SearchPaginator: React.FC<Props> = ({
  index: currentIndex,
  results,
  resultsPerPage,
  setPageIndex,
}) => {
  if (!results) {
    return null;
  }
  const isFirstPage = currentIndex === 1;
  const isLastPage = currentIndex * resultsPerPage >= results;

  const handleNavigationClick = (
    e: React.MouseEvent,
    isCurrentIndex: boolean,
    index: number,
  ): void => {
    e.preventDefault();
    if (isCurrentIndex) {
      return;
    }

    setPageIndex(index);
  };

  const renderNavigationButton = (index: number): React.ReactElement => {
    const isCurrentIndex = currentIndex === index;

    return (
      <button
        key={index}
        type="button"
        onClick={(e) => handleNavigationClick(e, isCurrentIndex, index)}
        className={[
          "opacity-75",
          "px-3",
          "pb-1",
          "flex",
          "justify-center",
          "items-center",
          "hover:text-primary",
          isCurrentIndex ? "text-primary" : "",
          isCurrentIndex ? "opacity-100" : "",
        ].join(" ")}
      >
        {index}
      </button>
    );
  };

  const renderPreviousButton = (): React.ReactElement => (
    <button
      type="button"
      disabled={isFirstPage}
      onClick={(e) => handleNavigationClick(e, false, currentIndex - 1)}
      className={[
        "opacity-75",
        "flex",
        "justify-center",
        "items-center",
        "hover:opacity-100",
        "hober:text-accent",
        "disabled:opacity-25",
      ].join(" ")}
    >
      <ArrowLeft fontSize="large" />
    </button>
  );

  const renderNextButton = (): React.ReactElement => (
    <button
      type="button"
      disabled={isLastPage}
      onClick={(e) => handleNavigationClick(e, false, currentIndex + 1)}
      className={[
        "opacity-75",
        "flex",
        "justify-center",
        "items-center",
        "hover:opacity-100",
        "hober:text-accent",
        "disabled:opacity-25",
      ].join(" ")}
    >
      <ArrowRight fontSize="large" />
    </button>
  );

  const pageCount = Math.max(1, Math.ceil(results / resultsPerPage));
  const pageIndices = Array.from({ length: pageCount }, (_, i) => i + 1);

  return (
    <div
      className={[
        "w-fit",
        "mx-auto",
        "h-full",
        "py-4",
        "px-5",
        "flex",
        "items-center",
        "justify-center",
        "gap-5",
        "rounded-full",
        "bg-white",
        "text-2xl",
        "leading-none",
      ].join(" ")}
    >
      {renderPreviousButton()}
      {pageIndices.map(renderNavigationButton)}
      {renderNextButton()}
    </div>
  );
};
