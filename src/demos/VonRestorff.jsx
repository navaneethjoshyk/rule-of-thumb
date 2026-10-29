import { useState } from 'react'
import { Switch } from '../components/Controls'

export default function VonRestorffDemo() {
  const [distinct, setDistinct] = useState(false)
  return (
    <div className="demo-vr">
      <div className="demo-controls">
        <Switch checked={distinct} onChange={setDistinct}>Make the main action stand out</Switch>
      </div>
      <div className="mock-dialog" role="group" aria-label="Example dialog">
        <p className="mock-dialog-title">Save changes to “Q4 plan”?</p>
        <p className="muted">Your edits will be lost if you close without saving.</p>
        <div className={`mock-dialog-actions ${distinct ? 'is-distinct' : ''}`}>
          <button className="vr-btn vr-quiet">Don’t save</button>
          <button className="vr-btn vr-quiet">Cancel</button>
          <button className="vr-btn vr-main">Save</button>
        </div>
      </div>
      <p className="muted small">
        {distinct
          ? 'One action now looks different, so your eye goes straight to it.'
          : 'Three identical buttons. Your eye has to read all of them to find the right one.'}
      </p>
    </div>
  )
}
