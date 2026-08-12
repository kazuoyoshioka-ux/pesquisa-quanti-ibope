import { useMemo, useState } from 'react'
import {
  AlertTriangle,
  ClipboardCheck,
  Copy,
  FileText,
  Lightbulb,
  RefreshCcw,
  Target,
  Users,
  Layers,
  MapPin,
  ListChecks,
  Package,
  CalendarClock,
  Check,
} from 'lucide-react'
import type { Answers } from '../../playbook/types'
import { buildBriefingText, buildDiagnosis } from '../../playbook/diagnosis'
import { PrimaryButton, GhostButton, TextInput } from './ui'

function Card({
  icon,
  title,
  children,
}: {
  icon: React.ReactNode
  title: string
  children: React.ReactNode
}) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5">
      <div className="flex items-center gap-2.5">
        <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-teal-50 text-teal-700">
          {icon}
        </span>
        <h3 className="text-sm font-semibold uppercase tracking-wide text-slate-500">
          {title}
        </h3>
      </div>
      <p className="mt-3 text-[0.95rem] leading-relaxed text-slate-800">{children}</p>
    </div>
  )
}

export function Diagnosis({
  answers,
  updateAnswers,
  onRestart,
  onEdit,
}: {
  answers: Answers
  updateAnswers: (patch: Partial<Answers>) => void
  onRestart: () => void
  onEdit: () => void
}) {
  const [briefingOpen, setBriefingOpen] = useState(false)
  const [copied, setCopied] = useState(false)
  const diagnosis = useMemo(() => buildDiagnosis(answers), [answers])
  const briefingText = useMemo(
    () => buildBriefingText(answers, diagnosis),
    [answers, diagnosis],
  )

  const copyBriefing = async () => {
    try {
      await navigator.clipboard.writeText(briefingText)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      setCopied(false)
    }
  }

  return (
    <div className="min-h-screen bg-[#f7f8f6] px-4 py-14">
      <div className="mx-auto max-w-4xl">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-teal-700">
          Playbook Interativo · Diagnóstico
        </p>
        <h1 className="mt-2 text-3xl font-bold text-slate-900 sm:text-4xl">
          Diagnóstico preliminar do projeto
        </h1>
        <p className="mt-3 max-w-2xl text-slate-600">
          Este resumo organiza o que foi levantado com o comercial. A área de
          pesquisa deve validar a metodologia final antes do início do campo.
        </p>

        <div className="mt-4 flex max-w-md items-center gap-2">
          <TextInput
            placeholder="Nome do cliente (opcional, para o briefing)"
            value={answers.cliente}
            onChange={(e) => updateAnswers({ cliente: e.target.value })}
          />
        </div>

        <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
          <Card icon={<Target size={16} />} title="1 · Necessidade de negócio">
            {answers.decisaoNegocio || 'Não informado'}
          </Card>
          <Card icon={<ListChecks size={16} />} title="2 · Objetivo da pesquisa">
            {diagnosis.objetivoPesquisa}
          </Card>
          <Card icon={<Users size={16} />} title="3 · Público-alvo">
            {diagnosis.publicoAlvo}
          </Card>
          <Card icon={<FileText size={16} />} title="4 · Metodologia sugerida">
            {diagnosis.metodologiaSugerida}
          </Card>
          <Card icon={<MapPin size={16} />} title="5 · Abrangência">
            {diagnosis.abrangencia}
          </Card>
          <Card icon={<Layers size={16} />} title="6 · Segmentações">
            {diagnosis.segmentacoes}
          </Card>
          <Card icon={<ClipboardCheck size={16} />} title="7 · Questionário">
            {diagnosis.questionarioResumo}
          </Card>
          <Card icon={<Package size={16} />} title="8 · Entregáveis">
            {diagnosis.entregaveis}
          </Card>
          <Card icon={<CalendarClock size={16} />} title="9 · Prazo">
            {diagnosis.prazo}
          </Card>
        </div>

        <div className="mt-6 rounded-2xl border border-amber-200 bg-amber-50 p-5">
          <div className="flex items-center gap-2 text-amber-900">
            <AlertTriangle size={18} />
            <h3 className="font-semibold">Pontos que precisam de validação</h3>
          </div>
          {diagnosis.pontosAbertos.length ? (
            <ul className="mt-3 space-y-1.5 text-sm text-amber-900">
              {diagnosis.pontosAbertos.map((p, i) => (
                <li key={i} className="flex gap-2">
                  <span className="mt-0.5">•</span>
                  <span>{p}</span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="mt-3 text-sm text-amber-900">
              Nenhum ponto crítico pendente — ainda assim, valide os detalhes com o time de pesquisa.
            </p>
          )}
          {diagnosis.alertasMetodologicos.length > 0 && (
            <div className="mt-4 border-t border-amber-200 pt-3">
              <p className="text-xs font-semibold uppercase tracking-wide text-amber-800">
                Alertas metodológicos
              </p>
              <ul className="mt-2 space-y-1.5 text-sm text-amber-900">
                {diagnosis.alertasMetodologicos.map((p, i) => (
                  <li key={i} className="flex gap-2">
                    <span className="mt-0.5">•</span>
                    <span>{p}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        <div className="mt-6 rounded-2xl border border-teal-200 bg-teal-50 p-5">
          <div className="flex items-center gap-2 text-teal-900">
            <Lightbulb size={18} />
            <h3 className="font-semibold">Recomendação preliminar</h3>
          </div>
          <p className="mt-2.5 text-sm leading-relaxed text-teal-900">
            {diagnosis.recomendacaoPreliminar}
          </p>
          <p className="mt-3 text-xs text-teal-800/80">
            Nenhum tamanho de amostra definitivo é apresentado automaticamente.
            {answers.amostraPreliminar
              ? ` Amostra preliminar informada pelo usuário: "${answers.amostraPreliminar}" — sujeita à validação metodológica.`
              : ''}
          </p>
        </div>

        <div className="mt-9 flex flex-col flex-wrap items-stretch gap-3 sm:flex-row sm:items-center">
          <PrimaryButton onClick={() => setBriefingOpen(true)}>
            <FileText size={16} /> Gerar briefing para o time de Pesquisa
          </PrimaryButton>
          <GhostButton onClick={onEdit}>Revisar respostas</GhostButton>
          <GhostButton onClick={onRestart}>
            <RefreshCcw size={15} /> Começar novo projeto
          </GhostButton>
        </div>
      </div>

      {briefingOpen && (
        <div
          className="fixed inset-0 z-30 flex items-center justify-center bg-slate-900/50 p-4"
          onClick={() => setBriefingOpen(false)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="max-h-[85vh] w-full max-w-2xl overflow-y-auto rounded-2xl bg-white p-6 shadow-2xl"
          >
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-slate-900">
                Briefing para o time de Pesquisa
              </h2>
              <button
                onClick={() => setBriefingOpen(false)}
                className="text-sm text-slate-400 hover:text-slate-600"
              >
                Fechar
              </button>
            </div>
            <pre className="mt-4 whitespace-pre-wrap rounded-xl bg-slate-50 p-4 text-sm leading-relaxed text-slate-700">
              {briefingText}
            </pre>
            <div className="mt-5 flex justify-end gap-3">
              <GhostButton onClick={() => setBriefingOpen(false)}>Fechar</GhostButton>
              <PrimaryButton onClick={copyBriefing}>
                {copied ? <Check size={15} /> : <Copy size={15} />}
                {copied ? 'Copiado!' : 'Copiar briefing'}
              </PrimaryButton>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
