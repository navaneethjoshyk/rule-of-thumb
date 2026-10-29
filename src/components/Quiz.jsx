import { useState } from 'react'

export default function Quiz({ quiz, onCorrect }) {
  const [choice, setChoice] = useState(null)
  const [checked, setChecked] = useState(false)
  const correct = checked && choice === quiz.answer

  function submit(e) {
    e.preventDefault()
    if (choice === null) return
    setChecked(true)
    if (choice === quiz.answer) onCorrect?.()
  }

  return (
    <form className="quiz" onSubmit={submit}>
      <fieldset>
        <legend>{quiz.q}</legend>
        {quiz.options.map((opt, i) => {
          const state = checked ? (i === quiz.answer ? 'is-right' : i === choice ? 'is-wrong' : '') : ''
          return (
            <label key={i} className={`quiz-option ${state}`}>
              <input
                type="radio"
                name="quiz"
                checked={choice === i}
                onChange={() => { setChoice(i); setChecked(false) }}
              />
              <span>{opt}</span>
            </label>
          )
        })}
      </fieldset>
      <button className="btn btn-primary" disabled={choice === null}>Check answer</button>
      <div aria-live="polite">
        {checked && (
          <p className={`quiz-feedback ${correct ? 'is-right' : 'is-wrong'}`}>
            <strong>{correct ? '✓ Correct.' : '✕ Not quite.'}</strong> {quiz.explain}
          </p>
        )}
      </div>
    </form>
  )
}
