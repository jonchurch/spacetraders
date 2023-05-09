import { useEffect, useState } from 'react';
import formatDistanceToNow from 'date-fns/formatDistanceToNow';

type CountdownProps = {targetDate: Date}

export const Countdown = ({ targetDate }: CountdownProps) => {
  const [timeLeft, setTimeLeft] = useState<string>(formatDistanceToNow(targetDate))

  useEffect(() => {
    // Update the time left every second
    const timer = setInterval(() => {
      setTimeLeft(formatDistanceToNow(new Date(targetDate)));
    }, 1000);

    // Clear the interval when the component unmounts
    return () => clearInterval(timer);
  }, []);

  return (
    <span>{timeLeft}</span>
  );
};

