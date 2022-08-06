export default function Select(props) {
  return (
    <div className=" drop-down-container drop-down-container--on-hover">
      {props.options && props.currentOption && (
        <>
          <span>{props.currentOption.name}</span>
          <div className="drop-down">
            {props.options.map(option => (
              <p
                key={option.pictureId}
                onClick={() => props.onSelect(option)}
              >
                {option.name}
              </p>
            ))}
          </div>
        </>
       )
      }
    </div>
  )
}