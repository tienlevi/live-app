import { StreamVideoClient, User } from "@stream-io/video-react-sdk";

export const streamVideo = () => {
  const apiKey = import.meta.env.VITE_STREAM_API_KEY;
  const userId = import.meta.env.VITE_STREAM_USER_ID;
  const token = import.meta.env.VITE_STREAM_TOKEN;

  const user: User = { id: userId };
  const client = new StreamVideoClient({ apiKey, user, token });
  const call = client.call("default", "demo-call-PuJepdEv");
  //   call.join({ create: true });

  return { client, call };
};
