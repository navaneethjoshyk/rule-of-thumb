import { useRef, useState } from 'react'
import { avg } from '../components/Controls'

const KINDS = {
  near: { size: 76, x: 30, label: 'Big and close' },
  far: { size: 18, x: 90, label: 'Small and far' },
}

export default function FittsDemo() {
  const [kind, setKind] = useState(null)
  const [y, setY] = useState(50)
  const [times, setTimes] = useState({ near: [], far: [] })
  const startedAt = useRef(0)

  function begin() {
    // Alternate-ish so both kinds get tested, with a bit of randomness.
    const k = times.near.length > times.far.length ? 'far'
      : times.far.length > times.near.length ? 'near'
      : Math.random() < 0.5 ? 'near' : 'far'
    setKind(k)
    setY(18 + Math.random() * 64)
    startedAt.current = performance.now()
  }

  function hit() {
    const t = Math.round(performance.now() - startedAt.current)
    setTimes((p) => ({ ...p, [kind]: [...p[kind], t] }))
    setKind(null)
  }

  return (
    <div className="demo-fitts">
      <div className="fitts-arena">
        <button className="btn btn-primary fitts-start" onClick={begin} disabled={!!kind}>
          {kind ? 'Go!' : 'Start'}
        </button>
        {kind && (
          <button
            className="fitts-target"
            aria-label="Target"
            onClick={hit}
            style={{
              width: KINDS[kind].size,
              height: KINDS[kind].size,
              left: `${KINDS[kind].x}%`,
              top: `${y}%`,
            }}
          />
        )}
      </div>
      <dl className="stat-row">
        {Object.entries(KINDS).map(([k, v]) => (
          <div key={k}>
            <dt>{v.label}</dt>
            <dd>{avg(times[k]) ? `${avg(times[k])} ms` : 'not tried yet'}</dd>
            <dd className="muted">{times[k].length} {times[k].length === 1 ? 'try' : 'tries'}</dd>
          </div>
        ))}
      </dl>
    </div>
  )
}
