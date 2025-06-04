import { createBrowserRouter } from "react-router-dom";
import { App } from "./App";
import { Home } from "./pages/Home";
import { About } from "./pages/About";
import { Contact } from "./pages/Contact";
import { NotFound } from "./pages/NotFound";
import { getHero } from "./models/homepage";
import { Treatments } from "./pages/Treatments";
import { ErrorPage } from "./pages/ErrorPage";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: App,
    ErrorBoundary: ErrorPage,
    children: [
      {
        index: true,
        Component: Home,
        loader: async () => {
          const hero = getHero();
          const response = await fetch("http://localhost:3000/api/about");
          if (!response.ok) throw new Error("Cannot load data");
          const about = await response.json();
          return { hero, about };
        },
      },
      {
        path: "about",
        Component: About,
      },
      {
        path: "contact",
        Component: Contact,
      },
      {
        path: "treatments",
        Component: Treatments,
      },
      {
        path: "*",
        Component: NotFound,
      },
    ],
  },
]);
