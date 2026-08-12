import { createFileRoute, Link } from '@tanstack/react-router'
import { Settings } from 'lucide-react'
import { usePlaybookState } from '../playbook/state'
import { TOTAL_STEPS } from '../playbook/config'
import { Intro } from '../components/playbook/Intro'
import { Wizard } from '../components/playbook/Wizard'
import { Diagnosis } from '../components/playbook/Diagnosis'

export const Route = createFileRoute('/')({
  component: PlaybookApp,
})

function PlaybookApp() {
  const { view, setView, step, setStep, answers, updateAnswers, restart } =
    usePlaybookState()

  return (
    <div className="relative">
      <Link
        to="/admin"
        className="fixed bottom-4 right-4 z-20 inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-white/90 px-3 py-2 text-xs font-medium text-slate-500 shadow-sm backdrop-blur-sm transition-colors hover:text-slate-700"
      >
        <Settings size={13} /> Administração do Playbook
      </Link>

      {view === 'intro' && (
        <Intro
          onStart={() => {
            setStep(1)
            setView('wizard')
          }}
        />
      )}

      {view === 'wizard' && (
        <Wizard
          step={step}
          answers={answers}
          updateAnswers={updateAnswers}
          goTo={(n) => setStep(Math.min(n, TOTAL_STEPS))}
          goNext={() => setStep((s) => Math.min(s + 1, TOTAL_STEPS))}
          goBack={() =>
            step === 1 ? setView('intro') : setStep((s) => Math.max(s - 1, 1))
          }
          onFinish={() => setView('diagnosis')}
        />
      )}

      {view === 'diagnosis' && (
        <Diagnosis
          answers={answers}
          updateAnswers={updateAnswers}
          onEdit={() => {
            setStep(1)
            setView('wizard')
          }}
          onRestart={restart}
        />
      )}
    </div>
  )
}
