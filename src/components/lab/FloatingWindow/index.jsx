import { useRef } from 'react'
import Draggable from 'react-draggable'
import { useLabStore } from '../Store/useLabStore'
import styles from './styles.module.css'

export default function FloatingWindow({ id, title, children }) {
  const closeTool = useLabStore((state) => state.closeTool)
  const nodeRef = useRef(null)

  const handleClose = (e) => {
    e.preventDefault()
    closeTool(id)
  }

  return (
    <Draggable 
      nodeRef={nodeRef} 
      handle=".drag-handle" 
      cancel=".cancel-drag"
      bounds="body"
    >
      <div ref={nodeRef} className={styles.windowWrapper}>
        <div className={`drag-handle ${styles.header}`}>
          <span className={styles.title}>{title}</span>
          <button 
            className={`cancel-drag ${styles.closeButton}`} 
            onClick={handleClose}
            onTouchEnd={handleClose}
          >
            ×
          </button>
        </div>
        <div className={styles.content}>
          {children}
        </div>
      </div>
    </Draggable>
  )
}