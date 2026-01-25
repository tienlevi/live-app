import { useState } from "react";
import { Button } from "@/components/ui";
import { Radio } from "lucide-react";
import Camera from "./Camera";
import ScreenShare from "./ScreenShare";
import { ZegoExpressEngine } from "zego-express-engine-webrtc";

function StartLive() {
  const [isLive, setIsLive] = useState(false);

  const result = new ZegoExpressEngine(
    1430937564,
    "51f7da9be760621931f9aa95d00823a0",
  );

  const handleGoLive = () => {
    setIsLive((prev) => !prev);
  };

  return (
    <div className="my-4">
      {isLive ? (
        <></>
      ) : (
        <div className="grid grid-cols-2 gap-6">
          <Camera />
          <div className="space-y-4">
            <ScreenShare />
            <Button
              onClick={handleGoLive}
              variant={"default"}
              className="w-full gap-2 py-6 text-lg"
              size="lg"
            >
              <Radio className="h-5 w-5" />
              {"Go Live"}
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}

export default StartLive;
