import { useState } from 'react'
import { Switch } from '../components/Controls'

export default function ColorAloneDemo() {
  const [grey, setGrey] = useState(false)
  const [fixed, setFixed] = useState(false)
  return (
    <div className="demo-color">
      <div className="demo-controls">
        <Switch checked={grey} onChange={setGrey}>See it without color</Switch>
        <Switch checked={fixed} onChange={setFixed}>Add an icon and message</Switch>
      </div>
      <div className={`mock-form-card ${grey ? 'is-grey' : ''}`}>
        <div className="ca-field">
          <span className="mock-label">Email</span>
          <span className="ca-input">sam@example.com</span>
        </div>
        <div className="ca-field">
          <span className="mock-label">Postal code</span>
          <span className="ca-input ca-error">M5V 2T</span>
          {fixed && (
            <span className="ca-message">
              <svg viewBox="0 0 20 20" width="16" height="16" aria-hidden="true"><circle cx="10" cy="10" r="9" fill="currentColor" /><path d="M10 5v6M10 14v.5" stroke="#fff" strokeWidth="2" strokeLinecap="round" /></svg>
              Postal codes have 6 characters, like M5V 2T6
            </span>
          )}
        </div>
      </div>
    </div>
  )
}
