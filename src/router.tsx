import { createBrowserRouter } from "react-router";
import App from "./App";
import SearchResultsPage from "./components/pages/SearchPage/SearchResultsPage";
import Entry from "./components/pages/Entry";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { index: true, element: <SearchResultsPage /> },
      { path: "pokemon/:id", element: <Entry /> },
    ],
  },
]);
