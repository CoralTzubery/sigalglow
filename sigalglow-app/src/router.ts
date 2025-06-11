import { createBrowserRouter } from "react-router-dom";
import { App } from "./App";
import { Home } from "./pages/Home";
import { About } from "./pages/About";
import { Contact } from "./pages/Contact";
import { NotFound } from "./pages/NotFound";
import { getHero } from "./models/homepage";
import { Treatments } from "./pages/Treatments";
import { ErrorPage } from "./pages/ErrorPage";
import { Register } from "./pages/Register";
import { Login } from "./pages/Login";
import { Appointments } from "./pages/Appointments";
import { Reviews } from "./pages/Reviews";

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
          const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/about`);
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
        path: "register",
        Component: Register,
      },
      {
        path: "login",
        Component: Login,
      },
      {
        path: "appointments",
        Component: Appointments,
        loader: async () => {
          const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/appointments`);
          if (!response.ok) throw new Error("Cannot load appointments");
          return await response.json();
        },
      },
      {
        path: "reviews",
        Component: Reviews,
      },
      {
        path: "*",
        Component: NotFound,
      },
    ],
  },
]);
