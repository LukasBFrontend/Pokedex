import React, { useEffect, useId, useRef } from "react";
import { getFocusableElements } from "../utils";

type Props = {
  active: boolean;
  onClose: () => void;
  children: React.ReactNode;
};

export const FilterOverlay: React.FC<Props> = ({ active, onClose, children }) => {
  const dialogRef = useRef<HTMLDivElement>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);
  const titleId = useId();

  useEffect(() => {
    if (!active) {
      return;
    }

    previousFocusRef.current = document.activeElement as HTMLElement | null;

    const dialog = dialogRef.current;
    if (dialog == null) {
      return;
    }

    const focusInitial = (): void => {
      const preferred = dialog.querySelector<HTMLElement>("#search-input");
      const target = preferred ?? getFocusableElements(dialog)[0];
      target?.focus();
    };

    const frame = requestAnimationFrame(focusInitial);

    const handleKeyDown = (event: KeyboardEvent): void => {
      if (event.key === "Escape") {
        event.preventDefault();
        onClose();
        return;
      }

      if (event.key !== "Tab" || dialogRef.current == null) {
        return;
      }

      const focusable = getFocusableElements(dialogRef.current);
      if (focusable.length === 0) {
        return;
      }

      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      const activeElement = document.activeElement;

      if (event.shiftKey && activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return (): void => {
      cancelAnimationFrame(frame);
      document.removeEventListener("keydown", handleKeyDown);
      previousFocusRef.current?.focus();
    };
  }, [active, onClose]);

  return (
    <div
      ref={dialogRef}
      role="dialog"
      aria-modal="true"
      aria-labelledby={titleId}
      hidden={!active}
      className={[
        "flex",
        "fixed",
        "inset-3.5",
        "z-200",
        "rounded-4xl",
        "flex-col",
        "items-end",
        "overflow-visible",
        "min-h-0",
        "p-6",
        "gap-6",
        "border-1",
        "bg-black/95",
        "backdrop-blur-xl",
      ].join(" ")}
    >
      <h2
        id={titleId}
        className={[
          "sr-only",
        ].join(" ")}
      >
        Search Pokémon
      </h2>
      {children}
    </div>
  );
};
