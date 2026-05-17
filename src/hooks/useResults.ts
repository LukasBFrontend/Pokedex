import { useOutletContext } from "react-router";
import type { NamedApiResource } from "../api/types";

export type ResultsContextType = { results: NamedApiResource[] | null };

export const useResults = (): ResultsContextType => {
  return useOutletContext<ResultsContextType>() ?? { results: null };
};
