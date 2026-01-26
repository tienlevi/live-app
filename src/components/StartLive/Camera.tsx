import { useState, useRef } from "react";
import {
  Button,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui";
import { Users, Video, VideoOff } from "lucide-react";
import { cn } from "@/lib/utils";

interface CameraProps {
  isLive?: boolean;
  participantCount?: number;
}

function Camera({ isLive = false, participantCount = 0 }: CameraProps) {
  const [isOpenCamera, setIsOpenCamera] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const toggleCamera = async () => {
    try {
      if (isOpenCamera) {
        if (videoRef.current && videoRef.current.srcObject) {
          const stream = videoRef.current.srcObject as MediaStream;
          stream.getTracks().forEach((track) => track.stop());
          videoRef.current.srcObject = null;
        }
        setIsOpenCamera(false);
      } else {
        const camera = await navigator.mediaDevices.getUserMedia({
          video: true,
          audio: true,
        });
        if (videoRef.current) {
          videoRef.current.srcObject = camera;
        }
        setIsOpenCamera(true);
      }
    } catch (error) {
      console.error("Failed to toggle camera:", error);
    }
  };

  const toggleMicrophone = async () => {};

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
                  !isOpenCamera && "hidden",
                )}
              />
              {!isOpenCamera && (
                <div className="flex flex-col items-center gap-2">
                  <VideoOff className="h-16 w-16" />
                  <span className="text-sm">Camera is off</span>
                </div>
              )}
            </div>
          </div>
          {isLive && (
            <div className="absolute left-3 top-3 flex items-center gap-2 rounded-md bg-red-600 px-2 py-1 text-xs font-medium text-white">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-white opacity-75"></span>
                <span className="relative inline-flex h-2 w-2 rounded-full bg-white"></span>
              </span>
              LIVE
            </div>
          )}
          {isLive && (
            <div className="absolute right-3 top-3 flex items-center gap-1 rounded-md bg-black/60 px-2 py-1 text-xs text-white">
              <Users className="h-3 w-3" />
              {participantCount}
            </div>
          )}
        </div>

        {/* Camera/Mic Controls */}
        <div className="flex items-center justify-center gap-3">
          <Button
            variant={isOpenCamera ? "secondary" : "destructive"}
            size="icon"
            onClick={toggleCamera}
            className="h-12 w-12 rounded-full"
            title={isOpenCamera ? "Turn off camera" : "Turn on camera"}
          >
            {isOpenCamera ? (
              <Video className="h-5 w-5" />
            ) : (
              <VideoOff className="h-5 w-5" />
            )}
          </Button>
          <Button
            // variant={isMicrophoneEnabled ? "secondary" : "destructive"}
            size="icon"
            onClick={toggleMicrophone}
            className="h-12 w-12 rounded-full"
            // title={isMicrophoneEnabled ? "Mute" : "Unmute"}
          >
            {/* {isMicrophoneEnabled ? (
              <Mic className="h-5 w-5" />
            ) : (
              <MicOff className="h-5 w-5" />
            )} */}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

export default Camera;
