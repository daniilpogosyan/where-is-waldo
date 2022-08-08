import { Link } from 'react-router-dom';

import './Icon.css';

export default function Icon({name, imgUrl, pictureId}) {
  return (
    <div className="icon">
      <Link to={`/game/${pictureId}`}>
        <div className="cropper">
          <img
            className="cropped"
            src={imgUrl}
            alt=""
          />
        </div>
        <h3 className="icon__title main-text">{name}</h3>
      </Link>
    </div>
  )
}