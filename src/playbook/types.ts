// Core data types for the interactive research-scoping playbook.
// Kept separate from UI so new questions / rules can be added without touching components.

export type TipoInformacao = 'quantificar' | 'explorar' | 'ambos'
export type Questionario = 'tem_questionario' | 'tem_temas' | 'nada_definido'

export interface Answers {
  necessidade: string[]
  necessidadeOutro: string
  decisaoNegocio: string
  objetivos: string[]
  objetivoOutro: string
  tipoInformacao: TipoInformacao | null
  publicoAlvo: string | null
  publicoAlvoOutro: string
  criterios: string[]
  criteriosEspecificacao: string
  comportamento: string | null
  comportamentoOutro: string
  periodo: string | null
  periodoOutro: string
  geografia: string | null
  geografiaDetalhe: string
  segmentacoes: string[]
  segmentacaoOutro: string
  questionario: Questionario | null
  questionarioAnexo: boolean | null
  prazoData: string
  dataCritica: string
  entregaveis: string[]
  entregavelOutro: string
  amostraPreliminar: string
  cliente: string
}

export const initialAnswers: Answers = {
  necessidade: null,
  necessidadeOutro: '',
  decisaoNegocio: '',
  objetivos: [],
  objetivoOutro: '',
  tipoInformacao: null,
  publicoAlvo: null,
  publicoAlvoOutro: '',
  criterios: [],
  criteriosEspecificacao: '',
  comportamento: null,
  comportamentoOutro: '',
  periodo: null,
  periodoOutro: '',
  geografia: null,
  geografiaDetalhe: '',
  representatividade: null,
  segmentacoes: [],
  segmentacaoOutro: '',
  questionario: null,
  questionarioAnexo: null,
  prazoData: '',
  dataCritica: '',
  entregaveis: [],
  entregavelOutro: '',
  amostraPreliminar: '',
  cliente: '',
}

export interface OptionDef {
  id: string
  label: string
  description?: string
}

export type View = 'intro' | 'wizard' | 'diagnosis'
