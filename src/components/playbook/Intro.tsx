import { Compass, Clock, ArrowRight } from 'lucide-react'
import { PrimaryButton } from './ui'

export function Intro({ onStart }: { onStart: () => void }) {
  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#f7f8f6] px-4 py-16">
      <div
        aria-hidden
        className="pointer-events-none absolute -top-40 -right-40 h-[32rem] w-[32rem] rounded-full bg-teal-100/70 blur-3xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-52 -left-40 h-[32rem] w-[32rem] rounded-full bg-amber-50 blur-3xl"
      />
      <div className="relative w-full max-w-2xl text-center">
        <div className="mx-auto mb-7 flex h-14 w-14 items-center justify-center rounded-2xl bg-teal-700 text-white shadow-lg shadow-teal-700/20">
          <Compass size={26} strokeWidth={2} />
        </div>
        <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-teal-700">
          Playbook Interativo · Pesquisa Quanti Adhoc
        </p>
        <h1 className="text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl">
          Vamos estruturar sua pesquisa
        </h1>
        <p className="mx-auto mt-5 max-w-xl text-lg leading-relaxed text-slate-600">
          Responda algumas perguntas para entender qual tipo de pesquisa faz
          mais sentido para o seu projeto.
        </p>

        <div className="mt-10 flex flex-col items-center gap-4">
          <PrimaryButton onClick={onStart}>
            Começar diagnóstico
            <ArrowRight size={16} />
          </PrimaryButton>
          <span className="inline-flex items-center gap-1.5 text-sm text-slate-500">
            <Clock size={14} />
            Tempo estimado: 3–5 minutos
          </span>
        </div>

        <div className="mx-auto mt-14 grid max-w-lg grid-cols-3 gap-4 text-left">
          {[
            { n: '01', t: 'Entenda a necessidade' },
            { n: '02', t: 'Estruture o objetivo' },
            { n: '03', t: 'Receba o diagnóstico' },
          ].map((item) => (
            <div
              key={item.n}
              className="rounded-xl border border-slate-200 bg-white/70 p-4 backdrop-blur-sm"
            >
              <span className="text-xs font-bold text-teal-600">{item.n}</span>
              <p className="mt-1 text-sm font-medium text-slate-700">{item.t}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
