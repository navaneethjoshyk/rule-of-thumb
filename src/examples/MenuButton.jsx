import { useEffect, useId, useRef, useState } from 'react'

const ITEMS = ['Edit', 'Duplicate', 'Archive', 'Delete']

export default function MenuButtonExample() {
  const btnId = useId()
  const menuId = useId()
  const [open, setOpen] = useState(false)
  const [focusIdx, setFocusIdx] = useState(0)
  const [msg, setMsg] = useState('')
  const button = useRef(null)
  const wrap = useRef(null)
  const items = useRef([])

  useEffect(() => {
    if (open) items.current[focusIdx]?.focus()
  }, [open, focusIdx])

  // Close when clicking anywhere outside.
  useEffect(() => {
    if (!open) return
    const onDown = (e) => { if (!wrap.current.contains(e.target)) setOpen(false) }
    document.addEventListener('mousedown', onDown)
    return () => document.removeEventListener('mousedown', onDown)
  }, [open])

  function openAt(i) { setFocusIdx(i); setOpen(true) }
  function closeMenu(refocus = true) { setOpen(false); if (refocus) button.current.focus() }
  function choose(item) { setMsg(`${item} chosen for “Q4 plan”.`); closeMenu() }

  function onButtonKey(e) {
    if (e.key === 'ArrowDown' || e.key === 'Enter' || e.key === ' ') { e.preventDefault(); openAt(0) }
    else if (e.key === 'ArrowUp') { e.preventDefault(); openAt(ITEMS.length - 1) }
  }

  function onMenuKey(e) {
    const last = ITEMS.length - 1
    const moves = { ArrowDown: focusIdx === last ? 0 : focusIdx + 1, ArrowUp: focusIdx === 0 ? last : focusIdx - 1, Home: 0, End: last }
    if (e.key in moves) { e.preventDefault(); setFocusIdx(moves[e.key]); return }
    if (e.key === 'Escape') { e.preventDefault(); closeMenu(); return }
    if (e.key === 'Tab') { setOpen(false); return }
    if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); choose(ITEMS[focusIdx]); return }
    // Type-ahead: jump to the next item starting with that letter.
    if (/^[a-z]$/i.test(e.key)) {
      const n = ITEMS.findIndex((it, i) => i > focusIdx && it[0].toLowerCase() === e.key.toLowerCase())
      const m = n >= 0 ? n : ITEMS.findIndex((it) => it[0].toLowerCase() === e.key.toLowerCase())
      if (m >= 0) setFocusIdx(m)
    }
  }

  return (
    <div className="cx-stack cx-menu-demo">
      <div className="cx-file-card">
        <span className="file-icon" aria-hidden="true">DOC</span>
        <span className="cx-grow"><strong>Q4 plan</strong> <span className="muted">Edited 2 hours ago</span></span>
        <div className="cx-menu-wrap" ref={wrap}>
          <button
            ref={button}
            id={btnId}
            className="btn btn-ghost"
            aria-haspopup="menu"
            aria-expanded={open}
            aria-controls={menuId}
            onClick={() => (open ? closeMenu(false) : openAt(0))}
            onKeyDown={onButtonKey}
          >
            Actions
            <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 9l6 6 6-6" /></svg>
          </button>
          <ul role="menu" id={menuId} aria-labelledby={btnId} className="cx-menu" hidden={!open} onKeyDown={onMenuKey}>
            {ITEMS.map((it, i) => (
              <li
                key={it}
                role="menuitem"
                tabIndex={-1}
                ref={(el) => (items.current[i] = el)}
                className={`cx-menuitem ${it === 'Delete' ? 'is-danger' : ''}`}
                onClick={() => choose(it)}
                onMouseEnter={() => setFocusIdx(i)}
              >
                {it}
              </li>
            ))}
          </ul>
        </div>
      </div>
      <p className="cx-status" role="status">{msg}</p>
    </div>
  )
}
