import { useRef, useState } from "react";
import {
  Button,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui";
import { cn } from "@/lib/utils";
import { Monitor, MonitorOff } from "lucide-react";

function ScreenShare() {
  const [isScreenSharing, setIsScreenSharing] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const toggleShareScreen = async () => {
    try {
      if (isScreenSharing) {
        if (videoRef.current && videoRef.current.srcObject) {
          const stream = videoRef.current.srcObject as MediaStream;
          stream.getTracks().forEach((track) => track.stop());
          videoRef.current.srcObject = null;
        }
        setIsScreenSharing(false);
      } else {
        const mediaStream = await navigator.mediaDevices.getDisplayMedia({
          video: true,
          audio: true,
        });

        if (videoRef.current) {
          videoRef.current.srcObject = mediaStream;
        }
        setIsScreenSharing(true);
      }
    } catch (error) {
      console.error("Failed to toggle screen share:", error);
    }
  };

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-lg">
          <Monitor className="h-5 w-5" />
          Screen Share
        </CardTitle>
        <CardDescription>Share your screen with viewers</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div
          onClick={toggleShareScreen}
          className={cn(
            "flex aspect-video cursor-pointer items-center justify-center rounded-lg border-2 border-dashed transition-all",
            isScreenSharing
              ? "border-primary bg-primary/10"
              : "border-border bg-muted/50 hover:border-primary/50 hover:bg-muted",
          )}
        >
          <div className="relative flex flex-col items-center justify-center gap-3 text-center w-full h-full">
            <video
              ref={videoRef}
              autoPlay
              muted
              playsInline
              className={cn(
                "h-full w-full object-contain absolute inset-0 rounded-lg",
                !isScreenSharing && "hidden",
              )}
            />
            {!isScreenSharing && (
              <div className="flex flex-col items-center gap-3">
                <MonitorOff className="h-12 w-12 text-muted-foreground" />
                <div>
                  <p className="font-medium">Share your screen</p>
                  <p className="text-xs text-muted-foreground">
                    Click to start sharing
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>

        <Button
          variant={isScreenSharing ? "destructive" : "outline"}
          onClick={toggleShareScreen}
          className="w-full gap-2"
        >
          {isScreenSharing ? (
            <>
              <MonitorOff className="h-4 w-4" />
              Stop Screen Share
            </>
          ) : (
            <>
              <Monitor className="h-4 w-4" />
              Start Screen Share
            </>
          )}
        </Button>
      </CardContent>
    </Card>
  );
}

export default ScreenShare;
