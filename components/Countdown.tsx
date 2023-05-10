import { useEffect, useState } from 'react';
import formatDistanceToNow from 'date-fns/formatDistanceToNow';
import differenceInSeconds from 'date-fns/differenceInSeconds';

type CountdownProps = {targetDate: Date, hideWhenComplete: boolean}

const MINUTES_IN_SECONDS = 60

export const Countdown = ({ targetDate, hideWhenComplete = true}: CountdownProps) => {
  const [timeLeft, setTimeLeft] = useState<string>(formatDistanceToNow(targetDate))

  useEffect(() => {
    // Update the time left every second
    const timer = setInterval(() => {
      const diffInSeconds = differenceInSeconds(new Date(targetDate), Date.now())
      if (diffInSeconds < 5 * MINUTES_IN_SECONDS) {
        // display an actual countdown
        const minutes = Math.floor(diffInSeconds / 60)
        const seconds = diffInSeconds % 60
        setTimeLeft(`${minutes ? `${minutes}min ` : `${seconds} seconds`}`)
        return
      }
      setTimeLeft(formatDistanceToNow(new Date(targetDate)));
    }, 1000);

    // Clear the interval when the component unmounts
    return () => clearInterval(timer);
  }, [targetDate]);
  if (new Date() > new Date(targetDate)) {
    if (hideWhenComplete) {
      return null
    }
    return <span className='text-sm'>Complete</span>
  }
  return (
    <span>{timeLeft}</span>
  );
};

