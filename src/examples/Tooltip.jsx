import { useEffect, useId, useRef, useState } from 'react'

// A tooltip that meets WCAG 1.4.13: shows on hover AND focus, can be dismissed with Esc,
// and stays open while the pointer moves onto it.
function Tip({ text, children, labelOnly = false }) {
  const id = useId()
  const [open, setOpen] = useState(false)
  const hideTimer = useRef()

  const show = () => { clearTimeout(hideTimer.current); setOpen(true) }
  const hideSoon = () => { hideTimer.current = setTimeout(() => setOpen(false), 120) }

  useEffect(() => {
    if (!open) return
    const onKey = (e) => { if (e.key === 'Escape') setOpen(false) }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [open])
  useEffect(() => () => clearTimeout(hideTimer.current), [])

  // labelOnly: the tooltip IS the button's name (icon-only button).
  // Otherwise it adds a description to an already-labelled control.
  const aria = labelOnly ? { 'aria-labelledby': id } : { 'aria-describedby': id }

  return (
    <span className="cx-tip-wrap" onMouseEnter={show} onMouseLeave={hideSoon}>
      {children({ ...aria, onFocus: show, onBlur: () => setOpen(false) })}
      <span role="tooltip" id={id} className={`cx-tip ${open ? 'is-open' : ''}`}>{text}</span>
    </span>
  )
}

const Icon = ({ d }) => (
  <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d={d} /></svg>
)

export default function TooltipExample() {
  const [msg, setMsg] = useState('')
  return (
    <div className="cx-stack">
      <div>
        <p className="cx-label">Icon-only toolbar: the tooltip is the button’s name</p>
        <div className="cx-toolbar" role="group" aria-label="Text formatting">
          <Tip text="Bold (Ctrl+B)" labelOnly>{(p) => <button className="cx-tool" {...p} onClick={() => setMsg('Bold applied.')}><Icon d="M7 5h6a3.5 3.5 0 0 1 0 7H7zM7 12h7a3.5 3.5 0 0 1 0 7H7z" /></button>}</Tip>
          <Tip text="Italic (Ctrl+I)" labelOnly>{(p) => <button className="cx-tool" {...p} onClick={() => setMsg('Italic applied.')}><Icon d="M19 4h-9M14 20H5M15 4L9 20" /></button>}</Tip>
          <Tip text="Insert link (Ctrl+K)" labelOnly>{(p) => <button className="cx-tool" {...p} onClick={() => setMsg('Link dialog would open.')}><Icon d="M10 13a5 5 0 0 0 7.5.5l3-3a5 5 0 0 0-7-7l-1.7 1.7M14 11a5 5 0 0 0-7.5-.5l-3 3a5 5 0 0 0 7 7l1.7-1.7" /></button>}</Tip>
        </div>
        <p className="cx-status" role="status">{msg}</p>
      </div>
      <div>
        <p className="cx-label">Extra help on a labelled control: the tooltip is a description</p>
        <Tip text="Your choice is saved and applies to every device you sign in on.">
          {(p) => <button className="btn btn-ghost" {...p} onClick={() => setMsg('Preference saved.')}>Save preference</button>}
        </Tip>
      </div>
    </div>
  )
}
