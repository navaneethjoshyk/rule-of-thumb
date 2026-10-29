import { useId, useRef, useState } from 'react'

export default function DialogExample() {
  const titleId = useId()
  const descId = useId()
  const dialog = useRef(null)
  const trigger = useRef(null)
  const cancel = useRef(null)
  const [result, setResult] = useState('')

  function open() {
    setResult('')
    dialog.current.showModal()
    // Start on the least destructive action.
    cancel.current.focus()
  }

  function close(outcome) {
    dialog.current.close()
    setResult(outcome)
  }

  // Native <dialog> fires "close" for Esc too. Always put focus back on the trigger.
  function onClose() {
    trigger.current?.focus()
    setResult((r) => r || 'Kept “Q4 plan”. Nothing was deleted.')
  }

  // Click on the dimmed backdrop (the dialog element itself, outside its content box) closes it.
  function onClick(e) {
    if (e.target === dialog.current) close('Kept “Q4 plan”. Nothing was deleted.')
  }

  return (
    <div className="cx-stack">
      <div className="row">
        <button ref={trigger} className="btn cx-btn-danger" onClick={open}>Delete project…</button>
      </div>
      <p className="cx-status" role="status">{result}</p>

      <dialog ref={dialog} className="cx-dialog" aria-labelledby={titleId} aria-describedby={descId} onClose={onClose} onClick={onClick}>
        <div className="cx-dialog-body">
          <h3 id={titleId}>Delete “Q4 plan”?</h3>
          <p id={descId}>This deletes the project and its 14 files for everyone on your team. You can’t undo this.</p>
          <div className="cx-dialog-actions">
            <button ref={cancel} className="btn btn-ghost" onClick={() => close('Kept “Q4 plan”. Nothing was deleted.')}>Cancel</button>
            <button className="btn cx-btn-danger" onClick={() => close('Deleted “Q4 plan” (not really, it’s a demo).')}>Delete project</button>
          </div>
        </div>
      </dialog>
    </div>
  )
}
