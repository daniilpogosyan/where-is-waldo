import './ModalWindow.css';

export default function ModalWindow({children}) {
  return (
    <div className="modal-window">
      <div className="modal-window__content">
      {children}
      </div>
    </div>
  )
}