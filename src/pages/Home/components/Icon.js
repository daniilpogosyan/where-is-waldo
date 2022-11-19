import { Link } from 'react-router-dom';

import style from './Icon.module.css';

export default function Icon({name, imgUrl, pictureId}) {
  return (
    <div className={style["icon"]}>
      <Link to={`/game/${pictureId}`}>
        <div className={style["cropper"]}>
          <img
            className={style["cropped"]}
            src={imgUrl}
            alt=""
          />
        </div>
        <h3 className={`${style['title']} main-text`}>{name}</h3>
      </Link>
    </div>
  )
}