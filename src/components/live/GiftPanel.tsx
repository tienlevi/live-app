import { useState } from 'react';
import { cn } from '@/lib/utils';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { X, Coins, Sparkles, Zap } from 'lucide-react';

interface Gift {
  id: string;
  name: string;
  emoji: string;
  price: number;
  animation?: 'sparkle' | 'bounce' | 'shake';
}

interface GiftPanelProps {
  isOpen: boolean;
  onClose: () => void;
  onSendGift?: (gift: Gift, quantity: number) => void;
  userCoins?: number;
  className?: string;
}

const GIFTS: Gift[] = [
  { id: '1', name: 'Heart', emoji: '❤️', price: 1 },
  { id: '2', name: 'Rose', emoji: '🌹', price: 5 },
  { id: '3', name: 'Star', emoji: '⭐', price: 10 },
  { id: '4', name: 'Fire', emoji: '🔥', price: 20, animation: 'shake' },
  { id: '5', name: 'Diamond', emoji: '💎', price: 50, animation: 'sparkle' },
  { id: '6', name: 'Crown', emoji: '👑', price: 100, animation: 'sparkle' },
  { id: '7', name: 'Rocket', emoji: '🚀', price: 200, animation: 'bounce' },
  { id: '8', name: 'Universe', emoji: '🌌', price: 500, animation: 'sparkle' },
];

const QUANTITIES = [1, 5, 10, 99];

export default function GiftPanel({
  isOpen,
  onClose,
  onSendGift,
  userCoins = 1000,
  className,
}: GiftPanelProps) {
  const [selectedGift, setSelectedGift] = useState<Gift | null>(null);
  const [quantity, setQuantity] = useState(1);

  if (!isOpen) return null;

  const totalCost = selectedGift ? selectedGift.price * quantity : 0;
  const canAfford = totalCost <= userCoins;

  const handleSend = () => {
    if (selectedGift && canAfford) {
      onSendGift?.(selectedGift, quantity);
      setSelectedGift(null);
      setQuantity(1);
    }
  };

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Panel */}
      <Card
        className={cn(
          'fixed bottom-0 left-0 right-0 z-50 mx-auto max-w-lg rounded-b-none rounded-t-2xl',
          className
        )}
      >
        <CardHeader className="flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-yellow-500" />
            Send a Gift
          </CardTitle>
          <div className="flex items-center gap-3">
            {/* User Coins */}
            <Badge variant="secondary" className="gap-1.5 px-3 py-1">
              <Coins className="h-4 w-4 text-yellow-500" />
              <span className="font-bold">{userCoins.toLocaleString()}</span>
            </Badge>
            <Button variant="ghost" size="icon" onClick={onClose} className="h-8 w-8">
              <X className="h-4 w-4" />
            </Button>
          </div>
        </CardHeader>

        <CardContent className="space-y-4">
          {/* Gift Grid */}
          <div className="grid grid-cols-4 gap-2">
            {GIFTS.map((gift) => (
              <button
                key={gift.id}
                onClick={() => setSelectedGift(gift)}
                className={cn(
                  'flex flex-col items-center gap-1 rounded-xl border-2 p-3 transition-all hover:bg-accent',
                  selectedGift?.id === gift.id
                    ? 'border-primary bg-primary/10'
                    : 'border-transparent'
                )}
              >
                <span className="text-3xl">{gift.emoji}</span>
                <span className="text-xs text-muted-foreground">{gift.name}</span>
                <span className="flex items-center gap-0.5 text-xs font-semibold text-yellow-500">
                  <Coins className="h-3 w-3" />
                  {gift.price}
                </span>
              </button>
            ))}
          </div>

          {/* Quantity Selector */}
          {selectedGift && (
            <div className="flex items-center justify-between rounded-xl bg-secondary p-3">
              <div className="flex items-center gap-2">
                <span className="text-2xl">{selectedGift.emoji}</span>
                <div>
                  <p className="font-medium">{selectedGift.name}</p>
                  <p className="text-sm text-muted-foreground">
                    {selectedGift.price} coins each
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-1">
                {QUANTITIES.map((q) => (
                  <Button
                    key={q}
                    variant={quantity === q ? 'default' : 'ghost'}
                    size="sm"
                    onClick={() => setQuantity(q)}
                    className="h-8 w-10"
                  >
                    {q === 99 ? '99+' : q}
                  </Button>
                ))}
              </div>
            </div>
          )}

          {/* Send Button */}
          <Button
            onClick={handleSend}
            disabled={!selectedGift || !canAfford}
            className="w-full gap-2 bg-gradient-to-r from-yellow-500 to-orange-500 text-white hover:from-yellow-400 hover:to-orange-400 disabled:from-gray-500 disabled:to-gray-600"
            size="lg"
          >
            <Zap className="h-4 w-4" />
            {selectedGift ? (
              <>
                Send {quantity}x {selectedGift.emoji} for{' '}
                <span className="font-bold">{totalCost.toLocaleString()} coins</span>
              </>
            ) : (
              'Select a gift'
            )}
          </Button>

          {selectedGift && !canAfford && (
            <p className="text-center text-sm text-destructive">
              Not enough coins! You need {(totalCost - userCoins).toLocaleString()} more.
            </p>
          )}
        </CardContent>
      </Card>
    </>
  );
}
