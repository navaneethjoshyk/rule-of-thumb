import { useEffect, useRef } from 'react'
import { Footer, Header } from './components/Layout'
import { componentBySlug } from './data/components'
import { lessonBySlug } from './data/lessons'
import { useProgress } from './lib/progress'
import { useHashRoute } from './lib/router'
import Home from './pages/Home'
import ComponentPage from './pages/ComponentPage'
import ComponentsIndex from './pages/ComponentsIndex'
import LessonPage from './pages/LessonPage'

export default function App() {
  const route = useHashRoute()
  const progress = useProgress()
  const main = useRef(null)
  const first = useRef(true)

  // On navigation: scroll to top and move focus to the new page, so screen readers hear it.
  useEffect(() => {
    if (first.current) { first.current = false; return }
    window.scrollTo(0, 0)
    main.current?.focus({ preventScroll: true })
  }, [route])

  const path = route.split('?')[0]
  const match = path.match(/^\/lesson\/([\w-]+)$/)
  const lesson = match && lessonBySlug[match[1]]
  const cMatch = path.match(/^\/components\/([\w-]+)$/)
  const component = cMatch && componentBySlug[cMatch[1]]
  const section = path.startsWith('/components') ? 'components' : 'lessons'

  useEffect(() => {
    document.title = lesson ? `${lesson.title} · Rule of Thumb`
      : component ? `${component.name} · Components · Rule of Thumb`
      : path === '/components' ? 'Components · Rule of Thumb'
      : 'Rule of Thumb: learn UI/UX rules by trying them'
  }, [lesson, component, path])

  let page
  if (path === '/') page = <Home progress={progress} />
  else if (lesson) page = <LessonPage lesson={lesson} progress={progress} />
  else if (path === '/components') page = <ComponentsIndex />
  else if (component) page = <ComponentPage key={component.slug} component={component} />
  else page = (
    <section className="wrap notfound">
      <h1>That page doesn’t exist.</h1>
      <p>The link may be out of date. <a href="#/">Go to all lessons</a>.</p>
    </section>
  )

  return (
    <>
      <a
        className="skip"
        href="#main"
        onClick={(e) => { e.preventDefault(); main.current?.focus() }}
      >
        Skip to content
      </a>
      <Header learned={progress.learned} section={section} />
      <main id="main" ref={main} tabIndex={-1}>{page}</main>
      <Footer />
    </>
  )
}
