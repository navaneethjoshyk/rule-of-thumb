import { useId } from 'react'

// A real switch: button with role="switch" so screen readers announce on/off.
export function Switch({ checked, onChange, children }) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      className="switch"
      onClick={() => onChange(!checked)}
    >
      <span className="switch-track" aria-hidden="true">
        <span className="switch-thumb" />
      </span>
      <span>{children}</span>
    </button>
  )
}

// Segmented control built on radio inputs: arrow keys work for free.
export function Segmented({ label, value, options, onChange }) {
  const name = useId()
  return (
    <fieldset className="segmented">
      <legend className="sr-only">{label}</legend>
      {options.map((opt) => (
        <label key={opt.value} className={value === opt.value ? 'is-on' : ''}>
          <input
            type="radio"
            name={name}
            value={opt.value}
            checked={value === opt.value}
            onChange={() => onChange(opt.value)}
          />
          {opt.label}
        </label>
      ))}
    </fieldset>
  )
}

export function Slider({ label, value, min, max, step = 1, onChange, unit = '' }) {
  const id = useId()
  return (
    <div className="slider">
      <label htmlFor={id}>
        {label} <output htmlFor={id}>{value}{unit}</output>
      </label>
      <input
        id={id}
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
      />
    </div>
  )
}

export function Verdict({ tone = 'neutral', children }) {
  const icon = tone === 'good' ? '✓' : tone === 'bad' ? '✕' : tone === 'warn' ? '!' : 'i'
  return (
    <p className={`verdict verdict-${tone}`} role="status">
      <span className="verdict-icon" aria-hidden="true">{icon}</span>
      <span>{children}</span>
    </p>
  )
}

export const avg = (arr) =>
  arr.length ? Math.round(arr.reduce((s, v) => s + v, 0) / arr.length) : null
