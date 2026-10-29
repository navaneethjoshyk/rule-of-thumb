import { useState } from 'react'
import { Slider, Verdict } from '../components/Controls'

const GROUP_GAP = 24

export default function ProximityDemo() {
  const [gap, setGap] = useState(24)
  const tone = gap <= 8 ? 'good' : gap < 18 ? 'warn' : 'bad'
  const text = gap <= 8
    ? 'Each label sits right on top of its field. The grouping is obvious.'
    : gap < 18
      ? 'Getting loose. The label is drifting away from its field.'
      : 'The labels float halfway between boxes. Does “Email” belong to the box above it or below it?'

  return (
    <div className="demo-proximity">
      <div className="demo-controls">
        <Slider label="Space between label and field" value={gap} min={0} max={32} unit=" px" onChange={setGap} />
      </div>
      <div className="mock-form" style={{ '--label-gap': `${gap}px`, '--group-gap': `${GROUP_GAP}px` }}>
        {['Full name', 'Email', 'Phone'].map((l) => (
          <div className="mock-field" key={l}>
            <span className="mock-label">{l}</span>
            <span className="mock-input" />
          </div>
        ))}
      </div>
      <Verdict tone={tone}>{text}</Verdict>
    </div>
  )
}
