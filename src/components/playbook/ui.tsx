import { useState, type ReactNode } from 'react'
import { Info } from 'lucide-react'

export function Tooltip({ text }: { text: string }) {
  const [open, setOpen] = useState(false)
  return (
    <span className="relative inline-flex align-middle ml-1.5">
      <button
        type="button"
        aria-label="Mais informações"
        onClick={() => setOpen((v) => !v)}
        onMouseEnter={() => setOpen(true)}
        onMouseLeave={() => setOpen(false)}
        className="inline-flex h-4.5 w-4.5 items-center justify-center rounded-full bg-slate-200 text-slate-600 hover:bg-teal-100 hover:text-teal-700 transition-colors"
      >
        <Info size={11} strokeWidth={2.5} />
      </button>
      {open && (
        <span className="absolute left-1/2 top-6 z-20 -translate-x-1/2 w-60 rounded-lg bg-slate-900 px-3 py-2 text-xs leading-snug text-slate-100 shadow-xl">
          {text}
          <span className="absolute -top-1 left-1/2 h-2 w-2 -translate-x-1/2 rotate-45 bg-slate-900" />
        </span>
      )}
    </span>
  )
}

export function SectionLabel({ children }: { children: ReactNode }) {
  return (
    <p className="text-xs font-semibold uppercase tracking-[0.14em] text-teal-700">
      {children}
    </p>
  )
}

export function QuestionHeading({
  children,
  tooltip,
}: {
  children: ReactNode
  tooltip?: string
}) {
  return (
    <h2 className="mt-2 text-2xl sm:text-[1.75rem] font-semibold text-slate-900 leading-snug">
      {children}
      {tooltip && <Tooltip text={tooltip} />}
    </h2>
  )
}

export function OptionCard({
  label,
  description,
  selected,
  onClick,
}: {
  label: string
  description?: string
  selected: boolean
  onClick: () => void
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={selected}
      className={`group relative w-full rounded-xl border px-4 py-3.5 text-left transition-all duration-150 ${
        selected
          ? 'border-teal-600 bg-teal-50/80 shadow-[0_0_0_1px_rgba(13,148,136,0.35)]'
          : 'border-slate-200 bg-white hover:border-teal-300 hover:bg-teal-50/30'
      }`}
    >
      <span
        className={`text-[0.95rem] font-medium leading-snug ${
          selected ? 'text-teal-900' : 'text-slate-800'
        }`}
      >
        {label}
      </span>
      {description && (
        <span className="mt-1 block text-[0.8rem] leading-snug text-slate-500">
          {description}
        </span>
      )}
      <span
        className={`absolute right-3.5 top-3.5 h-5 w-5 rounded-full border-2 transition-colors ${
          selected
            ? 'border-teal-600 bg-teal-600'
            : 'border-slate-300 bg-transparent group-hover:border-teal-400'
        }`}
      >
        {selected && (
          <svg viewBox="0 0 20 20" fill="none" className="h-full w-full p-[3px]">
            <path
              d="M4 10l4 4 8-8"
              stroke="white"
              strokeWidth={2.4}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        )}
      </span>
    </button>
  )
}

export function BigChoiceCard({
  letter,
  title,
  description,
  selected,
  onClick,
}: {
  letter: string
  title: string
  description: string
  selected: boolean
  onClick: () => void
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={selected}
      className={`flex w-full flex-col gap-2 rounded-2xl border-2 p-5 text-left transition-all duration-150 ${
        selected
          ? 'border-teal-600 bg-teal-50/70 shadow-md'
          : 'border-slate-200 bg-white hover:border-teal-300 hover:shadow-sm'
      }`}
    >
      <span
        className={`flex h-8 w-8 items-center justify-center rounded-full text-sm font-bold ${
          selected ? 'bg-teal-600 text-white' : 'bg-slate-100 text-slate-500'
        }`}
      >
        {letter}
      </span>
      <span className="text-lg font-semibold text-slate-900">{title}</span>
      <span className="text-sm leading-snug text-slate-500">{description}</span>
    </button>
  )
}

export function AlertBox({
  tone = 'warning',
  children,
}: {
  tone?: 'warning' | 'info' | 'success'
  children: ReactNode
}) {
  const styles = {
    warning: 'border-amber-300 bg-amber-50 text-amber-900',
    info: 'border-sky-300 bg-sky-50 text-sky-900',
    success: 'border-teal-300 bg-teal-50 text-teal-900',
  }[tone]
  return (
    <div className={`rounded-xl border px-4 py-3 text-sm leading-snug ${styles}`}>
      {children}
    </div>
  )
}

export function TextInput(props: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      {...props}
      className={`w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-800 placeholder:text-slate-400 outline-none transition-colors focus:border-teal-500 focus:ring-2 focus:ring-teal-100 ${props.className ?? ''}`}
    />
  )
}

export function TextArea(props: React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <textarea
      {...props}
      className={`w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-800 placeholder:text-slate-400 outline-none transition-colors focus:border-teal-500 focus:ring-2 focus:ring-teal-100 ${props.className ?? ''}`}
    />
  )
}

export function PrimaryButton({
  children,
  onClick,
  disabled,
  type = 'button',
}: {
  children: ReactNode
  onClick?: () => void
  disabled?: boolean
  type?: 'button' | 'submit'
}) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className="inline-flex items-center justify-center gap-2 rounded-full bg-teal-700 px-6 py-3 text-sm font-semibold text-white shadow-sm transition-all hover:bg-teal-800 hover:shadow-md disabled:cursor-not-allowed disabled:bg-slate-300 disabled:shadow-none"
    >
      {children}
    </button>
  )
}

export function GhostButton({
  children,
  onClick,
  disabled,
}: {
  children: ReactNode
  onClick?: () => void
  disabled?: boolean
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className="inline-flex items-center justify-center gap-2 rounded-full border border-slate-200 bg-white px-5 py-3 text-sm font-medium text-slate-600 transition-colors hover:border-slate-300 hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40"
    >
      {children}
    </button>
  )
}
