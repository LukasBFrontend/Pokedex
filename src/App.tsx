import { Link, Outlet } from "react-router";
import { Navbar } from "./components/Navbar";
import { useViewTransitionBackGuard } from "./utils/viewTransitionBack";
import { Button } from "./components/particles";
import { ArrowLeft } from "@mui/icons-material";

const App: React.FC = () => {
  useViewTransitionBackGuard();

  return (
    <div className="app-main-background grid h-dvh w-full overflow-hidden grid-cols-[1fr_min(100%,var(--page-max-width))_1fr] grid-rows-[var(--app-header-height)_auto]">
      <header className="z-100 app-headerz-10 col-span-3 flex h-[var(--app-header-height)] shrink-0 items-center w-full bg-white/50 shadow-sm">
        <div className="mx-auto h-full flex w-full max-w-[var(--page-max-width)] items-center justify-between gap-8 px-6">
          <h1 className="m-0">
            <span className="text-secondary">Poké</span>
            <span className="text-secondary">dex</span>
          </h1>
          <Navbar />
        </div>
      </header>
      <div className=" col-span-3 row-start-2 grid h-[calc(100dvh-var(--app-header-height))] min-h-0 grid-cols-subgrid overflow-y-auto">
        <aside className="col-start-1 sticky top-0 self-start flex flex-col items-end py-10 px-6">
          <Link to="/">
            <Button>
              <ArrowLeft /> Home
            </Button>
          </Link>
        </aside>
        <article className="col-start-2 py-10 px-20 bg-white shadow-lg">
          <Outlet />
        </article>
      </div>
    </div>
  );
};

export default App;
