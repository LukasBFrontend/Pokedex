import { Link, Outlet, useLocation } from "react-router";
import { Navbar } from "./components/Navbar";
import { useViewTransitionBackGuard } from "./utils/viewTransitionBack";
import { Button } from "./components/particles";
import { ArrowLeft } from "@mui/icons-material";

const App: React.FC = () => {
  useViewTransitionBackGuard();
  const { pathname } = useLocation();

  return (
    <div
      className={[
        "app-main-background",
        "h-dvh",
        "w-full",
        "py-6",
        "overflow-hidden",
      ].join(" ")}
    >
      <div
        className={[
          "mx-auto",
          "grid",
          "h-full",
          "min-h-0",
          "w-full",
          "md:max-w-[var(--page-max-width-md)]",
          "2xl:max-w-[var(--page-max-width)]",
          "grid-rows-[auto_minmax(0,1fr)_auto]",
          "gap-6",
        ].join(" ")}
      >
        <header
          className={[
            "app-header",
            "relative",
            "z-100",
            "flex",
            "items-center",
            "justify-between",
            "gap-8",
            "px-6",
            "shadow-sm",
          ].join(" ")}
        >
          {pathname !== "/" && (
            <aside
              className={[
                "absolute",
                "top-15",
                "-left-3",
                "sm:top-22",
                "sm:left-12",
                "xl:top-30",
                "xl:-left-35",
                "z-10",
                "w-60",
                "-skew-x-20",
                "xl:bg-white/90",
                "py-10",
                "px-8",
                "flex",
                "flex-col",
              ].join(" ")}
            >
              <span className="skew-x-20 z-100">
                <Link to="/">
                  <Button variant="secondary">
                    <ArrowLeft /> Home
                  </Button>
                </Link>
              </span>
            </aside>
          )}

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
        </header>

        <Outlet />
      </div>
    </div>
  );
};

export default App;
