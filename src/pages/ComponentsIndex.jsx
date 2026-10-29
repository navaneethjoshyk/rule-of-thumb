import { componentGroups, components } from '../data/components'
import { componentHref } from '../lib/router'

export default function ComponentsIndex() {
  return (
    <section className="index wrap components-index" aria-labelledby="components-title">
      <header className="lesson-head">
        <h1 id="components-title">Components</h1>
        <p className="lesson-summary">
          <mark>Twelve everyday interface components, built so they work with a mouse, a keyboard and a screen reader.</mark>
        </p>
        <p className="lede">
          Each one has a working example, its anatomy, when to use it and when not to, keyboard and ARIA tables, common
          mistakes and HTML you can copy. They follow the W3C’s ARIA Authoring Practices.
        </p>
      </header>
      {componentGroups.map((g) => {
        const items = components.filter((c) => c.group === g.id)
        return (
          <div className="index-group" key={g.id}>
            <div className="index-head">
              <h2 className="index-group-title">{g.name}</h2>
              <p>{g.blurb}</p>
            </div>
            <ul className="index-list">
              {items.map((c) => (
                <li key={c.slug}>
                  <a href={componentHref(c.slug)}>
                    <span className="index-title">{c.name}</span>
                    <span className="index-summary">{c.summary}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )
      })}
    </section>
  )
}
