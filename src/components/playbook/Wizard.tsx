import { useState } from 'react'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import type { Answers } from '../../playbook/types'
import {
  COMPORTAMENTO_OPTIONS,
  COMPORTAMENTOS_QUE_PEDEM_PERIODO,
  CRITERIOS_OPTIONS,
  DATA_CRITICA_EXEMPLOS,
  DECISAO_EXEMPLOS,
  ENTREGAVEIS_OPTIONS,
  GEOGRAFIA_OPTIONS,
  NECESSIDADE_OPTIONS,
  OBJETIVO_OPTIONS,
  PERIODO_OPTIONS,
  PUBLICO_ALVO_OPTIONS,
  QUESTIONARIO_OPTIONS,
  SEGMENTACAO_OPTIONS,
  TIPO_INFORMACAO_OPTIONS,
  TOOLTIPS,
} from '../../playbook/config'
import { ProgressBar } from './ProgressBar'
import {
  AlertBox,
  BigChoiceCard,
  GhostButton,
  OptionCard,
  PrimaryButton,
  QuestionHeading,
  SectionLabel,
  TextArea,
  TextInput,
  Tooltip,
} from './ui'

function toggle(list: string[], id: string) {
  return list.includes(id) ? list.filter((x) => x !== id) : [...list, id]
}

function StepShell({
  eyebrow,
  children,
}: {
  eyebrow: string
  children: React.ReactNode
}) {
  return (
    <div className="mx-auto w-full max-w-2xl">
      <SectionLabel>{eyebrow}</SectionLabel>
      {children}
    </div>
  )
}

function NavRow({
  onBack,
  onNext,
  nextLabel = 'Continuar',
  nextDisabled,
  backDisabled,
}: {
  onBack: () => void
  onNext: () => void
  nextLabel?: string
  nextDisabled?: boolean
  backDisabled?: boolean
}) {
  return (
    <div className="mt-9 flex items-center justify-between">
      <GhostButton onClick={onBack} disabled={backDisabled}>
        <ArrowLeft size={15} /> Voltar
      </GhostButton>
      <PrimaryButton onClick={onNext} disabled={nextDisabled}>
        {nextLabel} <ArrowRight size={15} />
      </PrimaryButton>
    </div>
  )
}

interface WizardProps {
  step: number
  answers: Answers
  updateAnswers: (patch: Partial<Answers>) => void
  goTo: (step: number) => void
  goNext: () => void
  goBack: () => void
  onFinish: () => void
}

export function Wizard({
  step,
  answers,
  updateAnswers,
  goTo,
  goNext,
  goBack,
  onFinish,
}: WizardProps) {
  const [showDecisaoAlert, setShowDecisaoAlert] = useState(false)
  const a = answers

  const precisaPeriodo =
    a.comportamento != null &&
    COMPORTAMENTOS_QUE_PEDEM_PERIODO.includes(a.comportamento)

  return (
    <div className="min-h-screen bg-[#f7f8f6] pb-16 pt-8">
      <ProgressBar step={step} onStepClick={goTo} />
      <div className="mx-auto mt-10 w-full max-w-2xl rounded-3xl border border-slate-200 bg-white px-6 py-9 shadow-sm sm:px-10">
        {step === 1 && (
          <StepShell eyebrow="Etapa 1 · Entender a necessidade">
            <QuestionHeading>O que o cliente precisa descobrir?</QuestionHeading>
            <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
              {NECESSIDADE_OPTIONS.map((opt) => (
                <OptionCard
                  key={opt.id}
                  label={opt.label}
                  selected={a.necessidade === opt.id}
                  onClick={() => updateAnswers({ necessidade: opt.id })}
                />
              ))}
            </div>
            {a.necessidade === 'outros' && (
              <TextInput
                className="mt-4"
                placeholder="Descreva a necessidade"
                value={a.necessidadeOutro}
                onChange={(e) => updateAnswers({ necessidadeOutro: e.target.value })}
              />
            )}
            <NavRow
              backDisabled
              onBack={goBack}
              onNext={goNext}
              nextDisabled={!a.necessidade}
            />
          </StepShell>
        )}

        {step === 2 && (
          <StepShell eyebrow="Etapa 2 · Problema de negócio">
            <QuestionHeading>
              Qual decisão de negócio será tomada a partir dos resultados?
            </QuestionHeading>
            <TextArea
              className="mt-6 min-h-28"
              placeholder="Descreva a decisão que o cliente vai tomar com base na pesquisa..."
              value={a.decisaoNegocio}
              onChange={(e) => {
                updateAnswers({ decisaoNegocio: e.target.value })
                setShowDecisaoAlert(false)
              }}
            />
            <div className="mt-3 flex flex-wrap gap-2">
              {DECISAO_EXEMPLOS.map((ex) => (
                <span
                  key={ex}
                  className="rounded-full bg-slate-100 px-3 py-1 text-xs text-slate-500"
                >
                  {ex}
                </span>
              ))}
            </div>
            {showDecisaoAlert && (
              <div className="mt-4">
                <AlertBox>
                  Precisamos entender qual decisão será tomada para transformar
                  a necessidade do cliente em um objetivo de pesquisa.
                </AlertBox>
              </div>
            )}
            <NavRow
              onBack={goBack}
              onNext={() => {
                if (!a.decisaoNegocio.trim()) {
                  setShowDecisaoAlert(true)
                  return
                }
                goNext()
              }}
            />
          </StepShell>
        )}

        {step === 3 && (
          <StepShell eyebrow="Etapa 3 · Objetivo da pesquisa">
            <QuestionHeading>O que você precisa medir ou entender?</QuestionHeading>
            <p className="mt-1.5 text-sm text-slate-500">Selecione todas as opções aplicáveis.</p>
            <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
              {OBJETIVO_OPTIONS.map((opt) => (
                <OptionCard
                  key={opt.id}
                  label={opt.label}
                  selected={a.objetivos.includes(opt.id)}
                  onClick={() => updateAnswers({ objetivos: toggle(a.objetivos, opt.id) })}
                />
              ))}
            </div>
            {a.objetivos.includes('outro') && (
              <TextInput
                className="mt-4"
                placeholder="Descreva o objetivo"
                value={a.objetivoOutro}
                onChange={(e) => updateAnswers({ objetivoOutro: e.target.value })}
              />
            )}
            <NavRow onBack={goBack} onNext={goNext} nextDisabled={!a.objetivos.length} />
          </StepShell>
        )}

        {step === 4 && (
          <StepShell eyebrow="Etapa 4 · Tipo de informação">
            <QuestionHeading tooltip={TOOLTIPS.quantificar_explorar}>
              Você precisa principalmente quantificar algo ou explorar algo?
            </QuestionHeading>
            <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
              {TIPO_INFORMACAO_OPTIONS.map((opt) => (
                <BigChoiceCard
                  key={opt.id}
                  letter={opt.letter}
                  title={opt.title}
                  description={opt.description}
                  selected={a.tipoInformacao === opt.id}
                  onClick={() => updateAnswers({ tipoInformacao: opt.id })}
                />
              ))}
            </div>
            {a.tipoInformacao === 'explorar' && (
              <div className="mt-5">
                <AlertBox>
                  Esta necessidade pode exigir uma abordagem qualitativa. O
                  time de pesquisa deve avaliar se o quantitativo é adequado.
                </AlertBox>
              </div>
            )}
            {a.tipoInformacao === 'ambos' && (
              <div className="mt-5">
                <AlertBox tone="info">
                  Considere uma abordagem em duas etapas: qualitativa + quantitativa.
                </AlertBox>
              </div>
            )}
            <NavRow onBack={goBack} onNext={goNext} nextDisabled={!a.tipoInformacao} />
          </StepShell>
        )}

        {step === 5 && (
          <StepShell eyebrow="Etapa 5 · Público-alvo">
            <QuestionHeading>Quem precisa participar da pesquisa?</QuestionHeading>
            <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
              {PUBLICO_ALVO_OPTIONS.map((opt) => (
                <OptionCard
                  key={opt.id}
                  label={opt.label}
                  selected={a.publicoAlvo === opt.id}
                  onClick={() => updateAnswers({ publicoAlvo: opt.id })}
                />
              ))}
            </div>
            {a.publicoAlvo === 'outro' && (
              <TextInput
                className="mt-4"
                placeholder="Descreva o público-alvo"
                value={a.publicoAlvoOutro}
                onChange={(e) => updateAnswers({ publicoAlvoOutro: e.target.value })}
              />
            )}

            <div className="mt-9 border-t border-slate-100 pt-7">
              <QuestionHeading tooltip={TOOLTIPS.criterios_qualificacao}>
                Existem critérios obrigatórios para participar?
              </QuestionHeading>
              <p className="mt-1.5 text-sm text-slate-500">Selecione todas as opções aplicáveis.</p>
              <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2">
                {CRITERIOS_OPTIONS.map((opt) => (
                  <OptionCard
                    key={opt.id}
                    label={opt.label}
                    selected={a.criterios.includes(opt.id)}
                    onClick={() => updateAnswers({ criterios: toggle(a.criterios, opt.id) })}
                  />
                ))}
              </div>
              <TextInput
                className="mt-4"
                placeholder="Especifique os critérios (ex: 25 a 45 anos, classes A/B, SP capital...)"
                value={a.criteriosEspecificacao}
                onChange={(e) => updateAnswers({ criteriosEspecificacao: e.target.value })}
              />
            </div>
            <NavRow onBack={goBack} onNext={goNext} nextDisabled={!a.publicoAlvo} />
          </StepShell>
        )}

        {step === 6 && (
          <StepShell eyebrow="Etapa 6 · Comportamento">
            <QuestionHeading>
              O participante precisa ter realizado alguma ação específica para participar?
            </QuestionHeading>
            <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
              {COMPORTAMENTO_OPTIONS.map((opt) => (
                <OptionCard
                  key={opt.id}
                  label={opt.label}
                  selected={a.comportamento === opt.id}
                  onClick={() =>
                    updateAnswers({
                      comportamento: opt.id,
                      ...(COMPORTAMENTOS_QUE_PEDEM_PERIODO.includes(opt.id)
                        ? {}
                        : { periodo: null, periodoOutro: '' }),
                    })
                  }
                />
              ))}
            </div>
            {a.comportamento === 'outro' && (
              <TextInput
                className="mt-4"
                placeholder="Descreva a ação necessária"
                value={a.comportamentoOutro}
                onChange={(e) => updateAnswers({ comportamentoOutro: e.target.value })}
              />
            )}

            {precisaPeriodo && (
              <div className="mt-9 border-t border-slate-100 pt-7">
                <QuestionHeading>Qual período deve ser considerado?</QuestionHeading>
                <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2">
                  {PERIODO_OPTIONS.map((opt) => (
                    <OptionCard
                      key={opt.id}
                      label={opt.label}
                      selected={a.periodo === opt.id}
                      onClick={() => updateAnswers({ periodo: opt.id })}
                    />
                  ))}
                </div>
                {a.periodo === 'outro' && (
                  <TextInput
                    className="mt-4"
                    placeholder="Especifique o período"
                    value={a.periodoOutro}
                    onChange={(e) => updateAnswers({ periodoOutro: e.target.value })}
                  />
                )}
              </div>
            )}
            <NavRow
              onBack={goBack}
              onNext={goNext}
              nextDisabled={!a.comportamento || (precisaPeriodo && !a.periodo)}
            />
          </StepShell>
        )}

        {step === 7 && (
          <StepShell eyebrow="Etapa 7 · Geografia">
            <QuestionHeading>Qual é a abrangência geográfica?</QuestionHeading>
            <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
              {GEOGRAFIA_OPTIONS.map((opt) => (
                <OptionCard
                  key={opt.id}
                  label={opt.label}
                  selected={a.geografia === opt.id}
                  onClick={() => updateAnswers({ geografia: opt.id })}
                />
              ))}
            </div>
            {a.geografia && a.geografia !== 'brasil' && (
              <TextInput
                className="mt-4"
                placeholder="Especifique estados, cidades ou regiões"
                value={a.geografiaDetalhe}
                onChange={(e) => updateAnswers({ geografiaDetalhe: e.target.value })}
              />
            )}
            <NavRow onBack={goBack} onNext={goNext} nextDisabled={!a.geografia} />
          </StepShell>
        )}

        {step === 8 && (
          <StepShell eyebrow="Etapa 8 · Representatividade">
            <QuestionHeading tooltip={TOOLTIPS.representatividade}>
              Os resultados precisam representar uma população específica?
            </QuestionHeading>
            <div className="mt-6 grid grid-cols-1 gap-3">
              <OptionCard
                label="Sim"
                description="Nossos resultados precisam representar o universo estudado."
                selected={a.representatividade === 'sim'}
                onClick={() => updateAnswers({ representatividade: 'sim' })}
              />
              <OptionCard
                label="Não"
                description="Precisamos de uma leitura exploratória/direcional."
                selected={a.representatividade === 'nao'}
                onClick={() => updateAnswers({ representatividade: 'nao' })}
              />
              <OptionCard
                label="Ainda não sei"
                selected={a.representatividade === 'ainda_nao'}
                onClick={() => updateAnswers({ representatividade: 'ainda_nao' })}
              />
            </div>
            {a.representatividade === 'sim' && (
              <div className="mt-5">
                <AlertBox>
                  A definição da amostra deverá considerar universo,
                  distribuição da população, método de recrutamento, margem de
                  erro desejada e necessidade de análises por subgrupos.
                </AlertBox>
              </div>
            )}
            {a.representatividade === 'nao' && (
              <div className="mt-5">
                <AlertBox tone="info">
                  Uma amostra por conveniência ou painel pode ser considerada,
                  dependendo do objetivo. A metodologia final deve ser validada
                  pela área de pesquisa.
                </AlertBox>
              </div>
            )}
            <div className="mt-7">
              <label className="text-sm font-medium text-slate-700">
                Amostra preliminar (opcional)
                <Tooltip text={TOOLTIPS.amostra} />
              </label>
              <TextInput
                className="mt-2"
                placeholder="Ex: 400 entrevistas (será validada pelo time de pesquisa)"
                value={a.amostraPreliminar}
                onChange={(e) => updateAnswers({ amostraPreliminar: e.target.value })}
              />
            </div>
            <NavRow onBack={goBack} onNext={goNext} nextDisabled={!a.representatividade} />
          </StepShell>
        )}

        {step === 9 && (
          <StepShell eyebrow="Etapa 9 · Segmentações">
            <QuestionHeading tooltip={TOOLTIPS.segmentacao}>
              Você precisa analisar os resultados por algum grupo específico?
            </QuestionHeading>
            <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
              {SEGMENTACAO_OPTIONS.map((opt) => (
                <OptionCard
                  key={opt.id}
                  label={opt.label}
                  selected={a.segmentacoes.includes(opt.id)}
                  onClick={() =>
                    updateAnswers({ segmentacoes: toggle(a.segmentacoes, opt.id) })
                  }
                />
              ))}
            </div>
            {a.segmentacoes.includes('outro') && (
              <TextInput
                className="mt-4"
                placeholder="Descreva a segmentação"
                value={a.segmentacaoOutro}
                onChange={(e) => updateAnswers({ segmentacaoOutro: e.target.value })}
              />
            )}
            {a.segmentacoes.length >= 3 && (
              <div className="mt-5">
                <AlertBox tone="info">
                  Quanto mais segmentos forem necessários para análise, maior
                  poderá ser a necessidade de amostra.
                </AlertBox>
              </div>
            )}
            <NavRow onBack={goBack} onNext={goNext} />
          </StepShell>
        )}

        {step === 10 && (
          <StepShell eyebrow="Etapa 10 · Questionário">
            <QuestionHeading>Você já sabe quais perguntas precisam ser feitas?</QuestionHeading>
            <div className="mt-6 grid grid-cols-1 gap-3">
              {QUESTIONARIO_OPTIONS.map((opt) => (
                <OptionCard
                  key={opt.id}
                  label={opt.label}
                  selected={a.questionario === opt.id}
                  onClick={() => updateAnswers({ questionario: opt.id })}
                />
              ))}
            </div>
            {a.questionario === 'tem_questionario' && (
              <div className="mt-5">
                <p className="mb-2.5 text-sm font-medium text-slate-700">
                  Existe um arquivo para anexar?
                </p>
                <div className="flex gap-3">
                  <GhostButton
                    onClick={() => updateAnswers({ questionarioAnexo: true })}
                  >
                    {a.questionarioAnexo === true ? '✓ Sim' : 'Sim'}
                  </GhostButton>
                  <GhostButton
                    onClick={() => updateAnswers({ questionarioAnexo: false })}
                  >
                    {a.questionarioAnexo === false ? '✓ Não' : 'Não'}
                  </GhostButton>
                </div>
              </div>
            )}
            {a.questionario === 'tem_temas' && (
              <div className="mt-5">
                <AlertBox tone="info">
                  O time de pesquisa deverá transformar os temas em um questionário estruturado.
                </AlertBox>
              </div>
            )}
            {a.questionario === 'nada_definido' && (
              <div className="mt-5">
                <AlertBox tone="info">
                  Será necessário desenvolver o questionário a partir dos objetivos da pesquisa.
                </AlertBox>
              </div>
            )}
            <NavRow onBack={goBack} onNext={goNext} nextDisabled={!a.questionario} />
          </StepShell>
        )}

        {step === 11 && (
          <StepShell eyebrow="Etapa 11 · Prazo">
            <QuestionHeading>Existe uma data limite para entrega dos resultados?</QuestionHeading>
            <TextInput
              type="date"
              className="mt-6"
              value={a.prazoData}
              onChange={(e) => updateAnswers({ prazoData: e.target.value })}
            />

            <div className="mt-8 border-t border-slate-100 pt-7">
              <QuestionHeading>Existe alguma data crítica relacionada ao projeto?</QuestionHeading>
              <TextInput
                className="mt-5"
                placeholder="Ex: lançamento, campanha, evento, planejamento anual..."
                value={a.dataCritica}
                onChange={(e) => updateAnswers({ dataCritica: e.target.value })}
              />
              <div className="mt-3 flex flex-wrap gap-2">
                {DATA_CRITICA_EXEMPLOS.map((ex) => (
                  <span
                    key={ex}
                    className="rounded-full bg-slate-100 px-3 py-1 text-xs text-slate-500"
                  >
                    {ex}
                  </span>
                ))}
              </div>
            </div>
            <NavRow onBack={goBack} onNext={goNext} />
          </StepShell>
        )}

        {step === 12 && (
          <StepShell eyebrow="Etapa 12 · Entregáveis">
            <QuestionHeading>O que o cliente espera receber?</QuestionHeading>
            <p className="mt-1.5 text-sm text-slate-500">Selecione todas as opções aplicáveis.</p>
            <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
              {ENTREGAVEIS_OPTIONS.map((opt) => (
                <OptionCard
                  key={opt.id}
                  label={opt.label}
                  selected={a.entregaveis.includes(opt.id)}
                  onClick={() => updateAnswers({ entregaveis: toggle(a.entregaveis, opt.id) })}
                />
              ))}
            </div>
            {a.entregaveis.includes('outro') && (
              <TextInput
                className="mt-4"
                placeholder="Descreva o entregável"
                value={a.entregavelOutro}
                onChange={(e) => updateAnswers({ entregavelOutro: e.target.value })}
              />
            )}
            <NavRow
              onBack={goBack}
              onNext={onFinish}
              nextLabel="Ver diagnóstico"
              nextDisabled={!a.entregaveis.length}
            />
          </StepShell>
        )}
      </div>
      <p className="mx-auto mt-6 max-w-2xl px-6 text-center text-xs text-slate-400">
        Suas respostas ficam salvas nesta sessão — você pode voltar a qualquer etapa sem perdê-las.
      </p>
    </div>
  )
}
