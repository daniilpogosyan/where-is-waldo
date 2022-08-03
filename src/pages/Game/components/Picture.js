import './Picture.css';

export default function Picture(props) {
  return (
    <img
      onClick={props.onClick}
      draggable="false"
      className="picture"
      src={props.imgUrl}
      alt=""
    />
  )
}