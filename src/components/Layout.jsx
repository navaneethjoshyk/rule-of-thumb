import { lessons } from '../data/lessons'

export function Logo() {
  return (
    <svg className="logo-mark" viewBox="0 0 32 32" aria-hidden="true">
      <rect width="32" height="32" rx="8" fill="var(--accent)" />
      <g fill="none" stroke="var(--marker)" strokeWidth="2.2" strokeLinecap="round">
        <path d="M10 22c0-5 2.7-9 6-9s6 4 6 9" />
        <path d="M13.5 22c0-3 1.1-5.2 2.5-5.2s2.5 2.2 2.5 5.2" />
        <path d="M7 19c.8-6.5 4.5-11 9-11s8.2 4.5 9 11" />
      </g>
    </svg>
  )
}

export function Header({ learned }) {
  const count = lessons.filter((l) => learned.has(l.slug)).length
  return (
    <header className="site-header">
      <div className="wrap header-inner">
        <a className="brand" href="#/">
          <Logo />
          <span>Rule of Thumb</span>
        </a>
        <div className="progress-pill" aria-label={`${count} of ${lessons.length} lessons learned`}>
          <span className="progress-track" aria-hidden="true">
            <span style={{ width: `${(count / lessons.length) * 100}%` }} />
          </span>
          <span aria-hidden="true">{count} of {lessons.length} learned</span>
        </div>
      </div>
    </header>
  )
}

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="wrap footer-inner">
        <p>
          Body text on this site is set in Atkinson Hyperlegible, a typeface the Braille Institute designed so that
          similar letters like I, l and 1 are easy to tell apart.
        </p>
        <p>Built by Navaneeth Joshy K. Rules are summarised from the sources listed on each lesson.</p>
      </div>
    </footer>
  )
}
