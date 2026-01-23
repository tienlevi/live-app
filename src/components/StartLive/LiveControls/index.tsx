import { useCall, useCallStateHooks } from "@stream-io/video-react-sdk";
import { Button, Card, CardContent } from "@/components/ui";
import { Radio } from "lucide-react";
import Camera from "./Camera";
import ScreenShare from "./ScreenShare";

function LiveControls() {
  const { useParticipantCount, useIsCallLive } = useCallStateHooks();

  const call = useCall();
  const participantCount = useParticipantCount();
  const isLive = useIsCallLive();

  const handleGoLive = async () => {
    if (isLive) {
      await call?.stopLive();
    } else {
      await call?.goLive({ start_recording: true });
    }
  };

  return (
    <div className="grid gap-6 grid-cols-2">
      {/* Preview Section */}
      <Camera />

      {/* Screen Share & Actions Section */}
      <div className="space-y-4">
        <ScreenShare />

        {/* Go Live Button */}
        <Card>
          <CardContent className="pt-6">
            <Button
              onClick={handleGoLive}
              variant={isLive ? "destructive" : "default"}
              className="w-full gap-2 py-6 text-lg"
              size="lg"
            >
              <Radio className="h-5 w-5" />
              {isLive ? "Stop Live" : "Go Live"}
            </Button>

            {isLive && (
              <div className="mt-4 flex items-center justify-center gap-2 text-sm">
                <span className="relative flex h-3 w-3">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-400 opacity-75"></span>
                  <span className="relative inline-flex h-3 w-3 rounded-full bg-red-500"></span>
                </span>
                <span className="text-destructive-foreground">
                  You are live with {participantCount} viewer
                  {participantCount !== 1 ? "s" : ""}
                </span>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default LiveControls;
