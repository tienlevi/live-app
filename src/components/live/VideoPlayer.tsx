import { useState } from 'react';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Play,
  Pause,
  Volume2,
  VolumeX,
  Settings,
  Maximize,
  Minimize,
} from 'lucide-react';

interface VideoPlayerProps {
  streamUrl?: string;
  isLive?: boolean;
  thumbnailUrl?: string;
  className?: string;
}

export default function VideoPlayer({
  streamUrl,
  isLive = true,
  thumbnailUrl,
  className,
}: VideoPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showControls, setShowControls] = useState(false);

  return (
    <div
      className={cn(
        'relative aspect-video w-full overflow-hidden rounded-xl bg-black',
        className
      )}
      onMouseEnter={() => setShowControls(true)}
      onMouseLeave={() => setShowControls(false)}
    >
      {/* Video / Placeholder */}
      <div className="absolute inset-0">
        {streamUrl ? (
          <video
            src={streamUrl}
            className="h-full w-full object-cover"
            autoPlay
            muted={isMuted}
            playsInline
          />
        ) : thumbnailUrl ? (
          <img
            src={thumbnailUrl}
            alt="Stream thumbnail"
            className="h-full w-full object-cover"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
            <div className="text-center">
              <div className="mb-4 text-6xl">🎬</div>
              <p className="text-muted-foreground">Stream starting soon...</p>
            </div>
          </div>
        )}
      </div>

      {/* Live Badge */}
      {isLive && (
        <div className="absolute left-4 top-4 z-10">
          <Badge variant="live" className="gap-1.5">
            <span className="h-2 w-2 rounded-full bg-white" />
            LIVE
          </Badge>
        </div>
      )}

      {/* Viewer Quality Badge */}
      <div className="absolute right-4 top-4 z-10">
        <Badge variant="secondary" className="bg-black/60 backdrop-blur-sm">
          1080p
        </Badge>
      </div>

      {/* Controls Overlay */}
      <div
        className={cn(
          'absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent p-4 transition-opacity duration-300',
          showControls ? 'opacity-100' : 'opacity-0'
        )}
      >
        {/* Progress Bar */}
        <div className="mb-3 h-1 w-full overflow-hidden rounded-full bg-white/20">
          <div className="h-full w-full bg-primary" />
        </div>

        {/* Control Buttons */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 text-white hover:bg-white/20"
              onClick={() => setIsPlaying(!isPlaying)}
            >
              {isPlaying ? (
                <Pause className="h-5 w-5" />
              ) : (
                <Play className="h-5 w-5" />
              )}
            </Button>

            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 text-white hover:bg-white/20"
              onClick={() => setIsMuted(!isMuted)}
            >
              {isMuted ? (
                <VolumeX className="h-5 w-5" />
              ) : (
                <Volume2 className="h-5 w-5" />
              )}
            </Button>

            <span className="ml-2 text-sm text-white/80">
              {isLive ? 'LIVE' : '00:00'}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 text-white hover:bg-white/20"
            >
              <Settings className="h-4 w-4" />
            </Button>

            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 text-white hover:bg-white/20"
              onClick={() => setIsFullscreen(!isFullscreen)}
            >
              {isFullscreen ? (
                <Minimize className="h-4 w-4" />
              ) : (
                <Maximize className="h-4 w-4" />
              )}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
