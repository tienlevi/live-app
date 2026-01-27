import { useState, useRef } from "react";
import {
  Button,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui";
import { Video, VideoOff } from "lucide-react";
import { cn } from "@/lib/utils";

function Camera() {
  const [isOpen, setIsOpen] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const toggleCameraAndMicrophone = async () => {
    try {
      if (isOpen) {
        if (videoRef.current && videoRef.current.srcObject) {
          const stream = videoRef.current.srcObject as MediaStream;
          stream.getTracks().forEach((track) => track.stop());
          videoRef.current.srcObject = null;
        }
        setIsOpen(false);
      } else {
        const devices = await navigator.mediaDevices.getUserMedia({
          video: true,
          audio: true,
        });
        if (videoRef.current) {
          videoRef.current.srcObject = devices;
        }
        setIsOpen(true);
      }
    } catch (error) {
      console.error("Failed to toggle camera:", error);
    }
  };

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-lg">
          <Video className="h-5 w-5" />
          Camera Preview
        </CardTitle>
        <CardDescription>
          Check your camera and microphone before going live
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="relative aspect-video overflow-hidden rounded-lg bg-black">
          <div className="flex h-full w-full items-center justify-center bg-card">
            <div className="flex flex-col items-center gap-2 text-muted-foreground">
              <video
                ref={videoRef}
                autoPlay
                muted
                playsInline
                className={cn(
                  "h-full w-full object-contain absolute inset-0 rounded-lg",
                  !isOpen && "hidden",
                )}
              />
              {!isOpen && (
                <div className="flex flex-col items-center gap-2">
                  <VideoOff className="h-16 w-16" />
                  <span className="text-sm">Camera is off</span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Camera/Mic Controls */}
        <div className="flex items-center justify-center gap-3">
          <Button
            variant={isOpen ? "destructive" : "secondary"}
            size="icon"
            onClick={toggleCameraAndMicrophone}
            className="w-full rounded-lg"
          >
            {isOpen ? <div>Turn off devices</div> : <div>Turn on devices</div>}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

export default Camera;
