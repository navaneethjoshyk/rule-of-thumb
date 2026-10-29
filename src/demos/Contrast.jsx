import { useState } from 'react'
import { contrastRatio, hexToRgb } from '../lib/contrast'

const PRESETS = [
  { name: 'Light grey on white', fg: '#a3a3a3', bg: '#ffffff' },
  { name: 'White on yellow', fg: '#ffffff', bg: '#f5c400' },
  { name: 'Mid grey on white', fg: '#767676', bg: '#ffffff' },
  { name: 'Ink on paper', fg: '#1f2a1f', bg: '#f3f1ea' },
]

const CHECKS = [
  { label: 'Body text (AA)', min: 4.5 },
  { label: 'Large text (AA)', min: 3 },
  { label: 'Buttons and icons (AA)', min: 3 },
  { label: 'Body text (AAA)', min: 7 },
]

function ColorField({ label, value, onChange }) {
  const [text, setText] = useState(value)
  const sync = (v) => { setText(v); if (hexToRgb(v)) onChange(v.startsWith('#') ? v : `#${v}`) }
  return (
    <div className="color-field">
      <span className="color-field-label">{label}</span>
      <input type="color" aria-label={`${label} picker`} value={value} onChange={(e) => { setText(e.target.value); onChange(e.target.value) }} />
      <input className="input mono" aria-label={`${label} hex`} value={text} onChange={(e) => sync(e.target.value)} spellCheck="false" />
    </div>
  )
}

export default function ContrastDemo() {
  const [fg, setFg] = useState('#a3a3a3')
  const [bg, setBg] = useState('#ffffff')
  const [key, setKey] = useState(0)
  const ratio = contrastRatio(fg, bg) ?? 1

  return (
    <div className="demo-contrast">
      <div className="contrast-inputs" key={key}>
        <ColorField label="Text" value={fg} onChange={setFg} />
        <ColorField label="Background" value={bg} onChange={setBg} />
      </div>
      <div className="preset-row">
        {PRESETS.map((p) => (
          <button key={p.name} className="chip" onClick={() => { setFg(p.fg); setBg(p.bg); setKey((k) => k + 1) }}>
            <span className="swatch" style={{ background: p.bg, color: p.fg }} aria-hidden="true">Aa</span>
            {p.name}
          </button>
        ))}
      </div>
      <div className="contrast-preview" style={{ color: fg, background: bg }}>
        <p className="contrast-big">Large heading text</p>
        <p>Regular body text at 16 pixels. Can you read this comfortably?</p>
      </div>
      <div className="contrast-result">
        <p className="contrast-ratio"><strong>{ratio.toFixed(2)}</strong>:1</p>
        <ul className="check-list">
          {CHECKS.map((c) => {
            const pass = ratio >= c.min
            return (
              <li key={c.label} className={pass ? 'pass' : 'fail'}>
                <span aria-hidden="true">{pass ? '✓' : '✕'}</span>
                {c.label}, needs {c.min}:1 <span className="sr-only">{pass ? 'passes' : 'fails'}</span>
                <span className="check-word" aria-hidden="true">{pass ? 'Pass' : 'Fail'}</span>
              </li>
            )
          })}
        </ul>
      </div>
    </div>
  )
}
