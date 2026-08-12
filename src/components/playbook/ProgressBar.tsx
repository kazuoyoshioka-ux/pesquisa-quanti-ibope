import { TOTAL_STEPS } from '../../playbook/config'

const STEP_TITLES = [
  'Necessidade',
  'Decisão de negócio',
  'Objetivo',
  'Quantificar ou explorar',
  'Público-alvo',
  'Comportamento',
  'Geografia',
  'Representatividade',
  'Segmentações',
  'Questionário',
  'Prazo',
  'Entregáveis',
]

export function ProgressBar({
  step,
  onStepClick,
}: {
  step: number
  onStepClick: (step: number) => void
}) {
  const pct = (step / TOTAL_STEPS) * 100
  return (
    <div className="mx-auto w-full max-w-3xl px-4 sm:px-6">
      <div className="flex items-baseline justify-between text-xs text-slate-500">
        <span className="font-semibold tracking-wide text-teal-700">
          Etapa {step} de {TOTAL_STEPS}
        </span>
        <span className="hidden sm:inline">{STEP_TITLES[step - 1]}</span>
      </div>
      <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-slate-200">
        <div
          className="h-full rounded-full bg-gradient-to-r from-teal-500 to-teal-700 transition-all duration-300"
          style={{ width: `${pct}%` }}
        />
      </div>
      <div className="mt-2.5 hidden gap-1 sm:flex">
        {STEP_TITLES.map((title, i) => {
          const n = i + 1
          const done = n < step
          const current = n === step
          return (
            <button
              key={title}
              type="button"
              disabled={n > step}
              onClick={() => onStepClick(n)}
              title={title}
              className={`h-1.5 flex-1 rounded-full transition-colors ${
                current
                  ? 'bg-teal-700'
                  : done
                    ? 'bg-teal-300 hover:bg-teal-400'
                    : 'bg-slate-200'
              } ${n <= step ? 'cursor-pointer' : 'cursor-default'}`}
            />
          )
        })}
      </div>
    </div>
  )
}
