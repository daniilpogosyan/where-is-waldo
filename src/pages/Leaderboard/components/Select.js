import './Select.css';

export default function Select(props) {
  return (
    <div className="drop-down-container drop-down-container--on-hover">
      {props.options && props.currentOption && (
        <>
          <span className="current-select">{props.currentOption.name}</span>
          <ul className="drop-down options">
            {props.options.map(option => (
              <li
                key={option.pictureId}
                onClick={() => props.onSelect(option)}
              >
                {option.name}
              </li>
            ))}
          </ul>
        </>
       )
      }
    </div>
  )
}

// import { useState, useEffect } from 'react';

// import './Select.css';

// export default function Select(props) {
//   const [displayOptions, setDisplayOptions] = useState();
//   const [inputValue, setInputValue] = useState('');


//   function handleChangeInput(e) {
//     const regEx = new RegExp(e.target.value, 'i');
//     setDisplayOptions(props.options.filter(option => option.name.match(regEx)));
//   }
  
//   function handleSubmit(e) {
//     e.preventDefault();

//     const selectedOptionName = e.target.optionName.value;
//     console.log(selectedOptionName)
//     const selectedOption = displayOptions
//       .find(option => option.name = selectedOptionName);
//     if (selectedOption)
//       props.onSelect(selectedOption)
//   }


//   return (
//     <div className=" drop-down-container drop-down-container--on-focus-within drop-down-container--on-hover">
//       {displayOptions && (
//         <>
//         <form
//           onSubmit={handleSubmit}
//         >
//           <input
//             name="optionName"
//             type="text"
//             id="select-picture"
//             onChange={handleChangeInput}
//           />
//         </form>
//           <ul className="options drop-down">
//             {displayOptions.map((option, index) => (
//               <li
//                 key={option.pictureId}
//                 // onClick={}
//                 className={index === focusSuggestionIndex ? 'focused-suggestion' : ''}
//               >
//                 {option.name}
//               </li>
//             ))}
//           </ul>
//         </>
//        )
//       }
//     </div>
//   )
// }


// export default function Select(props) {
//   return (
//     <div className=" drop-down-container drop-down-container--on-hover">
//       {props.options && props.currentOption && (
//         <>
//           <span>{props.currentOption.name}</span>
//           <div className="drop-down">
//             {props.options.map(option => (
//               <p
//                 key={option.pictureId}
//                 onClick={() => props.onSelect(option)}
//               >
//                 {option.name}
//               </p>
//             ))}
//           </div>
//         </>
//        )
//       }
//     </div>
//   )
// }