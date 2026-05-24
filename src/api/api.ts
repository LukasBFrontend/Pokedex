import axios from "axios";
import type {
  FetchPokemonDetailsResponse,
  FetchPokemonsResponse,
  FetchPokemonSpeciesResponse,
  FetchPokemonTypeResponse,
} from "./types";
import { API_BASE_URL, MAX_RESULTS } from "../constants";

export const FetchPokemons = async (
  offset: number = 0,
): Promise<FetchPokemonsResponse | null> => {
  let url = `${API_BASE_URL}pokemon?`;

  url += `offset=${offset}&`;
  url += `limit=${MAX_RESULTS}`;

  try {
    const response = await axios.get(url);
    return response.data as FetchPokemonsResponse;
  } catch (error) {
    console.error(error);
  }

  return null;
};

export const FetchPokemonDetails = async (
  url: string,
): Promise<FetchPokemonDetailsResponse | null> => {
  try {
    const response = await axios.get(url);
    return response.data as FetchPokemonDetailsResponse;
  } catch (error) {
    console.error(error);
  }

  return null;
};

export const FetchPokemonType = async (
  url: string,
): Promise<FetchPokemonTypeResponse | null> => {
  try {
    const response = await axios.get(url);
    return response.data as FetchPokemonTypeResponse;
  } catch (error) {
    console.error(error);
  }

  return null;
};

export const FetchPokemonSpecies = async (
  url: string,
): Promise<FetchPokemonSpeciesResponse | null> => {
  try {
    const response = await axios.get(url);
    return response.data as FetchPokemonSpeciesResponse;
  } catch (error) {
    console.error(error);
  }

  return null;
};
