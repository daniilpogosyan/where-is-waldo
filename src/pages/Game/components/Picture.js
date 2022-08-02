import './Picture.css';

export default function Picture(props) {
  return (
    <img
      onClick={props.onClick}
      draggable="false"
      className="picture"
      src="https://mir-s3-cdn-cf.behance.net/project_modules/max_1200/c64ca899271971.5eef55f5bd316.jpg"
      alt=""
    />
  )
}