import { useContext, useEffect } from "react";
import { UNSAFE_ViewTransitionContext as ViewTransitionContext } from "react-router";

export const VIEW_TRANSITION_ENTRY_SESSION_KEY = "pokedex-view-transition-entry";

const isSearchPath = (pathname: string): boolean => pathname === "/" || pathname === "";

const isEntryPath = (pathname: string): boolean => pathname.startsWith("/pokemon/");

export const markEntryViewTransition = (): void => {
  sessionStorage.setItem(VIEW_TRANSITION_ENTRY_SESSION_KEY, "1");
};

export const clearEntryViewTransition = (): void => {
  sessionStorage.removeItem(VIEW_TRANSITION_ENTRY_SESSION_KEY);
};

export const useViewTransitionBackGuard = (): void => {
  const viewTransition = useContext(ViewTransitionContext);
  const root = document.documentElement;

  const isViewTransitionBack =
    viewTransition.isTransitioning &&
    isEntryPath(viewTransition.currentLocation.pathname) &&
    isSearchPath(viewTransition.nextLocation.pathname);

  if (isViewTransitionBack) {
    root.setAttribute("data-view-transition-back", "");
  }

  useEffect(() => {
    const onPopState = (): void => {
      if (sessionStorage.getItem(VIEW_TRANSITION_ENTRY_SESSION_KEY) === "1") {
        root.setAttribute("data-view-transition-back", "");
      }
    };

    window.addEventListener("popstate", onPopState);
    return () => window.removeEventListener("popstate", onPopState);
  }, [root]);

  useEffect(() => {
    if (!viewTransition.isTransitioning) {
      root.removeAttribute("data-view-transition-back");
    }
  }, [viewTransition.isTransitioning, root]);
};
