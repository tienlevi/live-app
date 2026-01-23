import {
  Button,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui";
import { useCallStateHooks, VideoPreview } from "@stream-io/video-react-sdk";
import { Mic, MicOff, Users, Video, VideoOff } from "lucide-react";

function DisabledVideoPreview() {
  return (
    <div className="flex h-full w-full items-center justify-center bg-card">
      <div className="flex flex-col items-center gap-2 text-muted-foreground">
        <VideoOff className="h-16 w-16" />
        <span className="text-sm">Camera is off</span>
      </div>
    </div>
  );
}

function NoCameraPreview() {
  return (
    <div className="flex h-full w-full items-center justify-center bg-card">
      <div className="flex flex-col items-center gap-2 text-muted-foreground">
        <VideoOff className="h-16 w-16" />
        <span className="text-sm">No camera detected</span>
      </div>
    </div>
  );
}

function Camera() {
  const {
    useCameraState,
    useMicrophoneState,
    useIsCallLive,
    useParticipantCount,
  } = useCallStateHooks();
  const isLive = useIsCallLive();
  const participantCount = useParticipantCount();
  const { camera, isMute: isCameraMuted } = useCameraState();
  const { microphone, isMute: isMicMuted } = useMicrophoneState();
  const toggleCamera = async () => {
    try {
      await camera.toggle();
    } catch (error) {
      console.error("Failed to toggle camera:", error);
    }
  };

  const toggleMicrophone = async () => {
    try {
      await microphone.toggle();
    } catch (error) {
      console.error("Failed to toggle microphone:", error);
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
          <VideoPreview
            mirror={true}
            DisabledVideoPreview={DisabledVideoPreview}
            NoCameraPreview={NoCameraPreview}
          />
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
            variant={!isCameraMuted ? "secondary" : "destructive"}
            size="icon"
            onClick={toggleCamera}
            className="h-12 w-12 rounded-full"
            title={isCameraMuted ? "Turn on camera" : "Turn off camera"}
          >
            {!isCameraMuted ? (
              <Video className="h-5 w-5" />
            ) : (
              <VideoOff className="h-5 w-5" />
            )}
          </Button>
          <Button
            variant={!isMicMuted ? "secondary" : "destructive"}
            size="icon"
            onClick={toggleMicrophone}
            className="h-12 w-12 rounded-full"
            title={isMicMuted ? "Unmute" : "Mute"}
          >
            {!isMicMuted ? (
              <Mic className="h-5 w-5" />
            ) : (
              <MicOff className="h-5 w-5" />
            )}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

export default Camera;
