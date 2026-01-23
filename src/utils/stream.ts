import { streamConfig } from "@/constants/configs";
import { StreamVideoClient, User, Call } from "@stream-io/video-react-sdk";

// ============================================
// UTILITY FUNCTIONS
// ============================================

// Generate a unique call ID
export const generateCallId = (): string => {
  return `livestream-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;
};

// Generate a unique user ID
export const generateUserId = (): string => {
  return Math.random().toString(36).substring(2, 10);
};

// Get call by ID without joining
export const getCall = (callId: string, client: StreamVideoClient): Call => {
  return client.call("livestream", callId);
};

// Disconnect client
export const disconnectClient = async (
  client: StreamVideoClient,
): Promise<void> => {
  await client.disconnectUser();
};

// Get config from environment variables

// Create a Stream Video client

// Create an anonymous client for viewers
export const createAnonymousClient = (apiKey?: string): StreamVideoClient => {
  const envApiKey = apiKey || import.meta.env.VITE_STREAM_API_KEY;

  if (!envApiKey) {
    throw new Error("Missing Stream API key");
  }

  const user: User = { type: "anonymous" };

  return new StreamVideoClient({
    apiKey: envApiKey,
    user,
  });
};

// ============================================
// HOST FUNCTIONS
// ============================================

// Create and join a livestream as host
export const createLivestream = () => {
  const userId = generateUserId();
  const callId = generateCallId();

  const user: User = {
    id: userId,
  };
  console.log(streamConfig);

  const streamClient = new StreamVideoClient({
    apiKey: streamConfig.apiKey,
    user,
    token: streamConfig.token,
  });
  const call = streamClient.call("livestream", callId);
  call.join({ create: true });

  return { client: streamClient, call: call };
};

// ============================================
// VIEWER FUNCTIONS
// ============================================

// Join a livestream as viewer
export const joinLivestreamAsViewer = async (
  callId: string,
  client?: StreamVideoClient,
) => {
  const streamClient = client || createAnonymousClient();
  const call = streamClient.call("livestream", callId);

  await call.join();

  return { client: streamClient, call };
};

// Leave the livestream
export const leaveLivestream = async (call: Call): Promise<void> => {
  await call.leave();
};
