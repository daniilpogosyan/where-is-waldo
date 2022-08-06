import Icon from './Icon';

import './IconsList.css';

export default function IconsList(props) {
  return (
    <ul className="icons">
      {props.icons && props.icons.map(icon => (
        <li key={icon.pictureId}>
          <Icon imgUrl={icon.imgUrl} />
        </li>
      ))}
    </ul>
  )
}