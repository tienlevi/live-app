import { useState } from 'react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import {
  Heart,
  Share2,
  Gift,
  MoreHorizontal,
  Twitter,
  Facebook,
  MessageCircle,
  Flag,
  Copy,
} from 'lucide-react';

interface ActionBarProps {
  likeCount: number;
  isLiked?: boolean;
  onLike?: () => void;
  onShare?: () => void;
  onGift?: () => void;
  onReport?: () => void;
  className?: string;
}

export default function ActionBar({
  likeCount,
  isLiked = false,
  onLike,
  onShare,
  onGift,
  onReport,
  className,
}: ActionBarProps) {
  const [showShareMenu, setShowShareMenu] = useState(false);
  const [showMoreMenu, setShowMoreMenu] = useState(false);

  const shareOptions = [
    { icon: Copy, label: 'Copy Link', action: () => { onShare?.(); setShowShareMenu(false); } },
    { icon: Twitter, label: 'Twitter / X', action: () => setShowShareMenu(false) },
    { icon: Facebook, label: 'Facebook', action: () => setShowShareMenu(false) },
    { icon: MessageCircle, label: 'WhatsApp', action: () => setShowShareMenu(false) },
  ];

  return (
    <div className={cn('flex items-center justify-between border-t px-4 py-3', className)}>
      {/* Left Actions */}
      <div className="flex items-center gap-2">
        {/* Like Button */}
        <Button
          variant={isLiked ? 'default' : 'secondary'}
          size="sm"
          onClick={onLike}
          className={cn(
            'gap-2',
            isLiked && 'bg-red-500 hover:bg-red-600'
          )}
        >
          <Heart className={cn('h-4 w-4', isLiked && 'fill-current')} />
          <span>{formatCount(likeCount)}</span>
        </Button>

        {/* Share Button */}
        <div className="relative">
          <Button
            variant="secondary"
            size="sm"
            onClick={() => setShowShareMenu(!showShareMenu)}
            className="gap-2"
          >
            <Share2 className="h-4 w-4" />
            <span>Share</span>
          </Button>

          {/* Share Dropdown */}
          {showShareMenu && (
            <>
              <div
                className="fixed inset-0 z-40"
                onClick={() => setShowShareMenu(false)}
              />
              <Card className="absolute bottom-full left-0 z-50 mb-2 w-44 p-1 shadow-lg">
                {shareOptions.map((option) => (
                  <Button
                    key={option.label}
                    variant="ghost"
                    size="sm"
                    className="w-full justify-start gap-2"
                    onClick={option.action}
                  >
                    <option.icon className="h-4 w-4" />
                    {option.label}
                  </Button>
                ))}
              </Card>
            </>
          )}
        </div>
      </div>

      {/* Right Actions */}
      <div className="flex items-center gap-2">
        {/* Gift Button */}
        <Button
          onClick={onGift}
          size="sm"
          className="gap-2 bg-gradient-to-r from-yellow-500 to-orange-500 text-white hover:from-yellow-400 hover:to-orange-400"
        >
          <Gift className="h-4 w-4" />
          <span>Send Gift</span>
        </Button>

        {/* More Options */}
        <div className="relative">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setShowMoreMenu(!showMoreMenu)}
            className="h-8 w-8"
          >
            <MoreHorizontal className="h-4 w-4" />
          </Button>

          {showMoreMenu && (
            <>
              <div
                className="fixed inset-0 z-40"
                onClick={() => setShowMoreMenu(false)}
              />
              <Card className="absolute bottom-full right-0 z-50 mb-2 w-40 p-1 shadow-lg">
                <Button
                  variant="ghost"
                  size="sm"
                  className="w-full justify-start gap-2 text-destructive hover:text-destructive"
                  onClick={() => {
                    onReport?.();
                    setShowMoreMenu(false);
                  }}
                >
                  <Flag className="h-4 w-4" />
                  Report Stream
                </Button>
              </Card>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

function formatCount(count: number): string {
  if (count >= 1000000) {
    return `${(count / 1000000).toFixed(1)}M`;
  }
  if (count >= 1000) {
    return `${(count / 1000).toFixed(1)}K`;
  }
  return count.toString();
}
