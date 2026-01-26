import {
  BarChart3,
  Gift,
  MessageCircle,
  Monitor,
  Users,
  Video,
} from "lucide-react";

export const features = [
  {
    icon: Video,
    title: "HD Live Streaming",
    description:
      "Broadcast in crystal-clear high definition with ultra-low latency for seamless viewer experience.",
  },
  {
    icon: MessageCircle,
    title: "Real-time Chat",
    description:
      "Engage with your audience through interactive live chat with emojis and reactions.",
  },
  {
    icon: Gift,
    title: "Virtual Gifts",
    description:
      "Let viewers show support with virtual gifts and build a monetized community.",
  },
  {
    icon: Monitor,
    title: "Screen Sharing",
    description:
      "Share your screen for tutorials, gaming, or presentations with one click.",
  },
  {
    icon: Users,
    title: "Community Building",
    description:
      "Build your following with subscribers, followers, and VIP member badges.",
  },
  {
    icon: BarChart3,
    title: "Analytics Dashboard",
    description:
      "Track viewer engagement, growth metrics, and revenue insights in real-time.",
  },
];

export const stats = [
  { value: "10K+", label: "Active Streamers" },
  { value: "1M+", label: "Monthly Viewers" },
  { value: "99.9%", label: "Uptime" },
  { value: "< 1s", label: "Latency" },
];
