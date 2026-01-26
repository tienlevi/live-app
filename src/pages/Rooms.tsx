import { Button } from "@/components/ui";
import { Radio } from "lucide-react";

function Rooms() {
  return (
    <div className="mt-20">
      <div className="relative w-full">
        {/* Live Video Container */}
        <div className="aspect-video w-full overflow-hidden rounded-lg bg-black"></div>

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

export default Rooms;
