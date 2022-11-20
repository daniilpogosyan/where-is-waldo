import { useEffect, useState, useRef } from 'react';
import Clock from '../../../components/Clock';

import style from './Stopwatch.module.css';

export default function StopWatch({status, getTime}) {
  const [elapsed, setElapsed] = useState(0);
  const stopwatchID = useRef(null);

  // Clear interval on unmount. Without it interval would remain even if
  // user leave the game before finishing (e.g. change tab)
  useEffect(() => {
    return stopStopwatch
  }, [])

  useEffect(() => {
    switch (status) {
      case 'start': {
        startStopwatch();
        break;
      }
      case 'stop': {
        getTime(elapsed);
        stopStopwatch();
        break;
      }
      default: {
        throw Error('StopWatch received unknown status');
        break
      }
    }
  }, [status]);

  function startStopwatch() {
    setElapsed(0);
    const dt = 10;
    stopwatchID.current = setInterval(() => {
      setElapsed(elapsed => elapsed + dt)
    }, dt);
    console.log('stopwatch is running! id:', stopwatchID.current)
   }
  
  function stopStopwatch() {
    clearInterval(stopwatchID.current);
    console.log('stopwatch is stopped! id:', stopwatchID.current)
  }

  return (
    <div className={style["stopwatch"]}>
      <span className={style["value"]}>
        <Clock millisec={elapsed}/>
      </span>
    </div>
  )
}
