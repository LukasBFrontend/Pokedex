import { useCallback } from "react";
import { useLocation, useNavigate, useSearchParams } from "react-router";

type SetIndexSearchParams = (
  nextInit: URLSearchParams | ((prev: URLSearchParams) => URLSearchParams),
) => void;

type IndexSearchParamsContextType = [
  searchParams: URLSearchParams,
  setIndexSearchParams: SetIndexSearchParams,
  isIndexRoute: boolean,
];

const useIsIndexRoute = (): boolean => {
  return useLocation().pathname === "/";
};

export const useIndexSearchParams = (): IndexSearchParamsContextType => {
  const isIndexRoute = useIsIndexRoute();
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  const setIndexSearchParams = useCallback<SetIndexSearchParams>(
    (nextInit) => {
      if (isIndexRoute) {
        setSearchParams(nextInit);
        return;
      }
      const next =
        typeof nextInit === "function" ? nextInit(new URLSearchParams()) : nextInit;
      const search = next.toString();
      navigate(search ? `/?${search}` : "/");
    },
    [isIndexRoute, setSearchParams, navigate],
  );

  return [
    isIndexRoute ? searchParams : new URLSearchParams(),
    setIndexSearchParams,
    isIndexRoute,
  ];
};
