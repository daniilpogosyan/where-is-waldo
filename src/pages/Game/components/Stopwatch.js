import { useEffect } from 'react';

import Clock from '../../../components/Clock';

import './Stopwatch.css';

export default function StopWatch({elapsed, start, stop}) {
  useEffect(() => {
    return () => stop()
  }, []);

  return (
    <div className="stopwatch">
      <span className="stopwatch-value">
        <Clock millisec={elapsed}/>
      </span>
    </div>
  )
}