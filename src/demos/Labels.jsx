import { useState } from 'react'
import { Segmented } from '../components/Controls'

const FIELDS = [
  { id: 'street', label: 'Street address', hint: 'Number and street name' },
  { id: 'unit', label: 'Apartment or unit', hint: 'Optional' },
  { id: 'postal', label: 'Postal code', hint: 'For example, M5V 2T6' },
]

export default function LabelsDemo() {
  const [mode, setMode] = useState('placeholder')
  return (
    <div className="demo-labels">
      <div className="demo-controls">
        <Segmented
          label="Field style"
          value={mode}
          onChange={setMode}
          options={[{ value: 'placeholder', label: 'Placeholder only' }, { value: 'label', label: 'Visible labels' }]}
        />
      </div>
      <form className="mini-app label-form" onSubmit={(e) => e.preventDefault()} key={mode}>
        {FIELDS.map((f) =>
          mode === 'placeholder' ? (
            <input key={f.id} className="input input-ph" placeholder={f.label} aria-label={f.label} />
          ) : (
            <div key={f.id} className="field">
              <label htmlFor={`lf-${f.id}`}>{f.label}</label>
              <input id={`lf-${f.id}`} className="input" aria-describedby={`lf-${f.id}-hint`} />
              <small id={`lf-${f.id}-hint`} className="muted">{f.hint}</small>
            </div>
          )
        )}
      </form>
    </div>
  )
}
