import { useEffect, useRef, useState } from 'react'

const LIFETIME = 6000

function ToastItem({ toast, onDismiss }) {
  const [paused, setPaused] = useState(false)
  const remaining = useRef(LIFETIME)
  const started = useRef(Date.now())

  // Success toasts time out, but the timer pauses while the pointer or focus is on them.
  useEffect(() => {
    if (toast.persist || paused) return
    started.current = Date.now()
    const t = setTimeout(() => onDismiss(toast.id), remaining.current)
    return () => { clearTimeout(t); remaining.current -= Date.now() - started.current }
  }, [paused, toast, onDismiss])

  return (
    <div
      className={`cx-toast ${toast.kind === 'error' ? 'is-error' : ''}`}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
    >
      <span className="cx-toast-icon" aria-hidden="true">{toast.kind === 'error' ? '!' : '✓'}</span>
      <span className="cx-grow">{toast.text}</span>
      {toast.action && <button className="cx-toast-action" onClick={() => { toast.action.run(); onDismiss(toast.id) }}>{toast.action.label}</button>}
      <button className="cx-toast-close" aria-label="Dismiss notification" onClick={() => onDismiss(toast.id)}>
        <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round"><path d="M6 6l12 12M18 6L6 18" /></svg>
      </button>
    </div>
  )
}

export default function ToastExample() {
  const [toasts, setToasts] = useState([])
  const nextId = useRef(1)
  const dismiss = useRef((id) => setToasts((ts) => ts.filter((t) => t.id !== id))).current

  const add = (t) => setToasts((ts) => [...ts, { id: nextId.current++, ...t }])

  const success = toasts.filter((t) => t.kind !== 'error')
  const errors = toasts.filter((t) => t.kind === 'error')

  return (
    <div className="cx-stack">
      <div className="row">
        <button className="btn btn-primary" onClick={() => add({ kind: 'success', text: 'Draft saved.' })}>Save draft</button>
        <button className="btn btn-ghost" onClick={() => add({ kind: 'error', persist: true, text: 'Couldn’t send. You’re offline.', action: { label: 'Try again', run: () => add({ kind: 'success', text: 'Message sent.' }) } })}>
          Send while offline
        </button>
      </div>
      <p className="muted small">Success messages disappear after 6 seconds (paused while you hover or focus them). Errors stay until you dismiss them.</p>

      {/* Live regions exist before any message is added, so screen readers announce new ones. */}
      <div className="cx-toast-stack">
        <div role="status" aria-live="polite" className="cx-toast-region">
          {success.map((t) => <ToastItem key={t.id} toast={t} onDismiss={dismiss} />)}
        </div>
        <div role="alert" aria-live="assertive" className="cx-toast-region">
          {errors.map((t) => <ToastItem key={t.id} toast={t} onDismiss={dismiss} />)}
        </div>
      </div>
    </div>
  )
}
