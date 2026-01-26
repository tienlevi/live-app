import { appID, serverSecret } from "@/constants";
import { ZegoExpressEngine } from "zego-express-engine-webrtc";

const zg = new ZegoExpressEngine(appID, serverSecret);

export default zg;
