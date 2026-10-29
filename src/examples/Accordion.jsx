import { useId, useRef, useState } from 'react'
import { Segmented } from '../components/Controls'

const ITEMS = [
  { q: 'How long does delivery take?', a: 'Standard delivery takes 5–7 business days. Express arrives in 2 business days.' },
  { q: 'Can I return an item?', a: 'Yes. Return unused items within 30 days for a full refund. Return shipping is free.' },
  { q: 'Do you ship outside Canada?', a: 'We ship to the US and the UK. Duties are calculated at checkout.' },
  { q: 'How do I change my order?', a: 'You can change or cancel an order from your account until it ships, usually within 24 hours.' },
]

export default function AccordionExample() {
  const base = useId()
  const [mode, setMode] = useState('multi')
  const [open, setOpen] = useState([0])
  const buttons = useRef([])

  function toggle(i) {
    setOpen((o) => {
      if (o.includes(i)) return o.filter((x) => x !== i)
      return mode === 'single' ? [i] : [...o, i]
    })
  }

  // Optional APG keys: arrows, Home and End move between headers.
  function onKey(e, i) {
    const last = ITEMS.length - 1
    const go = { ArrowDown: i === last ? 0 : i + 1, ArrowUp: i === 0 ? last : i - 1, Home: 0, End: last }[e.key]
    if (go === undefined) return
    e.preventDefault()
    buttons.current[go]?.focus()
  }

  return (
    <div className="cx-stack">
      <Segmented
        label="Accordion behaviour"
        value={mode}
        onChange={(v) => { setMode(v); if (v === 'single') setOpen((o) => o.slice(0, 1)) }}
        options={[{ value: 'multi', label: 'Several open' }, { value: 'single', label: 'One at a time' }]}
      />
      <div className="cx-accordion">
        {ITEMS.map((item, i) => {
          const isOpen = open.includes(i)
          const btnId = `${base}-btn-${i}`
          const panelId = `${base}-panel-${i}`
          return (
            <div className="cx-acc-item" key={i}>
              <h3 className="cx-acc-heading">
                <button
                  ref={(el) => (buttons.current[i] = el)}
                  id={btnId}
                  className="cx-acc-trigger"
                  aria-expanded={isOpen}
                  aria-controls={panelId}
                  onClick={() => toggle(i)}
                  onKeyDown={(e) => onKey(e, i)}
                >
                  <span>{item.q}</span>
                  <svg className="cx-chevron" viewBox="0 0 24 24" width="20" height="20" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 9l6 6 6-6" /></svg>
                </button>
              </h3>
              <div id={panelId} role="region" aria-labelledby={btnId} className="cx-acc-panel" hidden={!isOpen}>
                <p>{item.a}</p>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
