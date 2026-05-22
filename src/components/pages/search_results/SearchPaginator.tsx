import React, { type Dispatch, type SetStateAction } from "react";
import { ArrowLeft, ArrowRight } from "@mui/icons-material";
import { useMediaQuery } from "../../../hooks";
import { getCompactPaginationItems } from "../../../utils";

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
  const isLargeDevice = useMediaQuery("(min-width: 640px)");

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
        aria-label={`Page ${index}`}
        aria-current={isCurrentIndex ? "page" : undefined}
        onClick={(e) => handleNavigationClick(e, isCurrentIndex, index)}
        className={[
          "opacity-75",
          "px-3",
          "pt-4",
          !isLargeDevice ? "pb-4.5" : "pb-1",
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
      aria-label="Previous page"
      disabled={isFirstPage}
      onClick={(e) => handleNavigationClick(e, false, currentIndex - 1)}
      className={[
        "shrink-0",
        "opacity-75",
        "py-4",
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
      aria-label="Next page"
      disabled={isLastPage}
      onClick={(e) => handleNavigationClick(e, false, currentIndex + 1)}
      className={[
        "shrink-0",
        "opacity-75",
        "py-4",
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

  const renderEllipsis = (key: string): React.ReactElement => (
    <span
      key={key}
      className={[
        "opacity-75",
        "px-3",
        "pt-4",
        !isLargeDevice ? "pb-4.5" : "pb-1",
        "flex",
        "justify-center",
        "items-center",
        "select-none",
      ].join(" ")}
      aria-hidden
    >
      …
    </span>
  );

  const compactItems = getCompactPaginationItems(currentIndex, pageCount);

  return (
    <nav
      aria-label="Pagination"
      className={[
        "w-max",
        "max-w-full",
        "min-w-0",
        "mx-auto",
        "h-full",
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
      <div
        className={[
          ...(isLargeDevice ? ["scrollbar-x", "overflow-x-auto"] : []),
          "min-w-0",
          "flex",
          "flex-nowrap",
          "items-center",
          "justify-start",
          "gap-5",
        ].join(" ")}
      >
        {isLargeDevice
          ? pageIndices.map(renderNavigationButton)
          : compactItems.map((item) =>
              item.kind === "page"
                ? renderNavigationButton(item.page)
                : renderEllipsis(item.key),
            )}
      </div>
      {renderNextButton()}
    </nav>
  );
};
