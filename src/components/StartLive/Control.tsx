import { Loader2, Radio } from "lucide-react";
import { Button, Input } from "@/components/ui";
import { useLivestreamStore } from "@/stores/useLivestreamStore";
import useLivestream from "@/hooks/useLivestream";

function Control() {
  const { role, handleStartStream, handleStopStream } = useLivestream();

  const { roomState, isPlaying, isPublishing, username, setUsername } =
    useLivestreamStore();
  const isConnected = roomState === "connected";
  const isConnecting = roomState === "connecting";
  const isLive = isConnected && (isPublishing || isPlaying);

  return (
    <div className="absolute bottom-0 left-0 right-0 bg-linear-to-t from-black/70 to-transparent p-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3 text-white">
          <Radio className="h-5 w-5 text-red-500" />
          <span className="text-sm font-medium">
            {isLive
              ? role === "host"
                ? "You are live"
                : "Watching live"
              : role === "host"
                ? "Ready to go live"
                : "Ready to watch"}
          </span>
        </div>
        {!isConnected ? (
          <div className="flex items-center gap-2">
            <Input
              onChange={(e) => setUsername(e.target.value)}
              value={username}
              placeholder="Enter username"
            />
            <Button
              onClick={handleStartStream}
              disabled={isConnecting}
              size="sm"
              className="gap-2"
            >
              {isConnecting ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Connecting...
                </>
              ) : role === "host" ? (
                "Go Live"
              ) : (
                "Join Stream"
              )}
            </Button>
          </div>
        ) : (
          <Button
            variant="destructive"
            size="sm"
            className="gap-2"
            onClick={handleStopStream}
          >
            {role === "host" ? "End Stream" : "Leave"}
          </Button>
        )}
      </div>
    </div>
  );
}

export default Control;
