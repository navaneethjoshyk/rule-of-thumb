import { useEffect, useRef, useState } from 'react'
import { Segmented } from '../components/Controls'

const START = [
  { id: 1, from: 'Priya', text: 'Photos from Saturday' },
  { id: 2, from: 'Landlord', text: 'Lease renewal: please sign' },
  { id: 3, from: 'Marco', text: 'Are we still on for Thursday?' },
  { id: 4, from: 'Newsletter', text: 'This week in design' },
]

export default function ErrorRecoveryDemo() {
  const [mode, setMode] = useState('none')
  const [items, setItems] = useState(START)
  const [toast, setToast] = useState(null) // { item, index }
  const timer = useRef()

  useEffect(() => () => clearTimeout(timer.current), [])

  function remove(item, index) {
    setItems((list) => list.filter((i) => i.id !== item.id))
    clearTimeout(timer.current)
    setToast({ item, index })
    timer.current = setTimeout(() => setToast(null), 6000)
  }
  function undo() {
    setItems((list) => {
      const next = [...list]
      next.splice(toast.index, 0, toast.item)
      return next
    })
    setToast(null)
  }

  return (
    <div className="demo-undo">
      <div className="demo-controls">
        <Segmented
          label="Delete behaviour"
          value={mode}
          onChange={(v) => { setMode(v); setItems(START); setToast(null) }}
          options={[{ value: 'none', label: 'No undo' }, { value: 'undo', label: 'With undo' }]}
        />
        <button className="btn btn-ghost" onClick={() => { setItems(START); setToast(null) }}>Reset inbox</button>
      </div>
      <div className="mini-app inbox">
        <ul>
          {items.map((m, i) => (
            <li key={m.id}>
              <span><strong>{m.from}</strong> <span className="muted">{m.text}</span></span>
              <button className="btn btn-small" onClick={() => remove(m, i)} aria-label={`Delete message from ${m.from}`}>Delete</button>
            </li>
          ))}
          {items.length === 0 && <li className="muted">Inbox empty.</li>}
        </ul>
        <div aria-live="polite">
          {toast && (
            <div className="toast">
              {mode === 'undo' ? (
                <>
                  <span>Message from {toast.item.from} deleted.</span>
                  <button className="toast-action" onClick={undo}>Undo</button>
                </>
              ) : (
                <span>Message from {toast.item.from} permanently deleted.</span>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
