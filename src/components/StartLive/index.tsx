import useLivestream from "@/hooks/useLivestream";
import zg from "@/utils/zg";
import { useEffect } from "react";
import {
  useLivestreamStore,
  useLivestreamEvent,
} from "@/stores/useLivestreamStore";
import Control from "./Control";
import Video from "./Video";
import Info from "./Info";
import Devices from "./Devices";

function StartLive() {
  const { role, playRemoteStream, logoutRoom } = useLivestream();
  const {
    remoteStreams,
    roomState,
    isPlaying,
    isPublishing,
    setRemoteStreams,
    setIsPlaying,
  } = useLivestreamStore();

  useEffect(() => {
    // Stream updates (when other users start/stop publishing)
    zg.on("roomStreamUpdate", async (_roomID, updateType, streamList) => {
      if (updateType === "ADD") {
        const newStreamIDs = streamList.map((stream) => stream.streamID);
        setRemoteStreams([...remoteStreams, ...newStreamIDs]);

        // Auto-play the first stream for audience
        if (role === "audience" && newStreamIDs.length > 0) {
          await playRemoteStream(newStreamIDs[0]);
        }
      } else if (updateType === "DELETE") {
        const deletedIDs = streamList.map((stream) => stream.streamID);
        setRemoteStreams(
          remoteStreams.filter((id) => !deletedIDs.includes(id)),
        );
        setIsPlaying(false);
      }
    });
  }, [zg]);

  useEffect(() => {
    return () => {
      logoutRoom();
    };
  }, []);

  useLivestreamEvent(role);

  const isConnected = roomState === "connected";
  const isLive = isConnected && (isPublishing || isPlaying);

  return (
    <div className="mt-20">
      <div className="relative w-full space-y-3">
        {/* Video Container */}
        <Devices />
        <Video />
        {/* Live Indicator Badge */}
        {isLive && (
          <div className="absolute left-4 top-4 flex items-center gap-2 rounded-md bg-red-600 px-3 py-1.5 text-sm font-semibold text-white shadow-lg">
            <span className="relative flex h-2.5 w-2.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-white opacity-75"></span>
              <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-white"></span>
            </span>
            LIVE
          </div>
        )}

        <Control />
      </div>

      <Info />
    </div>
  );
}

export default StartLive;
