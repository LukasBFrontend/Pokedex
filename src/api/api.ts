import axios from "axios";
import type { FetchPokemonDetailsResponse, FetchPokemonsResponse, FetchPokemonTypeResponse } from "./types";
import { API_BASE_URL } from "../constants";

export const FetchPokemons = async (
  maxResults: number = 151,
  offset: number = 0,
): Promise<FetchPokemonsResponse> => {
  let url = `${API_BASE_URL}pokemon?`;

  url += `offset=${offset}&`;
  url += `limit=${maxResults}`;

  try {
    const response = await axios.get(url);
    return response.data as FetchPokemonsResponse;
  } catch (error) {
    console.error(error);
  }
};

export const FetchPokemonDetails = async (
  url: string,
): Promise<FetchPokemonDetailsResponse> => {
  try {
    const response = await axios.get(url);
    return response.data as FetchPokemonDetailsResponse;
  } catch (error) {
    console.error(error);
  }
};

export const FetchPokemonType = async (
  url: string,
): Promise<FetchPokemonTypeResponse> => {
  try {
    const response = await axios.get(url);
    return response.data as FetchPokemonTypeResponse;
  } catch (error) {
    console.error(error);
  }
};
