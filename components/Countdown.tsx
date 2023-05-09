import { useEffect, useState } from 'react';
import differenceInSeconds from 'date-fns/differenceInSeconds';

type CountdownProps = {targetDate: Date}

export const Countdown = ({ targetDate }: CountdownProps) => {
  const [timeLeft, setTimeLeft] = useState(differenceInSeconds(new Date(targetDate), new Date()));

  useEffect(() => {
    // Update the time left every second
    const timer = setInterval(() => {
      setTimeLeft(prevTimeLeft => prevTimeLeft - 1);
    }, 1000);

    // Clear the interval when the component unmounts
    return () => clearInterval(timer);
  }, []);

  // Calculate the days, hours, minutes, and seconds
  const days = Math.floor(timeLeft / (60 * 60 * 24));
  const hours = Math.floor((timeLeft / (60 * 60)) % 24);
  const minutes = Math.floor((timeLeft / 60) % 60);
  const seconds = timeLeft % 60;

  return (
    <span>{days}d {hours}h {minutes}m {seconds}s left</span>
  );
};

