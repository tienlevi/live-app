import { createLivestream } from "@/utils/stream";
import { StreamCall, StreamVideo } from "@stream-io/video-react-sdk";
import LiveControls from "./LiveControls";

function StartLive() {
  const { client, call } = createLivestream();

  return (
    <div className="my-4">
      {client && call ? (
        <StreamVideo client={client}>
          <StreamCall call={call}>
            <LiveControls />
          </StreamCall>
        </StreamVideo>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default StartLive;
