import { useState } from 'react'
import { lessonHref } from '../lib/router'

const FIXES = [
  { id: 'contrast', text: 'Raise text contrast above 4.5:1', slug: 'color-contrast' },
  { id: 'labels', text: 'Give every field a visible label', slug: 'labels-not-placeholders' },
  { id: 'proximity', text: 'Group each label with its own field', slug: 'law-of-proximity' },
  { id: 'error', text: 'Explain the error in words, not just red', slug: 'not-color-alone' },
  { id: 'hierarchy', text: 'Make one action the obvious next step', slug: 'von-restorff-effect' },
  { id: 'targets', text: 'Make the buttons big enough to tap', slug: 'target-size' },
]

export default function FixIt() {
  const [n, setN] = useState(0)
  const on = (id) => FIXES.findIndex((f) => f.id === id) < n
  const classes = FIXES.slice(0, n).map((f) => `fx-${f.id}`).join(' ')
  const done = n === FIXES.length

  return (
    <div className="fixit">
      <div className="fixit-screen" aria-hidden="true">
        <div className={`bc ${classes}`}>
          <p className="bc-title">Create your account</p>
          <p className="bc-sub">Start your free 14-day trial. No card needed.</p>
          <div className="bc-field">
            <span className="bc-label">Email</span>
            <span className="bc-input bc-invalid">
              {on('labels') ? 'sam@example' : <span className="bc-ph">Email</span>}
            </span>
            {on('error') && <span className="bc-err">⚠ Add the domain, like sam@example.com</span>}
          </div>
          <div className="bc-field">
            <span className="bc-label">Password</span>
            <span className="bc-input"><span className="bc-ph">{on('labels') ? '' : 'Password'}</span></span>
          </div>
          <div className="bc-actions">
            <span className="bc-btn bc-secondary">Cancel</span>
            <span className="bc-btn bc-primary">Create account</span>
          </div>
          <p className="bc-fine">By continuing you agree to the terms of service.</p>
        </div>
      </div>

      <div className="fixit-panel">
        <div className="fixit-buttons">
          <button className="btn btn-primary" onClick={() => setN((v) => Math.min(v + 1, FIXES.length))} disabled={done}>
            {done ? 'All six rules applied' : n === 0 ? 'Fix the first rule' : 'Fix the next rule'}
          </button>
          {n > 0 && <button className="btn btn-ghost" onClick={() => setN(0)}>Break it again</button>}
        </div>
        <ol className="fixit-list" aria-live="polite">
          {FIXES.map((f, i) => (
            <li key={f.id} className={i < n ? 'is-fixed' : ''}>
              {i < n ? (
                <a href={lessonHref(f.slug)}><mark>{f.text}</mark></a>
              ) : (
                <span>{f.text}</span>
              )}
            </li>
          ))}
        </ol>
      </div>
    </div>
  )
}
