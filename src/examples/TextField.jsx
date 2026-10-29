import { useRef, useState } from 'react'

const rules = {
  name: (v) => (v.trim() ? '' : 'Enter your full name'),
  email: (v) =>
    !v.trim() ? 'Enter your email address'
      : !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim()) ? 'Enter an email address in the right format, like sam@example.com'
      : '',
}

function Field({ id, label, hint, value, error, onChange, onBlur, inputRef, ...rest }) {
  const hintId = `${id}-hint`
  const errorId = `${id}-error`
  const describedBy = [hint && hintId, error && errorId].filter(Boolean).join(' ') || undefined
  return (
    <div className={`field cx-field ${error ? 'has-error' : ''}`}>
      <label htmlFor={id}>{label}</label>
      {hint && <small id={hintId} className="muted">{hint}</small>}
      {error && (
        <p id={errorId} className="cx-error">
          <svg viewBox="0 0 20 20" width="16" height="16" aria-hidden="true"><circle cx="10" cy="10" r="9" fill="currentColor" /><path d="M10 5v6M10 14v.5" stroke="#fff" strokeWidth="2" strokeLinecap="round" /></svg>
          <span><span className="sr-only">Error: </span>{error}</span>
        </p>
      )}
      <input
        id={id}
        ref={inputRef}
        className="input"
        value={value}
        aria-invalid={error ? true : undefined}
        aria-describedby={describedBy}
        onChange={onChange}
        onBlur={onBlur}
        {...rest}
      />
    </div>
  )
}

export default function TextFieldExample() {
  const [values, setValues] = useState({ name: '', email: '' })
  const [touched, setTouched] = useState({})
  const [submitted, setSubmitted] = useState(false)
  const [done, setDone] = useState('')
  const refs = { name: useRef(), email: useRef() }

  const errors = Object.fromEntries(Object.entries(rules).map(([k, fn]) => [k, fn(values[k])]))
  const show = (k) => (touched[k] || submitted) && errors[k]

  function submit(e) {
    e.preventDefault()
    setSubmitted(true)
    const firstBad = Object.keys(rules).find((k) => errors[k])
    if (firstBad) { setDone(''); refs[firstBad].current.focus(); return }
    setDone(`Account created for ${values.email.trim()}.`)
  }

  const set = (k) => (e) => setValues((v) => ({ ...v, [k]: e.target.value }))
  const blur = (k) => () => setTouched((t) => ({ ...t, [k]: true }))

  return (
    <form className="cx-form" onSubmit={submit} noValidate>
      <Field id="tf-name" label="Full name" value={values.name} error={show('name')} onChange={set('name')} onBlur={blur('name')} inputRef={refs.name} autoComplete="name" />
      <Field id="tf-email" label="Email address" hint="We’ll only use this to send your receipt." value={values.email} error={show('email')} onChange={set('email')} onBlur={blur('email')} inputRef={refs.email} type="email" autoComplete="email" spellCheck="false" />
      <div className="row">
        <button className="btn btn-primary">Create account</button>
        <button type="button" className="btn cx-btn-text" onClick={() => { setValues({ name: '', email: '' }); setTouched({}); setSubmitted(false); setDone('') }}>Reset</button>
      </div>
      <p className="cx-status cx-success" role="status">{done && <>✓ {done}</>}</p>
    </form>
  )
}
