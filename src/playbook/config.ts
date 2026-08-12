import type { OptionDef } from './types'

// All option lists and static copy for the 12-step decision tree.
// Editing this file is the intended way to change questions/options until
// the future admin area ("Administração do Playbook") ships.

export const TOTAL_STEPS = 11

export const NECESSIDADE_OPTIONS: OptionDef[] = [
  { id: 'mercado', label: 'Conhecer o mercado' },
  { id: 'consumidor', label: 'Conhecer o consumidor' },
  { id: 'marca', label: 'Avaliar uma marca' },
  { id: 'produto_servico', label: 'Avaliar produto ou serviço' },
  { id: 'habitos', label: 'Entender hábitos e comportamentos' },
  { id: 'satisfacao', label: 'Medir satisfação' },
  { id: 'conceito', label: 'Avaliar conceito/produto antes do lançamento' },
  { id: 'preco', label: 'Definir ou avaliar preço' },
  { id: 'comunicacao', label: 'Avaliar comunicação' },
  { id: 'segmentar', label: 'Segmentar consumidores' },
  { id: 'campanha', label: 'Avaliar campanha' },
  { id: 'outros', label: 'Outros' },
]

export const DECISAO_EXEMPLOS = [
  'Decidir se devemos lançar o produto',
  'Definir posicionamento',
  'Escolher público prioritário',
  'Avaliar potencial de mercado',
  'Melhorar experiência do cliente',
  'Definir estratégia de comunicação',
]

export const OBJETIVO_OPTIONS: OptionDef[] = [
  { id: 'awareness', label: 'Conhecimento / awareness' },
  { id: 'uso', label: 'Uso / consumo' },
  { id: 'habitos', label: 'Hábitos' },
  { id: 'preferencias', label: 'Preferências' },
  { id: 'percepcao', label: 'Percepção' },
  { id: 'imagem', label: 'Imagem de marca' },
  { id: 'satisfacao', label: 'Satisfação' },
  { id: 'intencao_compra', label: 'Intenção de compra' },
  { id: 'drivers', label: 'Drivers de decisão' },
  { id: 'potencial_mercado', label: 'Potencial de mercado' },
  { id: 'preco', label: 'Preço' },
  { id: 'segmentacao', label: 'Segmentação' },
  { id: 'jornada', label: 'Jornada de compra' },
  { id: 'veiculacao', label: 'Veiculação de campanha' },
  { id: 'outro', label: 'Outro' },
]

export const TIPO_INFORMACAO_OPTIONS: Array<{
  id: 'quantificar' | 'explorar' | 'ambos'
  letter: string
  title: string
  description: string
}> = [
  {
    id: 'quantificar',
    letter: 'A',
    title: 'Quantificar',
    description:
      'Preciso medir tamanho, percentual, frequência, preferência, satisfação, intenção etc.',
  },
  {
    id: 'explorar',
    letter: 'B',
    title: 'Explorar',
    description:
      'Preciso entender profundamente motivações, percepções, linguagem, razões e hipóteses.',
  },
  {
    id: 'ambos',
    letter: 'C',
    title: 'Ambos',
    description: 'Preciso explorar primeiro e depois quantificar.',
  },
]

export const PUBLICO_ALVO_OPTIONS: OptionDef[] = [
  { id: 'populacao_geral', label: 'População geral' },
  { id: 'consumidores_categoria', label: 'Consumidores da categoria' },
  { id: 'consumidores_marca', label: 'Consumidores da marca' },
  { id: 'clientes', label: 'Clientes' },
  { id: 'ex_clientes', label: 'Ex-clientes' },
  { id: 'potenciais_consumidores', label: 'Potenciais consumidores' },
  { id: 'empresas', label: 'Empresas' },
  { id: 'profissionais', label: 'Profissionais / decisores' },
  { id: 'colaboradores', label: 'Colaboradores' },
  { id: 'outro', label: 'Outro' },
]

export const CRITERIOS_OPTIONS: OptionDef[] = [
  { id: 'idade', label: 'Idade' },
  { id: 'regiao', label: 'Região' },
  { id: 'renda', label: 'Renda' },
  { id: 'classe', label: 'Classe socioeconômica' },
  { id: 'sexo_genero', label: 'Sexo/gênero' },
  { id: 'frequencia_consumo', label: 'Frequência de consumo' },
  { id: 'compra_recente', label: 'Compra recente' },
  { id: 'uso_recente', label: 'Uso recente' },
  { id: 'conhecimento_marca', label: 'Conhecimento da marca' },
  { id: 'cargo', label: 'Cargo / função' },
  { id: 'tipo_empresa', label: 'Tipo de empresa' },
  { id: 'outro', label: 'Outro' },
]

export const COMPORTAMENTO_OPTIONS: OptionDef[] = [
  { id: 'comprou', label: 'Comprou' },
  { id: 'usou', label: 'Usou' },
  { id: 'consumiu', label: 'Consumiu' },
  { id: 'pesquisou', label: 'Pesquisou' },
  { id: 'considerou', label: 'Considerou comprar' },
  { id: 'conhece', label: 'Conhece' },
  { id: 'sem_experiencia', label: 'Não precisa ter experiência' },
  { id: 'outro', label: 'Outro' },
]

export const COMPORTAMENTOS_QUE_PEDEM_PERIODO = ['comprou', 'usou', 'consumiu']

export const PERIODO_OPTIONS: OptionDef[] = [
  { id: '30_dias', label: 'Últimos 30 dias' },
  { id: '3_meses', label: 'Últimos 3 meses' },
  { id: '6_meses', label: 'Últimos 6 meses' },
  { id: '12_meses', label: 'Últimos 12 meses' },
  { id: 'Não aplicável', label: 'Não aplicável' },
  { id: 'outro', label: 'Outro' },
]

export const GEOGRAFIA_OPTIONS: OptionDef[] = [
  { id: 'brasil', label: 'Brasil' },
  { id: 'regiao', label: 'Região' },
  { id: 'estado', label: 'Estado' },
  { id: 'cidade', label: 'Cidade' },
  { id: 'regiao_metropolitana', label: 'Região Metropolitana' },
  { id: 'outro', label: 'Outro' },
]

export const SEGMENTACAO_OPTIONS: OptionDef[] = [
  { id: 'idade', label: 'Idade' },
  { id: 'sexo_genero', label: 'Sexo/gênero' },
  { id: 'regiao', label: 'Região' },
  { id: 'classe_renda', label: 'Classe/renda' },
  { id: 'cliente_nao_cliente', label: 'Cliente vs. não cliente' },
  { id: 'usuario_nao_usuario', label: 'Usuário vs. não usuário' },
  { id: 'frequencia_consumo', label: 'Frequência de consumo' },
  { id: 'marca', label: 'Marca' },
  { id: 'outro', label: 'Outro' },
]

export const QUESTIONARIO_OPTIONS: Array<{ id: 'tem_questionario' | 'tem_temas' | 'nada_definido'; label: string }> = [
  { id: 'tem_questionario', label: 'Sim, já temos questionário' },
  { id: 'tem_temas', label: 'Temos apenas os temas' },
  { id: 'nada_definido', label: 'Ainda não temos nada definido' },
]

export const DATA_CRITICA_EXEMPLOS = [
  'Lançamento',
  'Campanha',
  'Evento',
  'Planejamento anual',
  'Reunião de diretoria',
]

export const ENTREGAVEIS_OPTIONS: OptionDef[] = [
  { id: 'base_dados', label: 'Base de dados - xlx csv' },
  { id: 'apresentacao', label: 'Apresentação' },
  { id: 'tabulacao', label: 'Tabulação' },
  { id: 'cruzamentos', label: 'Cruzamentos específicos' },
  { id: 'ferramentas', label: 'Ferramentas IBOPE - ex Choices' },
  { id: 'outro', label: 'Outro' },
]


