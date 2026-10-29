import { useId, useRef, useState } from 'react'

const TABS = [
  { label: 'Overview', body: 'The Team plan gives up to 10 people shared projects, comments and version history. Everything in Free is included.' },
  { label: 'Pricing', body: '$12 per person per month, billed yearly, or $15 billed monthly. Cancel any time; you keep access until the period ends.' },
  { label: 'Reviews', body: '4.7 out of 5 from 312 reviews. “Setup took ten minutes and the whole studio was on it by lunch.”' },
]

export default function TabsExample() {
  const base = useId()
  const [active, setActive] = useState(0)
  const tabs = useRef([])

  // Automatic activation: arrow keys move focus AND select the tab.
  function onKey(e) {
    const last = TABS.length - 1
    const next = { ArrowRight: active === last ? 0 : active + 1, ArrowLeft: active === 0 ? last : active - 1, Home: 0, End: last }[e.key]
    if (next === undefined) return
    e.preventDefault()
    setActive(next)
    tabs.current[next]?.focus()
  }

  return (
    <div className="cx-tabs">
      <div role="tablist" aria-label="Team plan details" className="cx-tablist">
        {TABS.map((t, i) => (
          <button
            key={t.label}
            ref={(el) => (tabs.current[i] = el)}
            role="tab"
            id={`${base}-tab-${i}`}
            aria-selected={active === i}
            aria-controls={`${base}-panel-${i}`}
            tabIndex={active === i ? 0 : -1}
            className="cx-tab"
            onClick={() => setActive(i)}
            onKeyDown={onKey}
          >
            {t.label}
          </button>
        ))}
      </div>
      {TABS.map((t, i) => (
        <div
          key={t.label}
          role="tabpanel"
          id={`${base}-panel-${i}`}
          aria-labelledby={`${base}-tab-${i}`}
          tabIndex={0}
          hidden={active !== i}
          className="cx-tabpanel"
        >
          <p>{t.body}</p>
        </div>
      ))}
    </div>
  )
}
