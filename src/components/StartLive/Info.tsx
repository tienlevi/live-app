import useLivestream from "@/hooks/useLivestream";
import { useLivestreamStore } from "@/stores/useLivestreamStore";

function Info() {
  const { roomID, userID, usernameParams, role } = useLivestream();
  const { roomState, remoteStreams } = useLivestreamStore();

  return (
    <div className="mt-4 rounded-lg bg-zinc-900 p-4 text-white">
      <h3 className="font-semibold">Stream Info</h3>
      <div className="mt-2 space-y-1 text-sm text-zinc-400">
        <p>Room ID: {roomID}</p>
        <p>User ID: {userID}</p>
        <p>User: {usernameParams}</p>
        <p>Role: {role === "host" ? "Host" : "Audience"}</p>
        <p>Status: {roomState}</p>
        {remoteStreams.length > 0 && (
          <p>Active streams: {remoteStreams.length}</p>
        )}
      </div>
    </div>
  );
}

export default Info;
