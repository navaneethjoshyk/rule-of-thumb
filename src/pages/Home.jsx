import FixIt from '../components/FixIt'
import { components } from '../data/components'
import { categories, lessons } from '../data/lessons'
import { componentHref, lessonHref } from '../lib/router'

export default function Home({ progress }) {
  const scrollToLessons = () =>
    document.getElementById('lessons')?.scrollIntoView({ behavior: 'smooth', block: 'start' })

  const nextUp = lessons.find((l) => !progress.has(l.slug)) ?? lessons[0]

  return (
    <>
      <section className="hero wrap">
        <div className="hero-copy">
          <h1>Learn the rules of good interfaces by watching them get fixed.</h1>
          <p className="lede">
            Sixteen short lessons on the laws of UX, accessibility and visual design. Every rule comes with a demo you
            can play with, a quick check, and the research behind it.
          </p>
          <div className="row">
            <a className="btn btn-primary btn-large" href={lessonHref(nextUp.slug)}>
              {progress.learned.size ? `Continue with ${nextUp.title}` : `Start with ${nextUp.title}`}
            </a>
            <button className="btn btn-ghost btn-large" onClick={scrollToLessons}>See all lessons</button>
          </div>
        </div>
        <FixIt />
      </section>

      <section id="lessons" className="index wrap" aria-labelledby="index-title">
        <h2 id="index-title">All lessons</h2>
        {categories.map((cat) => {
          const items = lessons.filter((l) => l.category === cat.id)
          const done = items.filter((l) => progress.has(l.slug)).length
          return (
            <div className="index-group" key={cat.id}>
              <div className="index-head">
                <h3>{cat.name}</h3>
                <p>{cat.blurb}</p>
                <p className="index-count">{done} of {items.length} learned</p>
              </div>
              <ul className="index-list">
                {items.map((l) => {
                  const learned = progress.has(l.slug)
                  return (
                    <li key={l.slug}>
                      <a href={lessonHref(l.slug)} className={learned ? 'is-learned' : ''}>
                        <span className="index-title">{l.title}</span>
                        <span className="index-summary">{l.summary}</span>
                        <span className="index-state">
                          {learned ? <><span aria-hidden="true">✓</span> Learned</> : <span className="sr-only">Not learned yet</span>}
                        </span>
                      </a>
                    </li>
                  )
                })}
              </ul>
            </div>
          )
        })}
      </section>

      <section className="wrap home-components" aria-labelledby="home-components-title">
        <div className="home-components-head">
          <h2 id="home-components-title">Components</h2>
          <p>
            Twelve everyday components built the accessible way, each with a working example, keyboard and ARIA
            tables, common mistakes and HTML to copy.
          </p>
          <a className="btn btn-ghost" href="#/components">Browse all components</a>
        </div>
        <ul className="chip-list">
          {components.map((c) => (
            <li key={c.slug}><a className="chip" href={componentHref(c.slug)}>{c.name}</a></li>
          ))}
        </ul>
      </section>
    </>
  )
}
