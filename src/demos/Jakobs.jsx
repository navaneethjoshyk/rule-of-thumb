import { useRef, useState } from 'react'
import { Segmented } from '../components/Controls'

const Cart = () => (
  <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="9" cy="20" r="1.5" /><circle cx="18" cy="20" r="1.5" />
    <path d="M2 3h3l2.6 12.2a1 1 0 0 0 1 .8h9.7a1 1 0 0 0 1-.8L21 7H6" />
  </svg>
)
const Crate = () => (
  <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="2" strokeLinejoin="round">
    <path d="M3 8l9-5 9 5v8l-9 5-9-5z" /><path d="M3 8l9 5 9-5M12 13v8" />
  </svg>
)
const Shape = ({ d }) => (
  <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="2" strokeLinejoin="round"><path d={d} /></svg>
)

export default function JakobsDemo() {
  const [layout, setLayout] = useState('familiar')
  const [running, setRunning] = useState(false)
  const [misses, setMisses] = useState(0)
  const [results, setResults] = useState({})
  const startedAt = useRef(0)

  function begin() {
    setRunning(true)
    setMisses(0)
    startedAt.current = performance.now()
  }
  function found() {
    if (!running) return
    const t = Math.round(performance.now() - startedAt.current)
    setResults((r) => ({ ...r, [layout]: { t, misses } }))
    setRunning(false)
  }
  const miss = () => running && setMisses((m) => m + 1)

  return (
    <div className="demo-jakobs">
      <div className="demo-controls">
        <Segmented
          label="Layout"
          value={layout}
          onChange={(v) => { setLayout(v); setRunning(false) }}
          options={[{ value: 'familiar', label: 'Familiar layout' }, { value: 'unusual', label: 'Unusual layout' }]}
        />
        <button className="btn btn-primary" onClick={begin}>{running ? 'Restart' : 'Start'}</button>
      </div>

      <div className={`mock-site ${running ? '' : 'is-blurred'}`} aria-hidden={!running}>
        {layout === 'familiar' ? (
          <header className="mock-header">
            <button tabIndex={running ? 0 : -1} className="mock-logo" onClick={miss}>Fernway</button>
            <nav className="mock-nav">
              {['Women', 'Men', 'Home', 'Sale'].map((n) => <button tabIndex={running ? 0 : -1} key={n} onClick={miss}>{n}</button>)}
            </nav>
            <div className="mock-icons">
              <button tabIndex={running ? 0 : -1} aria-label="Search" onClick={miss}><Shape d="M11 4a7 7 0 1 0 0 14 7 7 0 0 0 0-14zM21 21l-5-5" /></button>
              <button tabIndex={running ? 0 : -1} aria-label="Cart" onClick={found}><Cart /></button>
            </div>
          </header>
        ) : (
          <header className="mock-header mock-unusual">
            <div className="mock-icons">
              <button tabIndex={running ? 0 : -1} aria-label="Shape one" onClick={miss}><Shape d="M12 3l9 18H3z" /></button>
              <button tabIndex={running ? 0 : -1} aria-label="Shape two" onClick={miss}><Shape d="M4 4h16v16H4z" /></button>
              <button tabIndex={running ? 0 : -1} aria-label="Cart" onClick={found}><Crate /></button>
              <button tabIndex={running ? 0 : -1} aria-label="Shape three" onClick={miss}><Shape d="M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18z" /></button>
            </div>
            <nav className="mock-nav">
              {['Collections', 'Stories', 'Atelier'].map((n) => <button tabIndex={running ? 0 : -1} key={n} onClick={miss}>{n}</button>)}
            </nav>
            <button tabIndex={running ? 0 : -1} className="mock-logo" onClick={miss}>Fernway</button>
          </header>
        )}
        <div className="mock-body" onClick={miss}>
          <div className="mock-block" /><div className="mock-block" /><div className="mock-block" />
        </div>
        {!running && <p className="mock-overlay">Press Start, then click the shopping cart</p>}
      </div>

      <dl className="stat-row">
        {['familiar', 'unusual'].map((k) => (
          <div key={k}>
            <dt>{k === 'familiar' ? 'Familiar layout' : 'Unusual layout'}</dt>
            <dd>{results[k] ? `${results[k].t} ms` : 'not tried yet'}</dd>
            {results[k] && <dd className="muted">{results[k].misses} wrong clicks</dd>}
          </div>
        ))}
      </dl>
    </div>
  )
}
