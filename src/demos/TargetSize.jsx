import { useRef, useState } from 'react'
import { Slider, Verdict } from '../components/Controls'

const ICONS = [
  ['Home', 'M3 11l9-7 9 7v9h-6v-6H9v6H3z'],
  ['Search', 'M11 4a7 7 0 1 0 0 14 7 7 0 0 0 0-14zM21 21l-5-5'],
  ['Add', 'M12 5v14M5 12h14'],
  ['Saved', 'M12 20s-7-4.5-7-10a4 4 0 0 1 7-2.5A4 4 0 0 1 19 10c0 5.5-7 10-7 10z'],
  ['Profile', 'M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM4 21a8 8 0 0 1 16 0'],
]
const WOBBLE = 11 // px: roughly how far a real thumb lands from where you aim

export default function TargetSizeDemo() {
  const [size, setSize] = useState(20)
  const [target, setTarget] = useState(2)
  const [hits, setHits] = useState(0)
  const [misses, setMisses] = useState(0)
  const [dot, setDot] = useState(null)
  const pad = useRef(null)
  const refs = useRef([])

  function next() {
    let t
    do { t = Math.floor(Math.random() * ICONS.length) } while (t === target)
    setTarget(t)
  }

  function tap(e) {
    // Keyboard activation has no pointer position: count it as an exact hit.
    if (e.detail === 0) {
      const idx = refs.current.indexOf(e.target.closest('button'))
      if (idx === target) { setHits((h) => h + 1); next() } else setMisses((m) => m + 1)
      return
    }
    const angle = Math.random() * Math.PI * 2
    const r = Math.random() * WOBBLE
    const x = e.clientX + Math.cos(angle) * r
    const y = e.clientY + Math.sin(angle) * r
    const box = pad.current.getBoundingClientRect()
    setDot({ x: x - box.left, y: y - box.top, k: Date.now() })
    const landed = refs.current.findIndex((b) => {
      const rc = b.getBoundingClientRect()
      return x >= rc.left && x <= rc.right && y >= rc.top && y <= rc.bottom
    })
    if (landed === target) { setHits((h) => h + 1); next() } else setMisses((m) => m + 1)
  }

  const tone = size >= 44 ? 'good' : size >= 24 ? 'warn' : 'bad'
  const text = size >= 44
    ? `${size} px meets the 44 px enhanced target (AAA) and Apple’s guideline.`
    : size >= 24
      ? `${size} px meets the WCAG 2.2 minimum of 24 px, but thumbs will still miss sometimes.`
      : `${size} px is below the WCAG 2.2 minimum of 24 px.`

  return (
    <div className="demo-target">
      <div className="demo-controls">
        <Slider label="Button size" value={size} min={16} max={56} step={2} unit=" px" onChange={setSize} />
        <button className="btn btn-ghost" onClick={() => { setHits(0); setMisses(0) }}>Reset score</button>
      </div>
      <div className="target-pad" ref={pad} onClick={tap}>
        <p className="target-prompt">Tap <strong>{ICONS[target][0]}</strong></p>
        <div className="target-bar">
          {ICONS.map(([name, d], i) => (
            <button
              key={name}
              ref={(el) => (refs.current[i] = el)}
              aria-label={name}
              className={`target-btn ${i === target ? 'is-target' : ''}`}
              style={{ width: size, height: size }}
            >
              <svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d={d} /></svg>
            </button>
          ))}
        </div>
        {dot && <span key={dot.k} className="thumb-dot" style={{ left: dot.x, top: dot.y }} aria-hidden="true" />}
      </div>
      <dl className="stat-row">
        <div><dt>Hits</dt><dd>{hits}</dd></div>
        <div><dt>Misses</dt><dd>{misses}</dd></div>
      </dl>
      <Verdict tone={tone}>{text}</Verdict>
    </div>
  )
}
