import useLivestream from "@/hooks/useLivestream";
import { useLivestreamStore } from "@/stores/useLivestreamStore";
import { Loader2, Users } from "lucide-react";

function Video() {
  const { role, localVideoRef, remoteVideoRef } = useLivestream();
  const { roomState, isPublishing, isPlaying } = useLivestreamStore();
  const isConnecting = roomState === "connecting";
  const isConnected = roomState === "connected";
  const isLive = isConnected && (isPublishing || isPlaying);

  return (
    <div className="relative aspect-video w-full rounded-lg">
      {role === "host" && (
        <div ref={localVideoRef} className="h-full w-full object-cover" />
      )}
      {role === "audience" && (
        <video ref={remoteVideoRef} className="h-full w-full object-cover" />
      )}

      {/* Placeholder when not streaming */}
      {!isLive && !isConnecting && (
        <div className="absolute top-1/2 left-1/2 -translate-1/2 inset-0 flex flex-col items-center justify-center text-white">
          <Users className="mb-4 h-16 w-16 opacity-50" />
          <p className="text-lg">
            {role === "host"
              ? "Start your livestream"
              : "Waiting for host to start"}
          </p>
        </div>
      )}

      {/* Loading state */}
      {isConnecting && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/50">
          <Loader2 className="h-12 w-12 animate-spin text-white" />
        </div>
      )}
    </div>
  );
}

export default Video;
