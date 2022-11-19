import style from './Clock.module.css';

export default function Clock({millisec}) {
  function makeTwoDigit(num) {
    if (num % 1 !==0 )
      return
    return num >= 10 ? `${num}` : `0${num}`;
  }
  
  function formatTime(timeInMillisec) {
    let minutes = Math.floor(timeInMillisec / 60000);
    let seconds = Math.floor(timeInMillisec / 1000) % 60;
    let hundredths = Math.floor(timeInMillisec%1000 / 10);
  
    minutes = makeTwoDigit(minutes);
    seconds = makeTwoDigit(seconds);
    hundredths = makeTwoDigit(hundredths);
  
    return minutes + ':' + seconds + ':' + hundredths    
  };

  return <span className={style['clock']}>{formatTime(millisec)}</span>
}