import { useState } from 'react'

function SettingSwitch({ id, label, description, checked, onChange }) {
  return (
    <div className="cx-setting">
      <div>
        <span id={`${id}-label`} className="cx-choice-label">{label}</span>
        <small id={`${id}-desc`} className="muted">{description}</small>
      </div>
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        aria-labelledby={`${id}-label`}
        aria-describedby={`${id}-desc`}
        className="switch cx-switch-only"
        onClick={() => onChange(!checked)}
      >
        <span className="switch-track" aria-hidden="true"><span className="switch-thumb" /></span>
        <span className="cx-switch-state" aria-hidden="true">{checked ? 'On' : 'Off'}</span>
      </button>
    </div>
  )
}

export default function ToggleSwitchExample() {
  const [dnd, setDnd] = useState(false)
  const [preview, setPreview] = useState(true)
  return (
    <div className="cx-grid-2">
      <div className="cx-settings">
        <SettingSwitch id="sw-dnd" label="Do not disturb" description="Silence notifications until you turn this off." checked={dnd} onChange={setDnd} />
        <SettingSwitch id="sw-preview" label="Message previews" description="Show the first line of each message." checked={preview} onChange={setPreview} />
      </div>
      <div className="cx-phone" aria-live="polite">
        {dnd ? (
          <p className="muted cx-center">🌙 Notifications are silenced.</p>
        ) : (
          <div className="cx-notif">
            <strong>Priya</strong>
            <span className="muted">{preview ? 'Photos from Saturday are up!' : 'New message'}</span>
          </div>
        )}
      </div>
    </div>
  )
}
