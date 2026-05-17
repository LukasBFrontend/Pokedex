import React, { useEffect, type Dispatch, type SetStateAction } from "react";
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
          isCurrentIndex ? "text-blue-500" : "",
          "px-3",
          "pb-1",
          "flex",
          "justify-center",
          "items-center",
          "opacity-75",
          "hover:opacity-100",
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
        "flex",
        "justify-center",
        "items-center",
        "opacity-75",
        "hover:opacity-100",
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
        "flex",
        "justify-center",
        "items-center",
        "opacity-75",
        "hover:opacity-100",
        "disabled:opacity-25",
      ].join(" ")}
    >
      <ArrowRight fontSize="large" />
    </button>
  );

  const pageCount = Math.max(1, Math.ceil(results / resultsPerPage));
  const pageIndices = Array.from({ length: pageCount }, (_, i) => i + 1);

  return (
    <div className="w-fit py-4 px-5 flex items-center gap-5 rounded-2xl text-2xl leading-none bg-white/75">
      {renderPreviousButton()}
      {pageIndices.map(renderNavigationButton)}
      {renderNextButton()}
    </div>
  );
};
