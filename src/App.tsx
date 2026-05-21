import { Link, Outlet, useLocation } from "react-router";
import { Navbar } from "./components/Navbar";
import { useViewTransitionBackGuard } from "./utils/viewTransitionBack";
import { Button } from "./components/particles";
import { ArrowLeft } from "@mui/icons-material";

const App: React.FC = () => {
  useViewTransitionBackGuard();

  return (
    <div
      className={[
        "app-main-background",
        "grid",
        "grid-cols-[1fr_min(100%,var(--page-max-width))_1fr]",
        "grid-rows-[var(--app-header-height)_auto]",
        "h-dvh",
        "w-full",
        "overflow-hidden",
      ].join(" ")}
    >
      <header
        className={[
          "app-header",
          "z-100",
          "col-span-3",
          "flex",
          "h-[var(--app-header-height)]",
          "shrink-0",
          "items-center",
          "w-full",
          "shadow-sm",
        ].join(" ")}
      >
        <div
          className={[
            "h-full",
            "w-full",
            "max-w-[var(--page-max-width)]",
            "mx-auto",
            "flex",
            "items-center",
            "justify-between",
            "gap-8",
            "px-6",
          ].join(" ")}
        >
          <h1
            className={[
              "m-0",
              "text-secondary",
              "bg-black/35",
              "px-4",
              "py-2.5",
              "rounded-full",
            ].join(" ")}
          >
            Poké<span className="text-primary">dex</span>
          </h1>
          <Navbar />
        </div>
      </header>
      <div
        className={[
          "col-span-3",
          "row-start-2",
          "grid",
          "grid-cols-subgrid",
          "h-[calc(100dvh-var(--app-header-height)-var(--app-footer-height))]",
          "min-h-0",
        ].join(" ")}
      >
        {useLocation().pathname !== "/" && (
          <aside
            className={[
              "-skew-x-20",
              "mr-20",
              "-ml-20",
              "mt-20",
              "bg-white/90",
              "col-start-1",
              "sticky",
              "top-0",
              "self-start",
              "flex",
              "flex-col",
              "items-end",
              "py-10",
              "px-8",
            ].join(" ")}
          >
            <span className="skew-x-20">
              <Link to="/">
                <Button variant="secondary">
                  <ArrowLeft /> Home
                </Button>
              </Link>
            </span>
          </aside>
        )}
        <article
          className={[
            "scrollbar",
            "col-start-2",
            "py-10",
            "px-20",
            "bg-white",
            "rounded-2xl",
            "border-x-1",
            "border-secondary/75",
            "overflow-y-auto",
          ].join(" ")}
        >
          <Outlet />
        </article>
      </div>
      <footer
        className={[
          "h-full",
          "w-full",
          "row-start-3",
          "col-start-2",
          "text-center",
          "text-white",
          "text-shadow-lg",
        ].join(" ")}
      >
        <span
          className={[
            "bg-black/35",
            "px-2.5",
            "py-1.5",
            "rounded-full",
          ].join(" ")}
        >
          Connected to PokéAPI
        </span>
      </footer>
    </div>
  );
};

export default App;
