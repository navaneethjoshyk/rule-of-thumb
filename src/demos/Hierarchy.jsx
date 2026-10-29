import { useState } from 'react'
import { Segmented, Switch } from '../components/Controls'

export default function HierarchyDemo() {
  const [mode, setMode] = useState('flat')
  const [squint, setSquint] = useState(false)
  return (
    <div className="demo-hierarchy">
      <div className="demo-controls">
        <Segmented
          label="Hierarchy"
          value={mode}
          onChange={setMode}
          options={[{ value: 'flat', label: 'Flat' }, { value: 'clear', label: 'Clear hierarchy' }]}
        />
        <Switch checked={squint} onChange={setSquint}>Squint test</Switch>
      </div>
      <article className={`event-card event-${mode} ${squint ? 'is-squint' : ''}`}>
        <p className="event-kicker">Saturday, June 13 · 7 pm</p>
        <h3 className="event-title">Jazz in the Park</h3>
        <p className="event-place">Trinity Bellwoods, Toronto</p>
        <p className="event-desc">An evening of live jazz from four local trios. Bring a blanket; food trucks open at 6.</p>
        <div className="event-foot">
          <span className="event-price">$18</span>
          <button className="event-btn" tabIndex={-1}>Get tickets</button>
        </div>
      </article>
    </div>
  )
}
