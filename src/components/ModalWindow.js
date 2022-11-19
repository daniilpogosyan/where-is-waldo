import style from './ModalWindow.module.css';

export default function ModalWindow({children}) {
  return (
    <div className={style["modal-window"]}>
      <div className={style["content"]}>
        {children}
      </div>
    </div>
  )
}
