import { useCallback, useMemo, useRef } from "react";
import { tokenRoom } from "@/constants";
import { Role } from "@/constants/types";
import { useLivestreamStore } from "@/stores/useLivestreamStore";
import { randomID } from "@/utils/format";
import { getUrlParams, setUrlParams } from "@/utils/params";
import zg from "@/utils/zg";

function useLivestream() {
  const role: Role =
    (getUrlParams().get("role") as Role) === "audience" ? "audience" : "host";
  const { remoteStreams, isPublishing, isPlaying, setRoomState, username } =
    useLivestreamStore();
  const roomID = useMemo(() => {
    return getUrlParams().get("roomID") || randomID(5);
  }, []);
  const userID = useMemo(() => {
    return getUrlParams().get("userID") || randomID(5);
  }, []);
  const usernameParams = getUrlParams().get("username");
  const streamID = `${roomID}_${userID}_${usernameParams}_stream`;

  const localVideoRef = useRef<HTMLDivElement>(null);
  const remoteVideoRef = useRef<HTMLVideoElement>(null);
  const localStreamRef = useRef<MediaStream | null>(null);
  const loginRoom = useCallback(async () => {
    try {
      const result = await zg.loginRoom(
        roomID,
        tokenRoom,
        { userID: "tienlevi", userName: username },
        { userUpdate: true },
      );

      if (!result) {
        console.error("Failed to login room");
        return false;
      }

      return true;
    } catch (error) {
      console.error("Login room error:", error);
      return false;
    }
  }, [roomID, userID, username]);

  const startPublishing = useCallback(async () => {
    try {
      const localStream = await zg.createZegoStream({
        screen: { video: true, audio: true },
      });

      if (localVideoRef.current) {
        console.log("isPlaying");
        localStream.playVideo(localVideoRef.current, {
          enableAutoplayDialog: true,
        });
      }

      zg.startPublishingStream(streamID, localStream);
    } catch (error) {
      console.error("Start publishing error:", error);
    }
  }, [roomID, userID]);

  const stopPublishing = useCallback(async () => {
    try {
      zg.stopPublishingStream(streamID);

      if (localStreamRef.current) {
        localStreamRef.current.getTracks().forEach((track) => track.stop());
        localStreamRef.current = null;
      }
    } catch (error) {
      console.error("Stop publishing error:", error);
    }
  }, [roomID, userID]);

  const playRemoteStream = useCallback(async (streamID: string) => {
    try {
      const remoteStream = await zg.startPlayingStream(streamID);

      if (remoteVideoRef.current && remoteStream) {
        remoteVideoRef.current.srcObject = remoteStream;
      }
    } catch (error) {
      console.error("Play remote stream error:", error);
    }
  }, []);

  const stopPlaying = useCallback(() => {
    const targetStreamID = remoteStreams[0];
    if (targetStreamID) {
      zg.stopPlayingStream(targetStreamID);
    }
  }, [remoteStreams]);

  const logoutRoom = useCallback(async () => {
    if (isPublishing) {
      await stopPublishing();
    }
    if (isPlaying) {
      stopPlaying();
    }
    zg.logoutRoom(roomID);
    setRoomState("disconnected");
  }, [roomID, isPublishing, isPlaying, stopPublishing, stopPlaying]);

  const handleStartStream = async () => {
    setUrlParams({ roomID, userID, username, role });
    const loggedIn = await loginRoom();
    if (loggedIn && role === "host") {
      await startPublishing();
    }
  };

  const handleStopStream = useCallback(async () => {
    await logoutRoom();
  }, [logoutRoom]);

  return {
    roomID,
    userID,
    streamID,
    usernameParams,
    role,
    localStreamRef,
    localVideoRef,
    remoteVideoRef,
    handleStartStream,
    handleStopStream,
    logoutRoom,
    playRemoteStream,
    stopPlaying,
  };
}

export default useLivestream;
