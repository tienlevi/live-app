import { Routes } from "@/models/types";
import Detail from "@/pages/Detail";
import Home from "@/pages/Home";

export const routers: Routes[] = [
  {
    href: "/",
    id: "home",
    name: "Home",
    element: <Home />,
  },
  {
    href: "/detail/:id",
    id: "live",
    name: "Live",
    element: <Detail />,
  },
];
