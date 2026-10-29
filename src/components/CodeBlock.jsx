import { useEffect, useRef, useState } from 'react'

export default function CodeBlock({ code, label = 'HTML' }) {
  const [copied, setCopied] = useState('')
  const timer = useRef()
  useEffect(() => () => clearTimeout(timer.current), [])

  async function copy() {
    try {
      await navigator.clipboard.writeText(code)
      setCopied('Copied to clipboard.')
    } catch {
      setCopied('Couldn’t copy. Select the code and copy it manually.')
    }
    clearTimeout(timer.current)
    timer.current = setTimeout(() => setCopied(''), 3000)
  }

  return (
    <div className="code-block">
      <div className="code-head">
        <span>{label}</span>
        <button className="btn btn-small code-copy" onClick={copy}>Copy code</button>
      </div>
      <pre tabIndex={0} aria-label={`${label} example`}><code>{code}</code></pre>
      <p className="sr-only" role="status">{copied}</p>
      {copied && <p className="code-toast" aria-hidden="true">{copied}</p>}
    </div>
  )
}
