import { useState } from 'react'
import { Slider, Verdict } from '../components/Controls'

export default function LineLengthDemo() {
  const [ch, setCh] = useState(120)
  const tone = ch < 45 ? 'warn' : ch <= 80 ? 'good' : 'bad'
  const text = ch < 45
    ? 'Too short. Your eye jumps back so often the rhythm breaks.'
    : ch <= 80
      ? 'Comfortable. This is the 45–80 character sweet spot.'
      : 'Too long. Finding the start of the next line takes effort.'

  return (
    <div className="demo-line">
      <div className="demo-controls">
        <Slider label="Characters per line" value={ch} min={25} max={140} step={5} onChange={setCh} />
      </div>
      <div className="line-stage">
        <p style={{ maxWidth: `${ch}ch` }}>
          Reading is a series of small jumps. Your eyes fix on a few words, hop forward, and at the end of each line they
          sweep back to the left to find the next one. When lines are very long, that return sweep is a long trip and
          it’s easy to land on the wrong line. When lines are very short, you spend more time sweeping than reading. A
          measure somewhere around sixty characters keeps both problems small, which is why books, newspapers and good
          websites all land in roughly the same range.
        </p>
      </div>
      <Verdict tone={tone}>{text}</Verdict>
    </div>
  )
}
