import { useEffect, useRef } from 'react'
import { Footer, Header } from './components/Layout'
import { lessonBySlug } from './data/lessons'
import { useProgress } from './lib/progress'
import { useHashRoute } from './lib/router'
import Home from './pages/Home'
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

  const match = route.match(/^\/lesson\/([\w-]+)/)
  const lesson = match && lessonBySlug[match[1]]

  useEffect(() => {
    document.title = lesson ? `${lesson.title} · Rule of Thumb` : 'Rule of Thumb: learn UI/UX rules by trying them'
  }, [lesson])

  let page
  if (route === '/') page = <Home progress={progress} />
  else if (lesson) page = <LessonPage lesson={lesson} progress={progress} />
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
      <Header learned={progress.learned} />
      <main id="main" ref={main} tabIndex={-1}>{page}</main>
      <Footer />
    </>
  )
}
