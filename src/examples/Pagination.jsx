import { useState } from 'react'

const TOTAL_RESULTS = 97
const PER_PAGE = 10
const PAGES = Math.ceil(TOTAL_RESULTS / PER_PAGE)

// Always show first, last, current and its neighbours; collapse the rest into an ellipsis.
function pageList(current, total) {
  const keep = new Set([1, total, current - 1, current, current + 1])
  const out = []
  for (let p = 1; p <= total; p++) {
    if (keep.has(p)) out.push(p)
    else if (out.at(-1) !== '…') out.push('…')
  }
  return out
}

export default function PaginationExample() {
  const [page, setPage] = useState(1)
  const go = (p) => (e) => { e.preventDefault(); setPage(p) }
  const from = (page - 1) * PER_PAGE + 1
  const to = Math.min(page * PER_PAGE, TOTAL_RESULTS)

  return (
    <div className="cx-stack">
      <p className="cx-status" role="status">Showing results {from}–{to} of {TOTAL_RESULTS}</p>
      <nav aria-label="Search results pages" className="cx-pagination">
        <ul>
          <li>
            {page > 1 ? (
              <a href={`#/components/pagination?page=${page - 1}`} onClick={go(page - 1)} className="cx-page cx-page-step" rel="prev">
                <span aria-hidden="true">‹</span> Previous<span className="sr-only"> page</span>
              </a>
            ) : (
              <span className="cx-page cx-page-step is-disabled" aria-hidden="true">‹ Previous</span>
            )}
          </li>
          {pageList(page, PAGES).map((p, i) =>
            p === '…' ? (
              <li key={`gap-${i}`} className="cx-page-gap" aria-hidden="true">…</li>
            ) : (
              <li key={p}>
                <a
                  href={`#/components/pagination?page=${p}`}
                  onClick={go(p)}
                  className={`cx-page ${p === page ? 'is-current' : ''}`}
                  aria-current={p === page ? 'page' : undefined}
                >
                  <span className="sr-only">Page </span>{p}
                </a>
              </li>
            )
          )}
          <li>
            {page < PAGES ? (
              <a href={`#/components/pagination?page=${page + 1}`} onClick={go(page + 1)} className="cx-page cx-page-step" rel="next">
                Next<span className="sr-only"> page</span> <span aria-hidden="true">›</span>
              </a>
            ) : (
              <span className="cx-page cx-page-step is-disabled" aria-hidden="true">Next ›</span>
            )}
          </li>
        </ul>
      </nav>
    </div>
  )
}
