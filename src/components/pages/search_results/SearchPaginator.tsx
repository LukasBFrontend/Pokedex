import React, {
  useCallback,
  useEffect,
  useRef,
  useState,
  type Dispatch,
  type SetStateAction,
} from "react";
import { ArrowLeft, ArrowRight } from "@mui/icons-material";
import { useMediaQuery } from "../../../hooks";
import { getCompactPaginationItems } from "../../../utils";

type ScrollOverflow = {
  left: boolean;
  right: boolean;
};

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
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [scrollOverflow, setScrollOverflow] = useState<ScrollOverflow>({
    left: false,
    right: false,
  });

  const updateScrollOverflow = useCallback(() => {
    const container = scrollContainerRef.current;
    if (!container || !isLargeDevice) {
      setScrollOverflow({ left: false, right: false });
      return;
    }

    const maxScrollLeft = container.scrollWidth - container.clientWidth;
    const hasOverflow = maxScrollLeft > 1;

    setScrollOverflow({
      left: hasOverflow && container.scrollLeft > 1,
      right: hasOverflow && container.scrollLeft < maxScrollLeft - 1,
    });
  }, [isLargeDevice]);

  const scrollPageToCenterIfAtEdge = useCallback(
    (pageIndex: number) => {
      const container = scrollContainerRef.current;
      if (!container || !isLargeDevice) {
        return;
      }

      const button = container.querySelector<HTMLElement>(
        `[data-page-index="${pageIndex}"]`,
      );
      if (!button) {
        return;
      }

      const containerRect = container.getBoundingClientRect();
      const buttonRect = button.getBoundingClientRect();
      const edgeThreshold = 14;
      const isAtLeftEdge = buttonRect.left < containerRect.left + edgeThreshold;
      const isAtRightEdge = buttonRect.right > containerRect.right - edgeThreshold;

      if (!isAtLeftEdge && !isAtRightEdge) {
        return;
      }

      const targetScrollLeft =
        button.offsetLeft - (container.clientWidth - button.offsetWidth) / 2;

      container.scrollTo({ left: targetScrollLeft, behavior: "smooth" });
    },
    [isLargeDevice],
  );

  const pageCount = results ? Math.max(1, Math.ceil(results / resultsPerPage)) : 0;

  useEffect(() => {
    updateScrollOverflow();
  }, [updateScrollOverflow, pageCount, currentIndex]);

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container || !isLargeDevice) {
      return;
    }

    container.addEventListener("scroll", updateScrollOverflow, { passive: true });
    const resizeObserver = new ResizeObserver(updateScrollOverflow);
    resizeObserver.observe(container);

    return () => {
      container.removeEventListener("scroll", updateScrollOverflow);
      resizeObserver.disconnect();
    };
  }, [isLargeDevice, updateScrollOverflow, pageCount]);

  useEffect(() => {
    if (!results) {
      return;
    }

    const frame = requestAnimationFrame(() => {
      scrollPageToCenterIfAtEdge(currentIndex);
    });

    return () => cancelAnimationFrame(frame);
  }, [currentIndex, results, scrollPageToCenterIfAtEdge]);

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
        data-page-index={index}
        aria-label={`Page ${index}`}
        aria-current={isCurrentIndex ? "page" : undefined}
        onClick={(e) => handleNavigationClick(e, isCurrentIndex, index)}
        className={[
          "opacity-75",
          !isLargeDevice ? "pb-3" : "pb-0.5",
          isLargeDevice ? "pt-3.5" : "pt-2",
          "px-3",
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
        "-mx-3.5",
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
      aria-label="Next page"
      disabled={isLastPage}
      onClick={(e) => handleNavigationClick(e, false, currentIndex + 1)}
      className={[
        "shrink-0",
        "-mx-3.5",
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

  const pageIndices = Array.from({ length: pageCount }, (_, i) => i + 1);

  const renderEllipsis = (key: string): React.ReactElement => (
    <span
      key={key}
      className={[
        "opacity-75",
        "px-3",
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
        "min-w-0",
        "mx-auto",
        "h-full",
        "px-5",
        "flex",
        "justify-center",
        "gap-5",
        "rounded-full",
        "bg-white",
        "text-2xl",
        "leading-none",
      ].join(" ")}
    >
      {renderPreviousButton()}
      <div className={["relative", "min-w-0", "max-w-[70vw]"].join(" ")}>
        {isLargeDevice && scrollOverflow.left ? (
          <div
            className="paginator-scroll-fade paginator-scroll-fade--left"
            aria-hidden
          />
        ) : null}
        {isLargeDevice && scrollOverflow.right ? (
          <div
            className="paginator-scroll-fade paginator-scroll-fade--right"
            aria-hidden
          />
        ) : null}
        <div
          ref={scrollContainerRef}
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
      </div>
      {renderNextButton()}
    </nav>
  );
};
