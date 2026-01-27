import { Link } from "react-router-dom";
import { Button } from "@/components/ui";
import { PlayCircle, Video } from "lucide-react";

function Hero() {
  return (
    <section className="relative overflow-hidden px-4 py-20 sm:px-6 lg:px-8">
      {/* Background gradient */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-0 h-[500px] w-[800px] -translate-x-1/2 rounded-full bg-primary/20 blur-3xl" />
      </div>

      <div className="mx-auto max-w-4xl text-center">
        <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-sm text-primary">
          <span className="relative flex size-2">
            <span className="absolute inline-flex size-full animate-ping rounded-full bg-primary opacity-75" />
            <span className="relative inline-flex size-2 rounded-full bg-primary" />
          </span>
          Now Live - Join thousands of streamers
        </div>

        <h1 className="mb-6 text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
          Go Live. Connect. <span className="text-primary">Grow Together.</span>
        </h1>

        <p className="mx-auto mb-10 max-w-2xl text-lg text-muted-foreground">
          The ultimate live streaming platform for creators. Broadcast in HD,
          engage with real-time chat, receive virtual gifts, and build a
          thriving community.
        </p>

        <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Button size="lg" className="w-full sm:w-auto" asChild>
            <Link to="/room">
              <PlayCircle className="mr-2 size-5" />
              Watch Live
            </Link>
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="w-full sm:w-auto"
            asChild
          >
            <Link to="/livestream">
              <Video className="mr-2 size-5" />
              Start Streaming
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}

export default Hero;
