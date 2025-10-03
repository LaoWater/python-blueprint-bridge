import { useState, useEffect } from 'react';
import { Clock } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface TimerCountdownProps {
  startTime: string;
  timeLimitMinutes: number;
}

const TimerCountdown = ({ startTime, timeLimitMinutes }: TimerCountdownProps) => {
  const [timeRemaining, setTimeRemaining] = useState<number>(0);

  useEffect(() => {
    const calculateTimeRemaining = () => {
      const start = new Date(startTime).getTime();
      const end = start + (timeLimitMinutes * 60 * 1000);
      const now = Date.now();
      const remaining = Math.max(0, end - now);
      return Math.floor(remaining / 1000); // Convert to seconds
    };

    setTimeRemaining(calculateTimeRemaining());

    const interval = setInterval(() => {
      const remaining = calculateTimeRemaining();
      setTimeRemaining(remaining);

      if (remaining <= 0) {
        clearInterval(interval);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [startTime, timeLimitMinutes]);

  const formatTime = (seconds: number): string => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;

    if (hours > 0) {
      return `${hours}:${String(minutes).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
    }
    return `${minutes}:${String(secs).padStart(2, '0')}`;
  };

  const getVariant = (): 'default' | 'destructive' | 'outline' => {
    if (timeRemaining <= 300) return 'destructive'; // Last 5 minutes
    if (timeRemaining <= 600) return 'outline'; // Last 10 minutes
    return 'default';
  };

  if (timeRemaining <= 0) {
    return (
      <Badge variant="destructive" className="text-lg px-4 py-2">
        <Clock className="w-4 h-4 mr-2" />
        Time's Up!
      </Badge>
    );
  }

  return (
    <Badge variant={getVariant()} className="text-lg px-4 py-2">
      <Clock className="w-4 h-4 mr-2" />
      {formatTime(timeRemaining)}
    </Badge>
  );
};

export default TimerCountdown;
