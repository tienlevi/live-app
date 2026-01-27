import { Routes } from "@/models/types";
import Room from "@/pages/Room";
import Rooms from "@/pages/Rooms";
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
    element: <Room />,
  },
  {
    href: "/rooms",
    id: "rooms",
    name: "Rooms",
    element: <Rooms />,
  },
  {
    href: "/livestream",
    id: "Livestream",
    name: "Livestream",
    element: <Livestream />,
  },
];
