import { useRef } from 'react';
import './DropDown.css';

export default function DropDown(props) {
  const dropdownRef = useRef(null);

  if (props.position && props.targets.length > 0) {
    // check if dropdownRef points to the dropdown and not to `null`
    // it's required until the first render is occured
    // default zero value are used in calculating actual position of the dropdown
    let dropdownWidth = 0;
    if (dropdownRef.current) {
      dropdownWidth = dropdownRef.current.clientWidth;
    }
    

    // position of the drop down with taking into account possible
    // viewport overflowing
    let positionWithoutCrossing = {};
    const viewportRect = document.body.getBoundingClientRect();
    if (props.position.x + dropdownWidth > viewportRect.width) {
      positionWithoutCrossing.left = props.position.x - dropdownWidth + "px";
    } else {
      positionWithoutCrossing.left = props.position.x + "px";
    }
    
    positionWithoutCrossing.top = props.position.y + "px";

    return (
      <ul
        ref={dropdownRef}
        className="drop-down"
        style={positionWithoutCrossing}
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
  }

  return null
}
