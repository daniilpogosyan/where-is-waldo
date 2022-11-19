import Clock from '../../../components/Clock';

import style from './Stopwatch.module.css';

export default function StopWatch({elapsed}) {
  return (
    <div className={style["stopwatch"]}>
      <span className={style["value"]}>
        <Clock millisec={elapsed}/>
      </span>
    </div>
  )
}