import { useState, useCallback } from "react";
import { ChatMessageData } from "./ChatMessage";
import VideoPlayer from "./VideoPlayer";
import StreamInfo from "./StreamInfo";
import ActionBar from "./ActionBar";
import LiveChat from "./LiveChat";
import GiftPanel from "./GiftPanel";

// Mock data for demonstration
const MOCK_MESSAGES: ChatMessageData[] = [
  {
    id: "1",
    username: "StreamFan99",
    message: "Great stream! Love the content!",
    badge: "subscriber",
    timestamp: new Date(),
  },
  {
    id: "2",
    username: "ModeratorMike",
    message: "Welcome everyone to the stream!",
    badge: "moderator",
    timestamp: new Date(),
  },
  {
    id: "3",
    username: "CasualViewer",
    message: "First time here, this is amazing!",
    timestamp: new Date(),
  },
  {
    id: "4",
    username: "VIPVictor",
    message: "Sent a gift! Keep it up!",
    badge: "vip",
    timestamp: new Date(),
    isHighlighted: true,
  },
  {
    id: "5",
    username: "GamerGirl22",
    message: "Can you play my favorite song next?",
    badge: "subscriber",
    timestamp: new Date(),
  },
  {
    id: "6",
    username: "NewUser123",
    message: "Hello from Brazil!",
    timestamp: new Date(),
  },
  {
    id: "7",
    username: "TechEnthusiast",
    message: "What equipment are you using?",
    timestamp: new Date(),
  },
  {
    id: "8",
    username: "MusicLover",
    message: "The audio quality is incredible!",
    badge: "subscriber",
    timestamp: new Date(),
  },
];

function Live() {
  const [messages, setMessages] = useState<ChatMessageData[]>(MOCK_MESSAGES);
  const [isFollowing, setIsFollowing] = useState(false);
  const [isNotificationsOn, setIsNotificationsOn] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(12543);
  const [isGiftPanelOpen, setIsGiftPanelOpen] = useState(false);
  const [userCoins, setUserCoins] = useState(500);

  const handleSendMessage = useCallback((message: string) => {
    const newMessage: ChatMessageData = {
      id: Date.now().toString(),
      username: "You",
      message,
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, newMessage]);
  }, []);

  const handleLike = useCallback(() => {
    setIsLiked((prev) => !prev);
    setLikeCount((prev) => (isLiked ? prev - 1 : prev + 1));
  }, [isLiked]);

  const handleFollow = useCallback(() => {
    setIsFollowing((prev) => !prev);
  }, []);

  const handleToggleNotifications = useCallback(() => {
    setIsNotificationsOn((prev) => !prev);
  }, []);

  const handleSendGift = useCallback(
    (
      gift: { id: string; name: string; emoji: string; price: number },
      quantity: number,
    ) => {
      const totalCost = gift.price * quantity;
      if (totalCost <= userCoins) {
        setUserCoins((prev) => prev - totalCost);

        // Add gift message to chat
        const giftMessage: ChatMessageData = {
          id: Date.now().toString(),
          username: "You",
          message: `sent ${quantity}x ${gift.emoji} ${gift.name}!`,
          timestamp: new Date(),
          isHighlighted: true,
        };
        setMessages((prev) => [...prev, giftMessage]);
        setIsGiftPanelOpen(false);
      }
    },
    [userCoins],
  );
  return (
    <div className="bg-background">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col lg:flex-row lg:gap-4 lg:p-4">
          {/* Main Content */}
          <div className="flex-1">
            {/* Video Player */}
            <VideoPlayer isLive={true} />

            {/* Stream Info */}
            <StreamInfo
              streamerName="CreativeStreamer"
              title="Live Coding Session - Building a Live Streaming App!"
              category="Software Development"
              viewerCount={8234}
              followerCount={125000}
              isFollowing={isFollowing}
              isNotificationsOn={isNotificationsOn}
              onFollow={handleFollow}
              onToggleNotifications={handleToggleNotifications}
            />

            {/* Action Bar */}
            <ActionBar
              likeCount={likeCount}
              isLiked={isLiked}
              onLike={handleLike}
              onGift={() => setIsGiftPanelOpen(true)}
            />
          </div>

          {/* Chat Sidebar */}
          <div className="h-[500px] lg:h-auto lg:w-[380px]">
            <LiveChat
              messages={messages}
              onSendMessage={handleSendMessage}
              isConnected={true}
              className="h-full lg:sticky lg:top-4"
            />
          </div>
        </div>
      </div>

      {/* Gift Panel Modal */}
      <GiftPanel
        isOpen={isGiftPanelOpen}
        onClose={() => setIsGiftPanelOpen(false)}
        onSendGift={handleSendGift}
        userCoins={userCoins}
      />
    </div>
  );
}

export default Live;
