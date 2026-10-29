import { useEffect, useRef, useState } from 'react'
import { Slider, Switch, Verdict } from '../components/Controls'

const FLIGHTS = [
  ['YYZ → YVR', '7:05', '$289'],
  ['YYZ → YVR', '11:40', '$242'],
  ['YYZ → YVR', '18:15', '$318'],
]

function verdict(ms) {
  if (ms <= 100) return ['good', 'Feels instant. People don’t notice any wait.']
  if (ms <= 400) return ['good', 'Under the 400 ms Doherty threshold. Still feels responsive.']
  if (ms <= 1000) return ['warn', 'Noticeable. People stay on task, but they feel the pause.']
  return ['bad', 'Long enough for attention to drift. Show progress or a skeleton.']
}

export default function DohertyDemo() {
  const [delay, setDelay] = useState(1200)
  const [skeleton, setSkeleton] = useState(false)
  const [state, setState] = useState('idle') // idle | loading | done
  const timer = useRef()

  useEffect(() => () => clearTimeout(timer.current), [])

  function search() {
    clearTimeout(timer.current)
    setState('loading')
    timer.current = setTimeout(() => setState('done'), delay)
  }

  const [tone, text] = verdict(delay)

  return (
    <div className="demo-doherty">
      <div className="demo-controls">
        <Slider label="Response time" value={delay} min={0} max={3000} step={100} unit=" ms" onChange={setDelay} />
        <Switch checked={skeleton} onChange={setSkeleton}>Show skeleton while loading</Switch>
      </div>
      <div className="mini-app">
        <button className="btn btn-primary" onClick={search}>Search flights</button>
        <ul className="flight-list" aria-busy={state === 'loading'}>
          {state === 'loading' && skeleton &&
            [0, 1, 2].map((i) => <li key={i} className="skeleton-row"><span /><span /><span /></li>)}
          {state === 'done' &&
            FLIGHTS.map(([r, t, p]) => <li key={t}><span>{r}</span><span>{t}</span><strong>{p}</strong></li>)}
          {state === 'idle' && <li className="muted plain">Results will show here.</li>}
        </ul>
      </div>
      <Verdict tone={tone}>{text}</Verdict>
    </div>
  )
}
