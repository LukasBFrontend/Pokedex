import { createBrowserRouter } from "react-router";
import App from "./App";
import SearchResults from "./components/pages/SearchPage/SearchResults";
import Entry from "./components/pages/Entry";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { index: true, element: <SearchResults /> },
      { path: "pokemon/:id", element: <Entry /> },
    ],
  },
]);
