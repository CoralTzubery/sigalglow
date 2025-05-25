import { createBrowserRouter } from "react-router-dom";
import { App } from "./App";
import { Home } from "./pages/Home";
import { About } from "./pages/About";
import { Contact } from "./pages/Contact";
import { NotFound } from "./pages/NotFound";
import { getHero } from "./models/homepage";
import { aboutSections } from "./models/about";

export const router = createBrowserRouter([
    {
        path: "/",
        Component: App,
        children: [
            { 
                index: true,
                Component: Home,
                loader: () => {
                    return {
                        hero: getHero(),
                        about: aboutSections,
                    };
                },
            },
            { path: "about", Component: About },
            { path: "contact", Component: Contact },
            { path: "*", Component: NotFound }
        ],
    },
]);