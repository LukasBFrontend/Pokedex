import { Outlet, useSearchParams } from "react-router";
import { Navbar } from "./components/Navbar";
import Footer from "./components/Footer";
import { useEffect, useMemo, useState } from "react";
import type { NamedApiResource } from "./api/types";
import { FetchPokemons } from "./api/api";

const App: React.FC = () => {
  const [
    pokemon,
    setPokemon,
  ] = useState<NamedApiResource[]>();

  const [
    searchParams,
  ] = useSearchParams();

  const filteredPokemon = useMemo(() => {
    const querystring = searchParams.get("q");
    if (!pokemon) {
      return;
    } else if (!querystring || querystring == "") {
      return pokemon;
    }
    return pokemon.filter((pokemon) =>
      pokemon.name.includes(querystring.toLowerCase()),
    );
  }, [
    pokemon,
    searchParams,
  ]);

  useEffect(() => {
    if (pokemon != null) {
      return;
    }
    const prefetchPage = async (): Promise<void> => {
      const response = await FetchPokemons();
      setPokemon(response.results);
    };

    void prefetchPage();
  }, [pokemon]);

  return (
    <>
      <header className="sticky top-0 z-10 w-full py-6 backdrop-blur-md bg-light-gray/75">
        <div className="max-w-[var(--page-max-width)] mx-auto px-6 flex justify-between items-center gap-8">
          <h1>Pokédex</h1>
          <Navbar resultsCount={filteredPokemon?.length} />
        </div>
      </header>
      <article className="max-w-[var(--page-max-width)] mx-auto py-10">
        <Outlet context={{ results: filteredPokemon ?? null }} />
      </article>
      <Footer />
    </>
  );
};

export default App;
