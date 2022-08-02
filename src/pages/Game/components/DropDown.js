import './DropDown.css';

export default function DropDown(props) {
  if (props.position)
    return (
      <ul
        className="drop-down"
        style={{
          left: props.position.x + "px",
          top: props.position.y + "px",
        }}
      >
        <li>Scorpion</li>
        <li>Sub-zero</li>
        <li>Shao Kahn</li>
      </ul>
    )
    
  return null
}
