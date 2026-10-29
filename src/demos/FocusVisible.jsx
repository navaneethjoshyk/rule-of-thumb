import { useState } from 'react'
import { Switch } from '../components/Controls'

export default function FocusVisibleDemo() {
  const [hidden, setHidden] = useState(false)
  return (
    <div className="demo-focus">
      <div className="demo-controls">
        <Switch checked={hidden} onChange={setHidden}>Hide the focus ring</Switch>
      </div>
      <div className={`focus-stage ${hidden ? 'no-focus' : ''}`}>
        <button className="btn btn-ghost">Start here</button>
        <nav className="focus-nav" aria-label="Demo navigation">
          <a href="#/" onClick={(e) => e.preventDefault()}>Overview</a>
          <a href="#/" onClick={(e) => e.preventDefault()}>Billing</a>
          <a href="#/" onClick={(e) => e.preventDefault()}>Team</a>
        </nav>
        <label className="focus-check"><input type="checkbox" /> Email me updates</label>
        <div className="row">
          <button className="btn btn-ghost">Cancel</button>
          <button className="btn btn-primary">Save settings</button>
        </div>
      </div>
    </div>
  )
}
