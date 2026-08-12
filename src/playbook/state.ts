import { useCallback, useEffect, useState } from 'react'
import { initialAnswers, type Answers, type View } from './types'

const STORAGE_KEY = 'playbook-quanti-adhoc:v1'

interface PersistedState {
  view: View
  step: number
  answers: Answers
}

function loadPersisted(): PersistedState | null {
  if (typeof window === 'undefined') return null
  try {
    const raw = window.sessionStorage.getItem(STORAGE_KEY)
    if (!raw) return null
    const parsed = JSON.parse(raw) as PersistedState
    return {
      view: parsed.view ?? 'intro',
      step: parsed.step ?? 1,
      answers: { ...initialAnswers, ...parsed.answers },
    }
  } catch {
    return null
  }
}

export function usePlaybookState() {
  const persisted = loadPersisted()
  const [view, setView] = useState<View>(persisted?.view ?? 'intro')
  const [step, setStep] = useState<number>(persisted?.step ?? 1)
  const [answers, setAnswers] = useState<Answers>(
    persisted?.answers ?? initialAnswers,
  )

  useEffect(() => {
    try {
      window.sessionStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({ view, step, answers }),
      )
    } catch {
      // sessionStorage unavailable (e.g. private mode restrictions) — safe to ignore
    }
  }, [view, step, answers])

  const updateAnswers = useCallback((patch: Partial<Answers>) => {
    setAnswers((prev) => ({ ...prev, ...patch }))
  }, [])

  const restart = useCallback(() => {
    setAnswers(initialAnswers)
    setStep(1)
    setView('intro')
    try {
      window.sessionStorage.removeItem(STORAGE_KEY)
    } catch {
      // ignore
    }
  }, [])

  return {
    view,
    setView,
    step,
    setStep,
    answers,
    updateAnswers,
    restart,
  }
}
