import { useEffect, useState } from "react";
import { Button, Input } from "@/components/ui";
import { Radio, Users } from "lucide-react";
import Camera from "./Camera";
import ScreenShare from "./ScreenShare";
import zg from "@/utils/zg";
import useLivestream from "@/hooks/useLivestream";
import { randomID } from "@/utils/format";
import { getUrlParams } from "@/utils/params";
import { useNavigate } from "react-router-dom";

function StartLive() {
  const roomID = getUrlParams().get("roomID") || randomID(5);
  const { createLivestream, isStartingLive } = useLivestream();
  const navigate = useNavigate();
  const [room, setRoom] = useState("");

  const handleCreateRoom = () => {
    navigate(`/room?roomID=${roomID}&role=Cohost`);
  };

  const handleJoinRoom = () => {
    navigate(`/room?roomID=${room}&role=Audience`);
  };

  useEffect(() => {
    zg.on("roomStateUpdate", (roomID, state, errorCode, extendedData) => {
      if (state == "DISCONNECTED") {
        // Disconnected from the room
      }

      if (state == "CONNECTING") {
        // Connecting to the room
      }

      if (state == "CONNECTED") {
        // Connected to the room
      }
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
            onClick={handleCreateRoom}
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
              value={room}
              onChange={(e) => setRoom(e.target.value)}
              className="flex-1"
            />
            <Button
              disabled={!room.trim()}
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
