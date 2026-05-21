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
        "grid-rows-[auto_minmax(0,1fr)_auto]",
        "h-dvh",
        "w-full",
        "py-6",
        "overflow-hidden",
        "gap-6",
      ].join(" ")}
    >
      <header
        className={[
          "app-header",
          "z-100",
          "col-span-3",
          "flex",
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

        <Outlet />
    </div>
  );
};

export default App;
