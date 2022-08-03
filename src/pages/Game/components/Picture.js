import './Picture.css';

export default function Picture(props) {
  return (
    <img
      onLoad={props.onLoad}
      onClick={props.onClick}
      draggable="false"
      className="picture"
      src={props.imgUrl}
      alt=""
    />
  )
}