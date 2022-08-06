import { Link } from 'react-router-dom';

import './Icon.css';

export default function Icon({imgUrl, pictureId}) {
  return (
    <div className="cropper">
      <Link to={`/game/${pictureId}`}>
        <img
          className="cropped"
          src={imgUrl}
          alt=""
        />
      </Link>
    </div>
  )
}