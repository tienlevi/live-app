import { Routes } from "@/models/types";
import Detail from "@/pages/Room";
import Home from "@/pages/Home";
import JoinRoom from "@/pages/JoinRoom";

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
    href: "/join-room",
    id: "joinRoom",
    name: "JoinRoom",
    element: <JoinRoom />,
  },
];
