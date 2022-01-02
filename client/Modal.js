import ReactDOM from 'react-dom'

const modalRootEl = document.getElementById('modal-root')

const Modal = ({
  children,
  open = false
}) => {
  if (!open) return null

  return ReactDOM.createPortal(
  <div className='modal-overlay'>
      <div className='modal'>
        {children}
      </div>
  </div>,
  modalRootEl)
}

export default Modal