import CodeBlock from '../components/CodeBlock'
import { componentGroups, components } from '../data/components'
import { Breadcrumbs } from '../examples/Breadcrumbs'
import { componentHref } from '../lib/router'

export default function ComponentPage({ component: c }) {
  const index = components.indexOf(c)
  const prev = components[index - 1]
  const next = components[index + 1]
  const group = componentGroups.find((g) => g.id === c.group)
  const { Example } = c

  return (
    <article className="lesson component-page wrap">
      <div className="crumbs-row">
        <Breadcrumbs items={[{ label: 'Components', href: '#/components' }, { label: group.name, href: '#/components' }, { label: c.name }]} />
        <span className="crumbs-count">Component {index + 1} of {components.length}</span>
      </div>

      <header className="lesson-head">
        <h1>{c.name}</h1>
        <p className="lesson-summary"><mark>{c.summary}</mark></p>
      </header>

      <section className="demo" aria-labelledby="example-title">
        <div className="demo-head">
          <h2 id="example-title">Try it</h2>
          <p>{c.instruction}</p>
        </div>
        <div className="demo-body">
          <Example />
        </div>
      </section>

      <div className="lesson-grid">
        <section aria-labelledby="anatomy-title">
          <h2 id="anatomy-title">Anatomy</h2>
          <dl className="anatomy">
            {c.anatomy.map(([part, desc]) => (
              <div key={part}>
                <dt>{part}</dt>
                <dd>{desc}</dd>
              </div>
            ))}
          </dl>
        </section>
        <section className="dodont" aria-label="When to use it">
          <div className="do">
            <h3><span aria-hidden="true">✓</span> Use it when</h3>
            <ul>{c.useWhen.map((d) => <li key={d}>{d}</li>)}</ul>
          </div>
          <div className="dont">
            <h3><span aria-hidden="true">✕</span> Don’t use it when</h3>
            <ul>{c.avoidWhen.map((d) => <li key={d}>{d}</li>)}</ul>
          </div>
        </section>
      </div>

      <div className="spec-grid">
        <section aria-labelledby="kbd-title">
          <h2 id="kbd-title">Keyboard</h2>
          <table className="spec-table">
            <thead><tr><th scope="col">Key</th><th scope="col">What it does</th></tr></thead>
            <tbody>
              {c.keyboard.map(([k, v]) => (
                <tr key={k}><th scope="row"><kbd>{k}</kbd></th><td>{v}</td></tr>
              ))}
            </tbody>
          </table>
        </section>
        <section aria-labelledby="aria-title">
          <h2 id="aria-title">Screen reader and ARIA</h2>
          <table className="spec-table">
            <thead><tr><th scope="col">Markup</th><th scope="col">Why</th></tr></thead>
            <tbody>
              {c.aria.map(([k, v]) => (
                <tr key={k}><th scope="row"><code>{k}</code></th><td>{v}</td></tr>
              ))}
            </tbody>
          </table>
        </section>
      </div>

      <div className="lesson-grid">
        <section className="dodont" aria-label="Do and avoid">
          <div className="do">
            <h3><span aria-hidden="true">✓</span> Do</h3>
            <ul>{c.dos.map((d) => <li key={d}>{d}</li>)}</ul>
          </div>
          <div className="dont">
            <h3><span aria-hidden="true">✕</span> Avoid</h3>
            <ul>{c.donts.map((d) => <li key={d}>{d}</li>)}</ul>
          </div>
        </section>
        <section aria-labelledby="mistakes-title">
          <h2 id="mistakes-title">Common mistakes</h2>
          <ul className="mistakes">{c.mistakes.map((m) => <li key={m}>{m}</li>)}</ul>
        </section>
      </div>

      <section className="code-section" aria-labelledby="code-title">
        <h2 id="code-title">The markup</h2>
        <p className="muted">The essential HTML and ARIA, without styling. Copy it as a starting point.</p>
        <CodeBlock code={c.markup} />
      </section>

      <section className="sources" aria-labelledby="sources-title">
        <h2 id="sources-title">Read more</h2>
        <ul>
          {c.sources.map((s) => (
            <li key={s.url}><a href={s.url} target="_blank" rel="noreferrer">{s.label}</a></li>
          ))}
        </ul>
      </section>

      <nav className="pager" aria-label="Component navigation">
        {prev ? (
          <a href={componentHref(prev.slug)} className="pager-link"><small>Previous</small><span>{prev.name}</span></a>
        ) : <span />}
        {next ? (
          <a href={componentHref(next.slug)} className="pager-link pager-next"><small>Next</small><span>{next.name}</span></a>
        ) : (
          <a href="#/components" className="pager-link pager-next"><small>That’s all of them</small><span>Back to all components</span></a>
        )}
      </nav>
    </article>
  )
}
