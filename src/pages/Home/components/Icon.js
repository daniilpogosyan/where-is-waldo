import './Icon.css';

export default function Icon({imgUrl}) {
  return (
    <div className="cropper">
      <img
        className="cropped"
        src={imgUrl}
        alt=""
      />
    </div>
  )
}