import { useState, useRef, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import ChatMessage, { type ChatMessageData } from './ChatMessage';
import { Send, Smile, Settings, ChevronDown } from 'lucide-react';

interface LiveChatProps {
  messages: ChatMessageData[];
  onSendMessage?: (message: string) => void;
  isConnected?: boolean;
  className?: string;
}

export default function LiveChat({
  messages,
  onSendMessage,
  isConnected = true,
  className,
}: LiveChatProps) {
  const [inputValue, setInputValue] = useState('');
  const [isPaused, setIsPaused] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    if (!isPaused) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isPaused]);

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const target = e.target as HTMLDivElement;
    const { scrollTop, scrollHeight, clientHeight } = target;
    const isNearBottom = scrollHeight - scrollTop - clientHeight < 100;
    setIsPaused(!isNearBottom);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputValue.trim() && onSendMessage) {
      onSendMessage(inputValue.trim());
      setInputValue('');
    }
  };

  const handleResumeChat = () => {
    setIsPaused(false);
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <Card className={cn('flex h-full flex-col', className)}>
      {/* Header */}
      <CardHeader className="flex-row items-center justify-between space-y-0 border-b px-4 py-3">
        <CardTitle className="text-base font-semibold">Live Chat</CardTitle>
        <div className="flex items-center gap-2">
          <span
            className={cn(
              'h-2 w-2 rounded-full',
              isConnected ? 'bg-green-500' : 'bg-red-500'
            )}
          />
          <span className="text-xs text-muted-foreground">
            {isConnected ? 'Connected' : 'Reconnecting...'}
          </span>
          <Button variant="ghost" size="icon" className="h-7 w-7">
            <Settings className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>

      {/* Messages */}
      <CardContent className="relative flex-1 overflow-hidden p-0">
        <ScrollArea className="h-full">
          <div
            ref={scrollContainerRef}
            onScroll={handleScroll}
            className="h-full overflow-y-auto"
          >
            {messages.length === 0 ? (
              <div className="flex h-full items-center justify-center p-8 text-center">
                <p className="text-muted-foreground">
                  No messages yet. Be the first to chat!
                </p>
              </div>
            ) : (
              <div className="py-2">
                {messages.map((msg) => (
                  <ChatMessage key={msg.id} data={msg} />
                ))}
                <div ref={messagesEndRef} />
              </div>
            )}
          </div>
        </ScrollArea>

        {/* Paused Indicator */}
        {isPaused && (
          <Button
            onClick={handleResumeChat}
            variant="secondary"
            size="sm"
            className="absolute bottom-2 left-1/2 -translate-x-1/2 gap-1 bg-primary/90 text-primary-foreground hover:bg-primary"
          >
            <ChevronDown className="h-4 w-4" />
            Resume Chat
          </Button>
        )}
      </CardContent>

      {/* Input */}
      <div className="border-t p-3">
        <form onSubmit={handleSubmit} className="flex items-center gap-2">
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="h-8 w-8 flex-shrink-0"
          >
            <Smile className="h-5 w-5" />
          </Button>

          <Input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Send a message..."
            className="flex-1"
            disabled={!isConnected}
          />

          <Button
            type="submit"
            size="icon"
            disabled={!inputValue.trim() || !isConnected}
            className="h-8 w-8 flex-shrink-0"
          >
            <Send className="h-4 w-4" />
          </Button>
        </form>
      </div>
    </Card>
  );
}
