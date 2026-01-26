import { Routes } from "@/models/types";
import Detail from "@/pages/Room";
import Home from "@/pages/Home";
import Livestream from "@/pages/Livestream";

export const routers: Routes[] = [
  {
    href: "/",
    id: "home",
    name: "Home",
    element: <Home />,
  },
  {
    href: "/room",
    id: "room",
    name: "Room",
    element: <Detail />,
  },
  {
    href: "/livestream",
    id: "livestream",
    name: "Livestream",
    element: <Livestream />,
  },
];
