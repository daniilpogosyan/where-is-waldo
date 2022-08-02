import './DropDown.css';

export default function DropDown(props) {
  if (props.position && props.targets.length > 0)
    return (
      <ul
        className="drop-down"
        style={{
          left: props.position.x + "px",
          top: props.position.y + "px",
        }}
      >
        {props.targets.map(target => (
          <li
            key={target.name}
            onClick={() => props.onChoose(target.name)}
          >
            {target.name}
          </li>
        ))}
      </ul>
    )

  return null
}
