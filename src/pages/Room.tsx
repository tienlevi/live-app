import { Button } from "@/components/ui";
import { getUrlParams } from "@/utils/params";
import { Radio } from "lucide-react";
import { useEffect, useRef } from "react";
import { ZegoUIKitPrebuilt } from "@zegocloud/zego-uikit-prebuilt";
import { randomID } from "@/utils/format";
import { appID, serverSecret } from "@/constants";

function Room() {
  const videoRef = useRef<HTMLDivElement>(null);
  const roomID = getUrlParams().get("roomID") || randomID(5);
  let role_str = getUrlParams(window.location.href).get("role") || "Host";
  const role =
    role_str === "Host"
      ? ZegoUIKitPrebuilt.Host
      : role_str === "Cohost"
        ? ZegoUIKitPrebuilt.Cohost
        : ZegoUIKitPrebuilt.Audience;

  let sharedLinks = [];
  if (role === ZegoUIKitPrebuilt.Host || role === ZegoUIKitPrebuilt.Cohost) {
    sharedLinks.push({
      name: "Join as co-host",
      url:
        window.location.protocol +
        "//" +
        window.location.host +
        window.location.pathname +
        "?roomID=" +
        roomID +
        "&role=Cohost",
    });
  }
  sharedLinks.push({
    name: "Join as audience",
    url:
      window.location.protocol +
      "//" +
      window.location.host +
      window.location.pathname +
      "?roomID=" +
      roomID +
      "&role=Audience",
  });

  const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(
    appID,
    serverSecret,
    roomID,
    randomID(5),
    randomID(5),
  );

  // start the call
  const myMeeting = async (element: HTMLDivElement) => {
    // Create instance object from Kit Token.
    const zp = ZegoUIKitPrebuilt.create(kitToken);
    // start the call
    zp.joinRoom({
      container: element,
      scenario: {
        mode: ZegoUIKitPrebuilt.LiveStreaming,
        config: {
          role,
        },
      },
      sharedLinks,
    });
  };

  useEffect(() => {
    if (!roomID) return;
    if (videoRef.current) {
      myMeeting(videoRef.current);
    }
  }, [roomID, videoRef.current]);

  return (
    <div className="mt-20">
      <div className="relative w-full">
        {/* Live Video Container */}
        <div
          ref={videoRef}
          className="aspect-video w-full overflow-hidden rounded-lg bg-black"
        ></div>

        {/* Live Indicator Badge */}
        <div className="absolute left-4 top-4 flex items-center gap-2 rounded-md bg-red-600 px-3 py-1.5 text-sm font-semibold text-white shadow-lg">
          <span className="relative flex h-2.5 w-2.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-white opacity-75"></span>
            <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-white"></span>
          </span>
          LIVE
        </div>

        {/* Stream Controls Overlay */}
        <div className="absolute bottom-0 left-0 right-0 bg-linear-to-t from-black/70 to-transparent p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3 text-white">
              <Radio className="h-5 w-5 text-red-500" />
              <span className="text-sm font-medium">You are live</span>
            </div>
            <Button variant="destructive" size="sm" className="gap-2">
              <span className="h-3 w-3 rounded-sm bg-white"></span>
              End Stream
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Room;
