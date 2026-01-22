import { cn } from '@/lib/utils';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Shield, Star, Crown } from 'lucide-react';

export interface ChatMessageData {
  id: string;
  username: string;
  message: string;
  avatar?: string;
  badge?: 'moderator' | 'subscriber' | 'vip';
  timestamp: Date;
  isHighlighted?: boolean;
}

interface ChatMessageProps {
  data: ChatMessageData;
  className?: string;
}

export default function ChatMessage({ data, className }: ChatMessageProps) {
  const { username, message, avatar, badge, isHighlighted } = data;

  const badgeConfig = {
    moderator: { icon: Shield, color: 'text-green-400', title: 'Moderator' },
    subscriber: { icon: Star, color: 'text-purple-400', title: 'Subscriber' },
    vip: { icon: Crown, color: 'text-yellow-400', title: 'VIP' },
  };

  const BadgeIcon = badge ? badgeConfig[badge].icon : null;
  const badgeTitle = badge ? badgeConfig[badge].title : '';

  return (
    <div
      className={cn(
        'group flex items-start gap-2 px-3 py-1.5 transition-colors hover:bg-accent/50',
        isHighlighted && 'border-l-2 border-primary bg-primary/10',
        className
      )}
    >
      {/* Avatar */}
      <Avatar className="h-6 w-6 flex-shrink-0">
        <AvatarImage src={avatar} alt={username} />
        <AvatarFallback className="text-[10px] font-bold">
          {username.charAt(0).toUpperCase()}
        </AvatarFallback>
      </Avatar>

      {/* Message Content */}
      <div className="min-w-0 flex-1">
        <span className="inline-flex items-center gap-1">
          {/* Badge */}
          {BadgeIcon && (
            <span title={badgeTitle}>
              <BadgeIcon className={cn('h-3.5 w-3.5', badgeConfig[badge!].color)} />
            </span>
          )}

          {/* Username */}
          <span
            className={cn(
              'text-sm font-semibold',
              badge === 'moderator' && 'text-green-400',
              badge === 'subscriber' && 'text-purple-400',
              badge === 'vip' && 'text-yellow-400',
              !badge && 'text-blue-400'
            )}
          >
            {username}
          </span>
          <span className="text-muted-foreground">:</span>
        </span>
        <span className="break-words text-sm text-foreground"> {message}</span>
      </div>
    </div>
  );
}
