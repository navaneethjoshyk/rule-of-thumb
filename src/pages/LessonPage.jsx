import Quiz from '../components/Quiz'
import { categories, lessons } from '../data/lessons'
import { lessonHref } from '../lib/router'

export default function LessonPage({ lesson, progress }) {
  const index = lessons.indexOf(lesson)
  const prev = lessons[index - 1]
  const next = lessons[index + 1]
  const category = categories.find((c) => c.id === lesson.category)
  const learned = progress.has(lesson.slug)
  const { Demo } = lesson

  return (
    <article className="lesson wrap">
      <nav className="crumbs" aria-label="Breadcrumb">
        <a href="#/">All lessons</a>
        <span aria-hidden="true">/</span>
        <span>{category.name}</span>
        <span className="crumbs-count">Lesson {index + 1} of {lessons.length}</span>
      </nav>

      <header className="lesson-head">
        <h1>{lesson.title}</h1>
        <p className="lesson-summary"><mark>{lesson.summary}</mark></p>
      </header>

      <section className="demo" aria-labelledby="demo-title">
        <div className="demo-head">
          <h2 id="demo-title">Try it</h2>
          <p>{lesson.instruction}</p>
        </div>
        <div className="demo-body">
          <Demo />
        </div>
      </section>

      <div className="lesson-grid">
        <section className="prose" aria-labelledby="why-title">
          <h2 id="why-title">Why it matters</h2>
          {lesson.why.map((p, i) => <p key={i}>{p}</p>)}
        </section>

        <section className="dodont" aria-label="Do and avoid">
          <div className="do">
            <h3><span aria-hidden="true">✓</span> Do</h3>
            <ul>{lesson.dos.map((d) => <li key={d}>{d}</li>)}</ul>
          </div>
          <div className="dont">
            <h3><span aria-hidden="true">✕</span> Avoid</h3>
            <ul>{lesson.donts.map((d) => <li key={d}>{d}</li>)}</ul>
          </div>
        </section>
      </div>

      <section className="check" aria-labelledby="check-title">
        <h2 id="check-title">Quick check</h2>
        <Quiz key={lesson.slug} quiz={lesson.quiz} onCorrect={() => progress.mark(lesson.slug)} />
        <div className="learned-row">
          <button
            className={`btn ${learned ? 'btn-learned' : 'btn-ghost'}`}
            aria-pressed={learned}
            onClick={() => progress.mark(lesson.slug, !learned)}
          >
            {learned ? '✓ Learned' : 'Mark as learned'}
          </button>
          <span className="muted small">A correct answer marks it for you. Progress is saved in this browser.</span>
        </div>
      </section>

      <section className="sources" aria-labelledby="sources-title">
        <h2 id="sources-title">Read more</h2>
        <ul>
          {lesson.sources.map((s) => (
            <li key={s.url}><a href={s.url} target="_blank" rel="noreferrer">{s.label}</a></li>
          ))}
        </ul>
      </section>

      <nav className="pager" aria-label="Lesson navigation">
        {prev ? (
          <a href={lessonHref(prev.slug)} className="pager-link">
            <small>Previous</small><span>{prev.title}</span>
          </a>
        ) : <span />}
        {next ? (
          <a href={lessonHref(next.slug)} className="pager-link pager-next">
            <small>Next</small><span>{next.title}</span>
          </a>
        ) : (
          <a href="#/" className="pager-link pager-next"><small>That’s all of them</small><span>Back to all lessons</span></a>
        )}
      </nav>
    </article>
  )
}
