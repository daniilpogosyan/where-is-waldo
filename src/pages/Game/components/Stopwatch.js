import { useEffect } from 'react';

import './Stopwatch.css';

export default function StopWatch({elapsed, start, stop}) {
  const makeTwoDigit = (num) => {
    if (num % 1 !==0 )
      return
    return num >= 10 ? `${num}` : `0${num}`;
  }

  const formatTime = (timeInMillisec) => {
    let minutes = Math.floor(timeInMillisec / 60000);
    let seconds = Math.floor(timeInMillisec / 1000) % 60;
    let hundredths = Math.floor(timeInMillisec%1000 / 10);

    minutes = makeTwoDigit(minutes);
    seconds = makeTwoDigit(seconds);
    hundredths = makeTwoDigit(hundredths);

    return minutes + ':' + seconds + ':' + hundredths    
  };

  useEffect(() => {
    start();
    return () => stop()
  }, []);

  return (
    <div className="stopwatch">
      <span className="stopwatch-value">{formatTime(elapsed)}</span>
    </div>
  )
}