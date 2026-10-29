import { useEffect, useState } from 'react'

// Tiny hash router: works on any static host (Netlify, GitHub Pages) with no server config.
const read = () => window.location.hash.replace(/^#/, '') || '/'

export function useHashRoute() {
  const [route, setRoute] = useState(read)
  useEffect(() => {
    const onChange = () => setRoute(read())
    window.addEventListener('hashchange', onChange)
    return () => window.removeEventListener('hashchange', onChange)
  }, [])
  return route
}

export const lessonHref = (slug) => `#/lesson/${slug}`
