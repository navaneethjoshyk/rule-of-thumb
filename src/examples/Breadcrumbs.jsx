import { useState } from 'react'

const TRAIL = ['Home', 'Programs', 'Web Development', 'Accessibility basics']

export function Breadcrumbs({ items, label = 'Breadcrumb', onNavigate }) {
  return (
    <nav aria-label={label} className="cx-crumbs">
      <ol>
        {items.map((item, i) => {
          const last = i === items.length - 1
          return (
            <li key={item.label}>
              {last ? (
                <span aria-current="page">{item.label}</span>
              ) : (
                <a href={item.href ?? '#/'} onClick={onNavigate ? (e) => { e.preventDefault(); onNavigate(i) } : undefined}>{item.label}</a>
              )}
            </li>
          )
        })}
      </ol>
    </nav>
  )
}

export default function BreadcrumbsExample() {
  const [depth, setDepth] = useState(TRAIL.length)
  const items = TRAIL.slice(0, depth).map((label) => ({ label }))
  return (
    <div className="cx-stack">
      <div className="mini-app">
        <Breadcrumbs items={items} label="Example breadcrumb" onNavigate={(i) => setDepth(i + 1)} />
        <h3 className="cx-page-title">{TRAIL[depth - 1]}</h3>
        <p className="muted small">Click an earlier step to go back up the hierarchy.</p>
      </div>
      <div className="row">
        <button className="btn btn-ghost" disabled={depth === TRAIL.length} onClick={() => setDepth(TRAIL.length)}>Go back to the deepest page</button>
      </div>
    </div>
  )
}
