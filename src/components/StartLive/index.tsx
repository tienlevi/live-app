import { useEffect, useState } from "react";
import { Button, Input } from "@/components/ui";
import { Radio, Users } from "lucide-react";
import Camera from "./Camera";
import ScreenShare from "./ScreenShare";
import zg from "@/utils/zg";
import useLivestream from "@/hooks/useLivestream";

function StartLive() {
  const { createLivestream, isStartingLive } = useLivestream();
  const [roomId, setRoomId] = useState("");

  const handleJoinRoom = () => {
    if (roomId.trim()) {
      // TODO: Implement join room logic
      console.log("Joining room:", roomId);
    }
  };

  useEffect(() => {
    zg.on("publisherStateUpdate", (result) => {
      console.log("🚀 ~ useLivestream ~ result:", result);
      // Callback for updates on stream publishing status.
      // ...
    });

    zg.on("publishQualityUpdate", (streamID, stats) => {
      console.log("🚀 ~ useLivestream ~ streamID:", streamID);
      console.log("🚀 ~ useLivestream ~ stats:", stats);
      // Callback for reporting stream publishing quality.
      // ...
    });
  }, []);

  return (
    <div className="my-4">
      <div className="grid grid-cols-2 gap-6">
        <Camera />
        <div className="space-y-4">
          <ScreenShare />
          <Button
            disabled={isStartingLive}
            onClick={() => createLivestream()}
            variant={"default"}
            className="w-full gap-2 py-6 text-lg"
            size="lg"
          >
            <Radio className="h-5 w-5" />
            {isStartingLive ? "Loading..." : "Go Live"}
          </Button>
          <div className="flex items-center gap-2">
            <div className="h-px flex-1 bg-border" />
            <span className="text-sm text-muted-foreground">or</span>
            <div className="h-px flex-1 bg-border" />
          </div>
          <div className="flex gap-2">
            <Input
              placeholder="Enter Room ID"
              value={roomId}
              onChange={(e) => setRoomId(e.target.value)}
              className="flex-1"
            />
            <Button
              disabled={!roomId.trim()}
              onClick={handleJoinRoom}
              variant="outline"
              size="lg"
              className="gap-2"
            >
              <Users className="h-5 w-5" />
              Join
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default StartLive;
