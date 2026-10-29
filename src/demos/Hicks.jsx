import { useRef, useState } from 'react'
import { Segmented, avg } from '../components/Controls'

const CITIES = ['Oslo', 'Lima', 'Rome', 'Cairo', 'Seoul', 'Quito', 'Paris', 'Delhi', 'Tokyo', 'Accra', 'Hanoi', 'Dakar', 'Kyiv', 'Doha', 'Riga', 'Bern', 'Lagos', 'Perth', 'Dubai', 'Milan', 'Porto', 'Turin', 'Sofia', 'Minsk', 'Tunis', 'Rabat', 'Baku', 'Male', 'Suva', 'Apia', 'Nuuk', 'Lusaka']
const COUNTS = [4, 12, 32]

const shuffle = (a) => [...a].sort(() => Math.random() - 0.5)

export default function HicksDemo() {
  const [n, setN] = useState(4)
  const [options, setOptions] = useState([])
  const [target, setTarget] = useState(null)
  const [wrong, setWrong] = useState(null)
  const [times, setTimes] = useState({ 4: [], 12: [], 32: [] })
  const startedAt = useRef(0)

  function begin() {
    const opts = shuffle(CITIES).slice(0, n)
    setOptions(opts)
    setTarget(opts[Math.floor(Math.random() * opts.length)])
    setWrong(null)
    startedAt.current = performance.now()
  }

  function pick(city) {
    if (city !== target) return setWrong(city)
    const t = Math.round(performance.now() - startedAt.current)
    setTimes((p) => ({ ...p, [n]: [...p[n], t] }))
    setTarget(null)
  }

  return (
    <div className="demo-hicks">
      <div className="demo-controls">
        <Segmented
          label="Number of options"
          value={n}
          onChange={(v) => { setN(v); setTarget(null) }}
          options={COUNTS.map((c) => ({ value: c, label: `${c} options` }))}
        />
        <button className="btn btn-primary" onClick={begin}>
          {target ? 'Restart' : 'Start'}
        </button>
      </div>
      <div className="hicks-board" aria-live="polite">
        {target ? (
          <>
            <p className="hicks-prompt">Find <strong>{target}</strong></p>
            <div className="hicks-grid">
              {options.map((c) => (
                <button key={c} className={`chip ${wrong === c ? 'chip-wrong' : ''}`} onClick={() => pick(c)}>
                  {c}
                </button>
              ))}
            </div>
          </>
        ) : (
          <p className="muted">Press Start and a city name will appear. Click it in the list as fast as you can.</p>
        )}
      </div>
      <dl className="stat-row">
        {COUNTS.map((c) => (
          <div key={c}>
            <dt>{c} options</dt>
            <dd>{avg(times[c]) ? `${avg(times[c])} ms` : 'not tried yet'}</dd>
          </div>
        ))}
      </dl>
    </div>
  )
}
