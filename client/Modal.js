import ReactDOM from 'react-dom'
import { useStore } from './state'

const modalRootEl = document.getElementById('modal-root')

const Modal = ({
  children,
  open = false
}) => {
  if (!open) return null

  const { state, dispatch } = useStore()

  return ReactDOM.createPortal(
  <div className='modal-overlay'>
      <div className={'modal ' + state.modal + '-modal'}>
        {children}
        <button
          className='close-modal'
          onClick={() => {
            dispatch({ type: 'CLOSE_MODAL' })
          }}
        >
          ✖
        </button>
      </div>
  </div>,
  modalRootEl)
}

export default Modal