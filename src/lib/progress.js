import { useCallback, useState } from 'react'

const KEY = 'rule-of-thumb:learned'

function load() {
  try {
    const raw = window.localStorage.getItem(KEY)
    return new Set(raw ? JSON.parse(raw) : [])
  } catch {
    return new Set()
  }
}

function save(set) {
  try {
    window.localStorage.setItem(KEY, JSON.stringify([...set]))
  } catch {
    /* storage unavailable: progress lives for this visit only */
  }
}

export function useProgress() {
  const [learned, setLearned] = useState(load)

  const mark = useCallback((slug, value = true) => {
    setLearned((prev) => {
      const next = new Set(prev)
      value ? next.add(slug) : next.delete(slug)
      save(next)
      return next
    })
  }, [])

  return { learned, mark, has: (slug) => learned.has(slug) }
}
