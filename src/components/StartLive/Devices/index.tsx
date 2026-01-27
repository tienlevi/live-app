import { useLivestreamStore } from "@/stores/useLivestreamStore";
import CameraMic from "./CameraMic";
import ScreenShare from "./ScreenShare";

function Devices() {
  const { isPublishing, isPlaying, roomState } = useLivestreamStore();
  const isConnected = roomState === "connected";
  const isLive = isConnected && (isPublishing || isPlaying);

  if (isLive) return;

  return (
    <div className={"grid grid-cols-2 gap-2"}>
      <CameraMic />
      <ScreenShare />
    </div>
  );
}

export default Devices;
