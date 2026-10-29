import { useEffect, useRef, useState } from 'react'

const Gear = () => (
  <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="3" />
    <path d="M19.4 15a1.7 1.7 0 0 0 .3 1.8l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.7 1.7 0 0 0-1.8-.3 1.7 1.7 0 0 0-1 1.5V21a2 2 0 1 1-4 0v-.1a1.7 1.7 0 0 0-1.1-1.5 1.7 1.7 0 0 0-1.8.3l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1a1.7 1.7 0 0 0 .3-1.8 1.7 1.7 0 0 0-1.5-1H3a2 2 0 1 1 0-4h.1a1.7 1.7 0 0 0 1.5-1.1 1.7 1.7 0 0 0-.3-1.8l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1a1.7 1.7 0 0 0 1.8.3H9a1.7 1.7 0 0 0 1-1.5V3a2 2 0 1 1 4 0v.1a1.7 1.7 0 0 0 1 1.5 1.7 1.7 0 0 0 1.8-.3l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1.7 1.7 0 0 0-.3 1.8V9a1.7 1.7 0 0 0 1.5 1H21a2 2 0 1 1 0 4h-.1a1.7 1.7 0 0 0-1.5 1z" />
  </svg>
)

export default function ButtonsExample() {
  const [saving, setSaving] = useState(false)
  const [status, setStatus] = useState('')
  const [name, setName] = useState('')
  const [notice, setNotice] = useState('')
  const timer = useRef()

  useEffect(() => () => clearTimeout(timer.current), [])

  function save() {
    if (saving) return
    setSaving(true)
    setStatus('Saving…')
    timer.current = setTimeout(() => { setSaving(false); setStatus('Changes saved.') }, 1500)
  }

  function publish() {
    if (!name.trim()) return setNotice('Add a project name before publishing.')
    setNotice(`Published “${name.trim()}”.`)
  }

  return (
    <div className="cx-stack">
      <div>
        <p className="cx-label">Variants, from most to least emphasis</p>
        <div className="row">
          <button className="btn btn-primary" onClick={save} aria-disabled={saving}>
            {saving && <span className="cx-spinner" aria-hidden="true" />}
            {saving ? 'Saving…' : 'Save changes'}
          </button>
          <button className="btn btn-ghost" onClick={() => setStatus('Preview opened.')}>Preview</button>
          <button className="btn cx-btn-text" onClick={() => setStatus('Nothing changed.')}>Cancel</button>
          <button className="btn cx-btn-danger" onClick={() => setStatus('Delete pressed. In a real app this would ask for confirmation or offer undo.')}>Delete project</button>
          <button className="btn btn-ghost cx-icon-btn" aria-label="Settings" onClick={() => setStatus('Settings opened.')}>
            <Gear />
          </button>
        </div>
        <p className="cx-status" role="status">{status}</p>
      </div>

      <div>
        <p className="cx-label">A button that explains why it can’t be used yet</p>
        <div className="row cx-align-end">
          <div className="field cx-field-inline">
            <label htmlFor="btn-name">Project name</label>
            <input id="btn-name" className="input" value={name} onChange={(e) => { setName(e.target.value); setNotice('') }} />
          </div>
          <button className="btn btn-primary" aria-disabled={!name.trim()} onClick={publish}>Publish</button>
        </div>
        <p className="cx-status" role="status">{notice}</p>
      </div>
    </div>
  )
}
