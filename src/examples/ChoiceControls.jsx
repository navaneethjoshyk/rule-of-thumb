import { useEffect, useRef, useState } from 'react'

const SPEEDS = [
  { id: 'standard', label: 'Standard', hint: '5–7 business days, free' },
  { id: 'express', label: 'Express', hint: '2 business days, $9' },
  { id: 'overnight', label: 'Overnight', hint: 'Next business day, $19' },
]
const TOPPINGS = ['Mushrooms', 'Peppers', 'Olives', 'Basil']

export default function ChoiceControlsExample() {
  const [speed, setSpeed] = useState('standard')
  const [picked, setPicked] = useState(['Basil'])
  const all = useRef()

  const allOn = picked.length === TOPPINGS.length
  const some = picked.length > 0 && !allOn

  useEffect(() => { if (all.current) all.current.indeterminate = some }, [some])

  const toggle = (t) => setPicked((p) => (p.includes(t) ? p.filter((x) => x !== t) : [...p, t]))

  return (
    <div className="cx-grid-2">
      <fieldset className="cx-fieldset">
        <legend>Delivery speed</legend>
        {SPEEDS.map((s) => (
          <label key={s.id} className="cx-choice">
            <input type="radio" name="speed" value={s.id} checked={speed === s.id} onChange={() => setSpeed(s.id)} aria-describedby={`speed-${s.id}-hint`} />
            <span>
              <span className="cx-choice-label">{s.label}</span>
              <small id={`speed-${s.id}-hint`} className="muted">{s.hint}</small>
            </span>
          </label>
        ))}
      </fieldset>

      <fieldset className="cx-fieldset">
        <legend>Pizza toppings</legend>
        <label className="cx-choice cx-choice-parent">
          <input ref={all} type="checkbox" checked={allOn} onChange={() => setPicked(allOn ? [] : [...TOPPINGS])} />
          <span className="cx-choice-label">Select all toppings</span>
        </label>
        <div className="cx-indent">
          {TOPPINGS.map((t) => (
            <label key={t} className="cx-choice">
              <input type="checkbox" checked={picked.includes(t)} onChange={() => toggle(t)} />
              <span className="cx-choice-label">{t}</span>
            </label>
          ))}
        </div>
      </fieldset>

      <p className="cx-status cx-span-2" role="status">
        {SPEEDS.find((s) => s.id === speed).label} delivery · {picked.length ? picked.join(', ') : 'no toppings'}
      </p>
    </div>
  )
}
