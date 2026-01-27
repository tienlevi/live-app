import { create } from "zustand";
import { Role, RoomState } from "@/constants/types";
import { useEffect } from "react";
import zg from "@/utils/zg";

interface Store {
  username: string;
  roomState: RoomState;
  isPublishing: boolean;
  isPlaying: boolean;
  remoteStreams: string[];
  setUsername: (username: string) => void;
  setIsPublishing: (isPublishing: boolean) => void;
  setIsPlaying: (isPlaying: boolean) => void;
  setRoomState: (roomState: RoomState) => void;
  setRemoteStreams: (remoteStreams: string[]) => void;
}

export const useLivestreamStore = create<Store>((set) => ({
  username: "",
  roomState: "disconnected",
  isPublishing: false,
  isPlaying: false,
  remoteStreams: [],
  setUsername: (username) => set({ username }),
  setIsPublishing: (isPublishing) => set({ isPublishing }),
  setIsPlaying: (isPlaying) => set({ isPlaying }),
  setRoomState: (roomState) => set({ roomState }),
  setRemoteStreams: (remoteStreams) => set({ remoteStreams }),
}));

export function useLivestreamEvent(role: Role) {
  const { setRoomState, setIsPublishing, setIsPlaying } = useLivestreamStore(
    (state) => state,
  );
  useEffect(() => {
    // Room state changes
    zg.on("roomStateChanged", (_roomID, reason, _errorCode, _extendedData) => {
      if (reason === "LOGINING") {
        setRoomState("connecting");
      } else if (reason === "LOGINED") {
        setRoomState("connected");
      } else if (reason === "LOGOUT" || reason === "LOGIN_FAILED") {
        setRoomState("disconnected");
      }
    });

    // Publisher state changes
    zg.on("publisherStateUpdate", (result) => {
      if (result.state === "PUBLISHING") {
        setIsPublishing(true);
      } else if (result.state === "NO_PUBLISH") {
        setIsPublishing(false);
      }
    });

    // Player state changes
    zg.on("playerStateUpdate", (result) => {
      if (result.state === "PLAYING") {
        setIsPlaying(true);
      } else if (result.state === "NO_PLAY") {
        setIsPlaying(false);
      }
    });

    return () => {
      zg.off("roomStateChanged");
      zg.off("roomStreamUpdate");
      zg.off("publisherStateUpdate");
      zg.off("playerStateUpdate");
    };
  }, [role]);
}
