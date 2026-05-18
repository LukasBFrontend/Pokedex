import { Outlet } from "react-router";
import { Navbar } from "./components/Navbar";
import Footer from "./components/Footer";

const App: React.FC = () => {
  return (
    <>
      <header className="sticky top-0 z-10 w-full py-6 backdrop-blur-md bg-light-gray/75">
        <div className="max-w-[var(--page-max-width)] mx-auto px-6 flex justify-between items-center gap-8">
          <h1>Pokédex</h1>
          <Navbar />
        </div>
      </header>
      <article className="max-w-[var(--page-max-width)] min-h-[90vh] mx-auto py-10">
        <Outlet />
      </article>
      <Footer />
    </>
  );
};

export default App;
