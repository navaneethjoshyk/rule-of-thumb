import { useEffect, useRef, useState } from 'react'
import { Switch, Verdict } from '../components/Controls'

const DURATION = 3500

export default function SystemStatusDemo() {
  const [feedback, setFeedback] = useState(false)
  const [state, setState] = useState('idle') // idle | uploading | done
  const [pct, setPct] = useState(0)
  const [extra, setExtra] = useState(0)
  const raf = useRef()

  useEffect(() => () => cancelAnimationFrame(raf.current), [])

  function upload() {
    if (state === 'uploading') return setExtra((n) => n + 1)
    setExtra(0)
    setPct(0)
    setState('uploading')
    const start = performance.now()
    const tick = (now) => {
      const p = Math.min(1, (now - start) / DURATION)
      setPct(Math.round(p * 100))
      if (p < 1) raf.current = requestAnimationFrame(tick)
      else setState('done')
    }
    raf.current = requestAnimationFrame(tick)
  }

  return (
    <div className="demo-status">
      <div className="demo-controls">
        <Switch checked={feedback} onChange={(v) => { setFeedback(v); setState('idle') }}>Show feedback</Switch>
      </div>
      <div className="mini-app">
        <div className="file-row">
          <span className="file-icon" aria-hidden="true">JPG</span>
          <span>beach-trip.jpg <span className="muted">4.2 MB</span></span>
          <button className="btn btn-primary" onClick={upload} aria-disabled={feedback && state === 'uploading'}>
            {feedback && state === 'uploading' ? 'Uploading…' : 'Upload'}
          </button>
        </div>
        {feedback && state === 'uploading' && (
          <div className="progress" role="progressbar" aria-valuenow={pct} aria-valuemin={0} aria-valuemax={100} aria-label="Upload progress">
            <span style={{ width: `${pct}%` }} />
            <small>{pct}% · about {Math.ceil(((100 - pct) / 100) * DURATION / 1000)} s left</small>
          </div>
        )}
        {state === 'done' && <p className="done-msg">✓ Uploaded beach-trip.jpg</p>}
      </div>
      {state === 'done' && (
        <Verdict tone={extra === 0 ? 'good' : 'warn'}>
          {extra === 0
            ? 'No extra clicks. You knew it was working.'
            : `You clicked ${extra} extra ${extra === 1 ? 'time' : 'times'} while it was working. With no feedback, people assume it’s broken.`}
        </Verdict>
      )}
    </div>
  )
}
