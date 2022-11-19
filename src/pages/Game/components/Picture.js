import style from './Picture.module.css';

export default function Picture(props) {
  return (
    <img
      onLoad={props.onLoad}
      onClick={props.onClick}
      draggable="false"
      className={style['picture']}
      src={props.imgUrl}
      alt=""
    />
  )
}