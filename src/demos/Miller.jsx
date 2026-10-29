import { useEffect, useState } from 'react'
import { Segmented, Verdict } from '../components/Controls'

const digits = () => '4' + Array.from({ length: 9 }, () => Math.floor(Math.random() * 10)).join('')
const chunk = (s) => `${s.slice(0, 3)} ${s.slice(3, 6)} ${s.slice(6)}`

export default function MillerDemo() {
  const [mode, setMode] = useState('raw')
  const [phase, setPhase] = useState('idle') // idle | show | recall | result
  const [number, setNumber] = useState('')
  const [answer, setAnswer] = useState('')

  useEffect(() => {
    if (phase !== 'show') return
    const t = setTimeout(() => setPhase('recall'), 3000)
    return () => clearTimeout(t)
  }, [phase])

  function begin() {
    setNumber(digits())
    setAnswer('')
    setPhase('show')
  }

  const typed = answer.replace(/\D/g, '')
  const score = [...number].filter((d, i) => typed[i] === d).length

  return (
    <div className="demo-miller">
      <div className="demo-controls">
        <Segmented
          label="Number format"
          value={mode}
          onChange={(v) => { setMode(v); setPhase('idle') }}
          options={[{ value: 'raw', label: 'One long string' }, { value: 'chunked', label: 'Chunked' }]}
        />
        <button className="btn btn-primary" onClick={begin} disabled={phase === 'show'}>
          Show number
        </button>
      </div>
      <div className="miller-stage">
        {phase === 'idle' && <p className="muted">You'll see a 10-digit phone number for 3 seconds.</p>}
        {phase === 'show' && (
          <p className="miller-number" aria-live="polite">{mode === 'chunked' ? chunk(number) : number}</p>
        )}
        {phase === 'recall' && (
          <form
            className="miller-form"
            onSubmit={(e) => { e.preventDefault(); setPhase('result') }}
          >
            <label htmlFor="miller-input">Type the number you saw</label>
            <div className="row">
              <input
                id="miller-input"
                className="input"
                inputMode="numeric"
                autoComplete="off"
                autoFocus
                value={answer}
                onChange={(e) => setAnswer(e.target.value)}
              />
              <button className="btn btn-primary">Check</button>
            </div>
          </form>
        )}
        {phase === 'result' && (
          <div>
            <p className="miller-number small">{chunk(number)}</p>
            <Verdict tone={score >= 9 ? 'good' : score >= 6 ? 'warn' : 'bad'}>
              You got {score} of 10 digits in the right place. Try the other format and compare.
            </Verdict>
          </div>
        )}
      </div>
    </div>
  )
}
