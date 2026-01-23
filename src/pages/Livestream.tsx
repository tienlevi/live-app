import { Radio } from "lucide-react";
import StartLive from "@/components/StartLive";

function Livestream() {
  return (
    <div className="min-h-screen bg-background p-6">
      <div className="mx-auto max-w-6xl mt-20">
        <div className="mb-6 flex items-center gap-3">
          <Radio className="h-8 w-8 text-primary" />
          <h1 className="text-2xl font-bold text-foreground">
            Start Live Stream
          </h1>
        </div>
        <StartLive />
      </div>
    </div>
  );
}

export default Livestream;
