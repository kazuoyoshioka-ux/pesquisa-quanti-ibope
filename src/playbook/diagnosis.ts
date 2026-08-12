import type { Answers } from './types'
import {
  COMPORTAMENTO_OPTIONS,
  COMPORTAMENTOS_QUE_PEDEM_PERIODO,
  CRITERIOS_OPTIONS,
  ENTREGAVEIS_OPTIONS,
  GEOGRAFIA_OPTIONS,
  NECESSIDADE_OPTIONS,
  OBJETIVO_OPTIONS,
  PERIODO_OPTIONS,
  PUBLICO_ALVO_OPTIONS,
  SEGMENTACAO_OPTIONS,
} from './config'

function label(list: { id: string; label: string }[], id: string | null | undefined) {
  if (!id) return null
  return list.find((o) => o.id === id)?.label ?? id
}

function labels(list: { id: string; label: string }[], ids: string[]) {
  return ids.map((id) => label(list, id) ?? id)
}

export interface Diagnosis {
  necessidade: string
  objetivoPesquisa: string
  publicoAlvo: string
  criteriosQualificacao: string
  metodologiaSugerida: string
  necessidadeAmostra: string
  pontosAbertos: string[]
  alertasMetodologicos: string[]
  recomendacaoPreliminar: string
  abrangencia: string
  segmentacoes: string
  questionarioResumo: string
  entregaveis: string
  prazo: string
}

export function buildDiagnosis(a: Answers): Diagnosis {
  const alertas: string[] = []
  const abertos: string[] = []

  // Necessidade / tipo de pesquisa
  const publicoLabels = labels(PUBLICO_ALVO_OPTIONS, a.publicoAlvo)
  const publicoLabel = publicoLabels.length
    a.necessidade === 'outros' && a.necessidadeOutro
      ? a.necessidadeOutro
      : label(NECESSIDADE_OPTIONS, a.necessidade) ?? 'Não informado'
  if (!a.necessidade) abertos.push('Necessidade do cliente não foi selecionada.')

  // Objetivo
  const objetivos = labels(OBJETIVO_OPTIONS, a.objetivos)
  const objetivoPesquisa = objetivos.length
    ? objetivos.join(', ') + (a.objetivoOutro ? ` (${a.objetivoOutro})` : '')
    : 'Não informado'
  if (!a.objetivos.length) abertos.push('Objetivo da pesquisa ainda não foi definido.')
  if (!a.decisaoNegocio.trim())
    abertos.push('Decisão de negócio associada ao projeto não foi descrita.')

  // Tipo de informação -> metodologia
  let metodologia = 'A definir com o time de pesquisa.'
  if (a.tipoInformacao === 'quantificar') {
    metodologia = 'Pesquisa quantitativa (survey estruturado).'
  } else if (a.tipoInformacao === 'explorar') {
    metodologia = 'Abordagem qualitativa — quantitativo pode não ser adequado.'
    alertas.push(
      'Esta necessidade pode exigir uma abordagem qualitativa. O time de pesquisa deve avaliar se o quantitativo é adequado.',
    )
  } else if (a.tipoInformacao === 'ambos') {
    metodologia = 'Abordagem em duas etapas: qualitativa + quantitativa.'
    alertas.push('Considere uma abordagem em duas etapas: qualitativa + quantitativa.')
  } else {
    abertos.push('Ainda não foi definido se o objetivo é quantificar, explorar ou ambos.')
  }

  // Público-alvo
  publicoLabel =
    a.publicoAlvo === 'outro' && a.publicoAlvoOutro
      ? a.publicoAlvoOutro
      : label(PUBLICO_ALVO_OPTIONS, a.publicoAlvo) ?? 'Não informado'
  if (!a.publicoAlvo) abertos.push('Público-alvo da pesquisa não foi selecionado.')

  const criteriosLabels = labels(CRITERIOS_OPTIONS, a.criterios)
  const criteriosQualificacao = criteriosLabels.length
    ? criteriosLabels.join(', ') +
      (a.criteriosEspecificacao ? ` — ${a.criteriosEspecificacao}` : '')
    : 'Nenhum critério obrigatório informado.'

  // Comportamento / período
  const comportamentoLabel = label(COMPORTAMENTO_OPTIONS, a.comportamento)
  const precisaPeriodo =
    a.comportamento != null &&
    COMPORTAMENTOS_QUE_PEDEM_PERIODO.includes(a.comportamento)
  if (precisaPeriodo && !a.periodo) {
    abertos.push('Período de referência do comportamento ainda não foi definido.')
  }
  const periodoLabel =
    a.periodo === 'outro' && a.periodoOutro ? a.periodoOutro : label(PERIODO_OPTIONS, a.periodo)

  // Geografia
  const abrangencia =
    a.geografia === 'outro' && a.geografiaDetalhe
      ? a.geografiaDetalhe
      : label(GEOGRAFIA_OPTIONS, a.geografia) ?? 'Não informado'
  if (a.geografia && ['regiao', 'estado', 'cidade', 'regiao_metropolitana'].includes(a.geografia) && !a.geografiaDetalhe) {
    abertos.push('Detalhamento geográfico (quais estados/cidades) ainda não foi especificado.')
  }
  if (!a.geografia) abertos.push('Abrangência geográfica não foi definida.')

  // Representatividade -> amostra
  let necessidadeAmostra =
    'Necessidade de amostra ainda não avaliada — depende da definição de representatividade.'
  if (a.representatividade === 'sim') {
    necessidadeAmostra =
      'Resultados precisam representar o universo estudado — amostra a ser calculada após validação de universo, distribuição populacional, método de recrutamento, margem de erro e subgrupos de análise.'
    alertas.push(
      'A definição da amostra deverá considerar universo, distribuição da população, método de recrutamento, margem de erro desejada e necessidade de análises por subgrupos.',
    )
  } else if (a.representatividade === 'nao') {
    necessidadeAmostra =
      'Leitura exploratória/direcional — amostra por conveniência ou painel pode ser considerada.'
    alertas.push(
      'Uma amostra por conveniência ou painel pode ser considerada, dependendo do objetivo. A metodologia final deve ser validada pela área de pesquisa.',
    )
  } else if (a.representatividade === 'ainda_nao') {
    abertos.push('Necessidade de representatividade estatística ainda não foi definida com o cliente.')
  } else {
    abertos.push('Necessidade de representatividade estatística não foi respondida.')
  }
  if (a.amostraPreliminar.trim()) {
    necessidadeAmostra += ` Amostra preliminar informada pelo usuário: ${a.amostraPreliminar} (sujeita à validação metodológica — não é um tamanho definitivo).`
  }

  // Segmentações
  const segmentacoesLabels = labels(SEGMENTACAO_OPTIONS, a.segmentacoes)
  const segmentacoes = segmentacoesLabels.length
    ? segmentacoesLabels.join(', ') + (a.segmentacaoOutro ? ` (${a.segmentacaoOutro})` : '')
    : 'Nenhuma segmentação específica solicitada.'
  if (segmentacoesLabels.length >= 3) {
    alertas.push(
      'Quanto mais segmentos forem necessários para análise, maior poderá ser a necessidade de amostra.',
    )
  }

  // Questionário
  let questionarioResumo = 'Não informado.'
  if (a.questionario === 'tem_questionario') {
    questionarioResumo = a.questionarioAnexo
      ? 'Cliente já possui questionário estruturado (com arquivo a anexar).'
      : 'Cliente já possui questionário estruturado (sem arquivo anexado ainda).'
    if (!a.questionarioAnexo) abertos.push('Anexar o questionário já existente enviado pelo cliente.')
  } else if (a.questionario === 'tem_temas') {
    questionarioResumo = 'Cliente definiu apenas os temas — questionário ainda precisa ser estruturado.'
    alertas.push('O time de pesquisa deverá transformar os temas em um questionário estruturado.')
  } else if (a.questionario === 'nada_definido') {
    questionarioResumo = 'Nenhum questionário ou tema definido ainda.'
    alertas.push('Será necessário desenvolver o questionário a partir dos objetivos da pesquisa.')
  } else {
    abertos.push('Situação do questionário (existente, temas ou nada definido) não foi informada.')
  }

  // Entregáveis
  const entregaveisLabels = labels(ENTREGAVEIS_OPTIONS, a.entregaveis)
  const entregaveis = entregaveisLabels.length
    ? entregaveisLabels.join(', ') + (a.entregavelOutro ? ` (${a.entregavelOutro})` : '')
    : 'Não informado.'
  if (!entregaveisLabels.length) abertos.push('Entregáveis esperados pelo cliente ainda não foram definidos.')

  // Prazo
  const prazo = a.prazoData
    ? `Entrega até ${a.prazoData}${a.dataCritica ? ` — data crítica relacionada: ${a.dataCritica}` : ''}`
    : 'Prazo ainda não informado.'
  if (!a.prazoData) abertos.push('Data limite para entrega dos resultados não foi informada.')

  // Recomendação preliminar (narrative)
  const recAudiencia = publicoLabel !== 'Não informado' ? publicoLabel.toLowerCase() : 'público a definir'
  const recMetodo =
    a.tipoInformacao === 'explorar'
      ? 'qualitativa'
      : a.tipoInformacao === 'ambos'
        ? 'qualitativa seguida de quantitativa'
        : 'quantitativa online'
  const recomendacaoPreliminar = `Pesquisa ${recMetodo} com ${recAudiencia}, com amostra a ser definida após validação do universo, público-alvo, cotas e necessidade de análises por segmento.`

  return {
    necessidade: necessidadeLabel,
    objetivoPesquisa,
    publicoAlvo: `${publicoLabel}${criteriosLabels.length ? ` — critérios: ${criteriosQualificacao}` : ''}`,
    criteriosQualificacao,
    metodologiaSugerida: metodologia,
    necessidadeAmostra,
    pontosAbertos: abertos,
    alertasMetodologicos: alertas,
    recomendacaoPreliminar,
    abrangencia,
    segmentacoes,
    questionarioResumo,
    entregaveis,
    prazo,
  }
}

export function buildBriefingText(a: Answers, d: Diagnosis): string {
  const comportamentoLabel = label(COMPORTAMENTO_OPTIONS, a.comportamento)
  const periodoLabel =
    a.periodo === 'outro' && a.periodoOutro ? a.periodoOutro : label(PERIODO_OPTIONS, a.periodo)

  const lines = [
    'BRIEFING — PESQUISA QUANTITATIVA ADHOC',
    '',
    `Cliente: ${a.cliente || 'Não informado'}`,
    `Problema de negócio / necessidade: ${d.necessidade}`,
    `Decisão a ser tomada: ${a.decisaoNegocio || 'Não informado'}`,
    `Objetivo da pesquisa: ${d.objetivoPesquisa}`,
    `Público-alvo: ${label(PUBLICO_ALVO_OPTIONS, a.publicoAlvo) ?? 'Não informado'}`,
    `Critérios de qualificação: ${d.criteriosQualificacao}`,
    comportamentoLabel ? `Comportamento exigido: ${comportamentoLabel}${periodoLabel ? ` (período: ${periodoLabel})` : ''}` : '',
    `Geografia: ${d.abrangencia}`,
    `Metodologia preliminar: ${d.metodologiaSugerida}`,
    `Segmentações: ${d.segmentacoes}`,
    `Questionário: ${d.questionarioResumo}`,
    `Amostra: ${a.amostraPreliminar ? `${a.amostraPreliminar} (preliminar, informada pelo comercial — sujeita à validação metodológica)` : 'A definir pelo time de pesquisa'}`,
    `Prazo: ${d.prazo}`,
    `Entregáveis: ${d.entregaveis}`,
    '',
    'Pontos em aberto:',
    ...(d.pontosAbertos.length ? d.pontosAbertos.map((p) => `- ${p}`) : ['- Nenhum ponto pendente identificado.']),
    '',
    'Alertas metodológicos:',
    ...(d.alertasMetodologicos.length
      ? d.alertasMetodologicos.map((p) => `- ${p}`)
      : ['- Nenhum alerta metodológico identificado.']),
  ]

  return lines.filter((l) => l !== '').join('\n')
}
