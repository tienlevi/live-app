import { cn } from '@/lib/utils';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Eye, Bell, BellOff, Users } from 'lucide-react';

interface StreamInfoProps {
  streamerName: string;
  streamerAvatar?: string;
  title: string;
  category?: string;
  viewerCount: number;
  followerCount?: number;
  isFollowing?: boolean;
  isNotificationsOn?: boolean;
  onFollow?: () => void;
  onToggleNotifications?: () => void;
  className?: string;
}

export default function StreamInfo({
  streamerName,
  streamerAvatar,
  title,
  category,
  viewerCount,
  followerCount,
  isFollowing = false,
  isNotificationsOn = false,
  onFollow,
  onToggleNotifications,
  className,
}: StreamInfoProps) {
  return (
    <div className={cn('flex items-start justify-between gap-4 p-4', className)}>
      {/* Left: Streamer Info */}
      <div className="flex items-start gap-3 min-w-0">
        {/* Avatar with online indicator */}
        <div className="relative flex-shrink-0">
          <Avatar className="h-12 w-12 ring-2 ring-primary ring-offset-2 ring-offset-background">
            <AvatarImage src={streamerAvatar} alt={streamerName} />
            <AvatarFallback className="bg-primary text-primary-foreground font-bold">
              {streamerName.charAt(0).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-background bg-green-500" />
        </div>

        {/* Stream Details */}
        <div className="min-w-0 flex-1">
          <h1 className="truncate text-lg font-bold text-foreground">{title}</h1>
          <div className="flex flex-wrap items-center gap-2 text-sm">
            <span className="font-semibold text-primary">{streamerName}</span>
            {category && (
              <>
                <span className="text-muted-foreground">•</span>
                <Badge variant="secondary" className="font-normal">
                  {category}
                </Badge>
              </>
            )}
          </div>
          {followerCount !== undefined && (
            <div className="mt-1 flex items-center gap-1 text-xs text-muted-foreground">
              <Users className="h-3 w-3" />
              <span>{formatCount(followerCount)} followers</span>
            </div>
          )}
        </div>
      </div>

      {/* Right: Stats & Actions */}
      <div className="flex flex-shrink-0 items-center gap-3">
        {/* Viewer Count */}
        <div className="flex items-center gap-1.5 rounded-lg bg-secondary px-3 py-1.5">
          <Eye className="h-4 w-4 text-red-500" />
          <span className="text-sm font-semibold">{formatCount(viewerCount)}</span>
        </div>

        {/* Notifications Toggle */}
        {isFollowing && (
          <Button
            variant="ghost"
            size="icon"
            onClick={onToggleNotifications}
            className="h-9 w-9"
          >
            {isNotificationsOn ? (
              <Bell className="h-4 w-4 text-primary" />
            ) : (
              <BellOff className="h-4 w-4" />
            )}
          </Button>
        )}

        {/* Follow Button */}
        <Button
          onClick={onFollow}
          variant={isFollowing ? 'secondary' : 'default'}
          className={cn(
            'font-semibold',
            !isFollowing && 'bg-primary hover:bg-primary/90'
          )}
        >
          {isFollowing ? 'Following' : 'Follow'}
        </Button>
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
