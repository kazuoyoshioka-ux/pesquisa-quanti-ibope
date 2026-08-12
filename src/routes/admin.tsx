import { createFileRoute, Link } from '@tanstack/react-router'
import { Settings, ArrowLeft, HelpCircle, ListTree, AlertTriangle, FileText } from 'lucide-react'

export const Route = createFileRoute('/admin')({
  component: AdminPlaceholder,
})

const AREAS = [
  { icon: <HelpCircle size={18} />, title: 'Perguntas', desc: 'Editar o texto e a ordem das perguntas de cada etapa.' },
  { icon: <ListTree size={18} />, title: 'Opções', desc: 'Adicionar, remover ou reordenar opções de resposta.' },
  { icon: <ListTree size={18} />, title: 'Regras de decisão', desc: 'Configurar a lógica condicional da árvore de decisão.' },
  { icon: <FileText size={18} />, title: 'Metodologias', desc: 'Gerenciar metodologias recomendadas por cenário.' },
  { icon: <AlertTriangle size={18} />, title: 'Alertas', desc: 'Editar mensagens de alerta metodológico.' },
  { icon: <FileText size={18} />, title: 'Templates de briefing', desc: 'Personalizar o formato do briefing gerado.' },
]

function AdminPlaceholder() {
  return (
    <div className="min-h-screen bg-[#f7f8f6] px-4 py-14">
      <div className="mx-auto max-w-3xl">
        <Link
          to="/"
          className="inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-slate-700"
        >
          <ArrowLeft size={14} /> Voltar ao playbook
        </Link>

        <div className="mt-6 flex items-center gap-3">
          <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-800 text-white">
            <Settings size={22} />
          </span>
          <div>
            <h1 className="text-2xl font-bold text-slate-900">Administração do Playbook</h1>
            <p className="text-sm text-slate-500">
              Área reservada para configuração futura do conteúdo e das regras.
            </p>
          </div>
        </div>

        <div className="mt-3 inline-flex rounded-full bg-slate-200 px-3 py-1 text-xs font-medium text-slate-600">
          Em desenvolvimento — sem login e sem persistência ainda
        </div>

        <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
          {AREAS.map((area) => (
            <div
              key={area.title}
              className="rounded-2xl border border-dashed border-slate-300 bg-white/60 p-5 opacity-80"
            >
              <div className="flex items-center gap-2.5 text-slate-500">
                {area.icon}
                <h3 className="font-semibold text-slate-700">{area.title}</h3>
              </div>
              <p className="mt-2 text-sm text-slate-500">{area.desc}</p>
            </div>
          ))}
        </div>

        <p className="mt-8 max-w-xl text-sm leading-relaxed text-slate-500">
          Quando esta área for construída, cada bloco acima passará a editar as
          fontes de configuração em <code className="rounded bg-slate-100 px-1 py-0.5">src/playbook/config.ts</code>,
          persistidas em um banco de dados, com controle de acesso via login de
          usuários e integração futura com geração automática de propostas e
          orçamentos.
        </p>
      </div>
    </div>
  )
}
