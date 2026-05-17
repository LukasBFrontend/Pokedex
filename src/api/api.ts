import axios from "axios";
import type { FetchPokemonsResponse, FetchPokemonDetailsResponse } from "./types";

const BASE_URL = "https://pokeapi.co/api/v2/";

export const FetchPokemons = async (
  maxResults: number = 151,
  offset: number = 0,
): Promise<FetchPokemonsResponse> => {
  let url = `${BASE_URL}pokemon?`;

  url += `offset=${offset}&`;
  url += `limit=${maxResults}`;

  console.log(url);

  try {
    const response = await axios.get(url);
    console.log({ response: response });
    return response.data as FetchPokemonsResponse;
  } catch (error) {
    console.error(error);
  }
};

export const FetchPokemonDetails = async (url: string): Promise<FetchPokemonDetailsResponse> => {
  try {
    const response = await axios.get(url);
    return response.data as FetchPokemonDetailsResponse;
  } catch (error) {
    console.error(error);
  }
};
