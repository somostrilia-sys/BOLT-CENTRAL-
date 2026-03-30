import { NextRequest, NextResponse } from 'next/server'
import { BOLT_MOCK } from '@/lib/mock/bolt-data'
import { EMPRESAS } from '@/lib/constants/empresas'
import { getConsolidadoGrupo, getAlertasAtivos } from '@/lib/api/supabase'

function formatBRL(v: number) {
  return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(v)
}

function formatNum(v: number) {
  return new Intl.NumberFormat('pt-BR').format(v)
}

function detect(msg: string) {
  const m = msg
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')

  // Navigation
  if (/abrir painel|ver dashboard|paineis|painel/.test(m)) return { intent: 'navigate' }

  // Greeting
  if (/^(bom dia|boa tarde|boa noite|ola|oi|hey|e ai)/.test(m)) return { intent: 'greeting' }

  // Ligações / LuxSales
  if (/ligac|chamada|lux.*sales|luxsales/.test(m)) return { intent: 'ligacoes' }

  // WhatsApp / conversas
  if (/whatsapp|conversa|wa |template/.test(m)) return { intent: 'whatsapp' }

  // Leads
  if (/lead|prospect|captac/.test(m)) return { intent: 'leads' }

  // Specific empresa
  for (const e of EMPRESAS) {
    const slug = e.id.replace(/-/g, ' ')
    const nome = e.nome
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
    if (m.includes(slug) || m.includes(nome))
      return { intent: 'empresa', empresaId: e.id, empresaNome: e.nome }
  }

  // Faturamento
  if (/faturamento|receita|faturou/.test(m)) return { intent: 'faturamento' }

  // Alertas
  if (/alerta|problema|critico|urgente/.test(m)) return { intent: 'alertas' }

  // Ranking
  if (/ranking|melhor|pior|top/.test(m)) return { intent: 'ranking' }

  // Inadimplencia
  if (/inadimplencia|inadimplente|devedor/.test(m)) return { intent: 'inadimplencia' }

  // Previsao
  if (/previsao|projecao|meta|projetar/.test(m)) return { intent: 'previsao' }

  // Cash flow
  if (/caixa|saldo|fluxo|cash/.test(m)) return { intent: 'cashflow' }

  // Eventos / sinistros
  if (/evento|sinistro|colisao|colisão|acidente|acionamento/.test(m)) return { intent: 'eventos' }

  // Cobrança / CollectPRO
  if (/cobranc|cobrança|inadimplente|boleto|collect|régua|regua/.test(m)) return { intent: 'cobranca' }

  // Trilia / educacional
  if (/trilia|curso|evento educacional|sdr|closer|palestra/.test(m)) return { intent: 'trilia_crm' }

  // RH / colaboradores
  if (/colaborador|rh|contrat|deslig|ferias|férias|folha|gente forte/.test(m)) return { intent: 'rh' }

  // VoIP / ligações IA
  if (/voip|voz|pipeline voz|fish speech|xtts|pipecat|freeswitch/.test(m)) return { intent: 'voip' }

  // Painel / sistemas
  if (/sistema|ecossistema|quantos sistemas|status geral/.test(m)) return { intent: 'status_sistemas' }

  return { intent: 'default' }
}

export async function POST(req: NextRequest) {
  const { message } = await req.json()
  const { intent, empresaId, empresaNome } = detect(message) as any
  const d = BOLT_MOCK

  // Fetch real data in parallel for relevant intents
  let consolidadoReal = null
  let alertasReais: any[] = []

  const needsRealData = ['greeting', 'alertas', 'ligacoes', 'whatsapp', 'leads'].includes(intent)
  if (needsRealData) {
    try {
      ;[consolidadoReal, alertasReais] = await Promise.all([
        getConsolidadoGrupo(),
        getAlertasAtivos(),
      ])
    } catch {
      // fallback to mock
    }
  }

  let text = ''
  let emotion: string = 'neutral'
  let action: any = undefined

  switch (intent) {
    case 'navigate':
      text = 'Abrindo os painéis do grupo. Vou te levar para o dashboard.'
      action = { type: 'navigate', path: '/dashboard/overview' }
      break

    case 'greeting': {
      const criticos =
        alertasReais.filter((a) => a.severity === 'critical').length +
        d.alertas.filter((a) => a.severity === 'critical').length
      const ligText =
        consolidadoReal
          ? ` Temos ${formatNum(consolidadoReal.totalLigacoes)} ligações e ${formatNum(consolidadoReal.conversasAtivas)} conversas WA ativas.`
          : ''
      text = `Bom dia, Alex. Nosso grupo faturou ${formatBRL(d.consolidado.faturamento)} este mês — ${d.consolidado.metaAtingida}% da meta. Temos ${d.consolidado.placasAtivas.toLocaleString('pt-BR')} placas ativas com inadimplência em ${d.consolidado.inadimplencia}%.${ligText} ${criticos} alertas críticos precisam de atenção.`
      emotion = criticos > 0 ? 'warning' : 'positive'
      break
    }

    case 'ligacoes': {
      if (consolidadoReal) {
        text = `LuxSales este mês: ${formatNum(consolidadoReal.totalLigacoes)} ligações realizadas, ${formatNum(consolidadoReal.ligacoesSucesso)} com sucesso — taxa de conversão de ${consolidadoReal.taxaConversaoLigacoes}%.`
        emotion = consolidadoReal.taxaConversaoLigacoes >= 30 ? 'positive' : 'warning'
      } else {
        text = 'Dados de ligações LuxSales ainda carregando. Tente novamente em instantes.'
        emotion = 'neutral'
      }
      break
    }

    case 'whatsapp': {
      if (consolidadoReal) {
        const alertaExp = alertasReais.find((a) => a.id === 'wa-exp')
        const alertaTpl = alertasReais.find((a) => a.id === 'tpl-rej')
        text = `WhatsApp: ${formatNum(consolidadoReal.conversasAtivas)} conversas ativas, ${formatNum(consolidadoReal.templatesAtivos)} templates aprovados.`
        if (alertaExp) text += ` ⚠️ ${alertaExp.title}.`
        if (alertaTpl) text += ` 🚨 ${alertaTpl.title}.`
        emotion = alertaTpl ? 'critical' : alertaExp ? 'warning' : 'positive'
      } else {
        text = 'Dados de WhatsApp indisponíveis no momento.'
      }
      break
    }

    case 'leads': {
      if (consolidadoReal) {
        text = `Base de leads total: ${formatNum(consolidadoReal.totalLeads)} prospects cadastrados. Colaboradores ativos: ${formatNum(consolidadoReal.colaboradores)}.`
        emotion = 'positive'
      } else {
        text = 'Dados de leads indisponíveis no momento.'
      }
      break
    }

    case 'empresa': {
      const emp = d.faturamentoPorEmpresa.find((e) =>
        e.empresa.toLowerCase().includes((empresaNome || '').toLowerCase()),
      )
      if (emp) {
        text = `${emp.empresa} faturou ${formatBRL(emp.valor)} este mês. Representa ${((emp.valor / d.consolidado.faturamento) * 100).toFixed(1)}% do nosso consolidado. Quer que eu abra o painel detalhado?`
        emotion = 'positive'
        action = { type: 'highlight', path: `/dashboard/${empresaId}` }
      } else {
        text = `Tenho dados limitados sobre ${empresaNome} no momento. Vou buscar mais informações.`
      }
      break
    }

    case 'faturamento':
      text = `Faturamento consolidado: ${formatBRL(d.consolidado.faturamento)}. Top 3: ${d.faturamentoPorEmpresa
        .slice(0, 3)
        .map((e) => `${e.empresa} (${formatBRL(e.valor)})`)
        .join(', ')}. Margem líquida do grupo: ${d.consolidado.margemLiquida}%.`
      emotion = 'positive'
      break

    case 'alertas': {
      const todosAlertas = [
        ...alertasReais,
        ...d.alertas.filter((a) => !alertasReais.some((r) => r.id === a.id)),
      ]
      const criticos = todosAlertas.filter((a) => a.severity === 'critical')
      const warnings = todosAlertas.filter((a) => a.severity === 'warning')
      text = `Temos ${criticos.length} alertas críticos e ${warnings.length} warnings. Críticos: ${criticos.map((a) => a.title).join('; ')}. Warnings: ${warnings.map((a) => a.title).join('; ')}.`
      emotion = criticos.length > 0 ? 'critical' : 'warning'
      break
    }

    case 'ranking':
      text = `Ranking de franquias por vendas: ${d.topFranquias
        .map(
          (f, i) =>
            `${i + 1}º ${f.nome} (${f.vendas} vendas, ${((f.vendas / f.meta) * 100).toFixed(0)}% meta)`,
        )
        .join(' | ')}.`
      emotion = 'positive'
      break

    case 'inadimplencia':
      text = `Inadimplência consolidada: ${d.consolidado.inadimplencia}%. Por franquia: ${d.topFranquias
        .map((f) => `${f.nome}: ${f.inadimplencia}%`)
        .join(', ')}. Campinas está acima do aceitável com 11,3%.`
      emotion = d.consolidado.inadimplencia > 8 ? 'warning' : 'neutral'
      break

    case 'previsao':
      text = `Projeção do mês: ${d.consolidado.metaAtingida}% da meta atingida. Faturamento atual ${formatBRL(d.consolidado.faturamento)}. Tendência de fechar em ${formatBRL(d.consolidado.faturamento * 1.15)} se mantivermos o ritmo. ${d.consolidado.placasLiquidas > 0 ? `Saldo de placas positivo em +${d.consolidado.placasLiquidas}.` : ''}`
      emotion = d.consolidado.metaAtingida >= 80 ? 'positive' : 'warning'
      break

    case 'cashflow':
      text = `Posição de caixa: ${formatBRL(d.consolidado.cashFlow)}. Projeção 30 dias: ${formatBRL(d.consolidado.cashFlow * 1.08)}. 60 dias: ${formatBRL(d.consolidado.cashFlow * 1.14)}. 90 dias: ${formatBRL(d.consolidado.cashFlow * 1.22)}. Fluxo saudável.`
      emotion = 'positive'
      break

    case 'eventos':
      text =
        'EventosPRO: sistema de gestão de sinistros e eventos veiculares. Associados acompanham o andamento em tempo real. Sistema criado esta noite — aguardando deploy Vercel para entrar em produção.'
      emotion = 'neutral'
      break

    case 'cobranca':
      text = `CollectPRO: ${formatBRL(1247000)} em aberto. Taxa de recuperação 68%. Régua: D+1 WhatsApp amigável → D+7 WA + ligação → D+15 VoIP IA automático. Equipe: Angela, Carlos, Fernanda, Rodrigo.`
      emotion = 'warning'
      break

    case 'trilia_crm':
      text =
        'CRM Trilia: pipeline educacional com 6 estágios — Novo Lead, Qualificado, Proposta, Negociando, Fechado, Perdido. Angelo é o Head. 6 SDRs + 2 closers. Sistema criado esta noite — aguardando deploy.'
      emotion = 'positive'
      break

    case 'rh':
      text =
        'Gente Forte RH: 24 módulos — avaliações, PDI, treinamentos, onboarding, férias, banco de horas, organograma. Colaboradores da Objetivo e todo o grupo. Sistema online em gente-forte-ixl4t4vam-holdingwalk.vercel.app.'
      emotion = 'neutral'
      break

    case 'voip':
      text =
        'Pipeline VoIP IA ativo no PC Gamer: Faster-Whisper (STT) → Qwen 14B (LLM) → XTTS (TTS voz Alex). Trunk: Telnyx. 400k minutos contratados. Integrado ao LuxSales — liga automaticamente para leads qualificados.'
      emotion = 'positive'
      break

    case 'status_sistemas':
      text = `Ecossistema WALK: 11 sistemas. Online: LuxSales (100%), GIA Backend (100%), ASSIST AI (80%), Painel Bolt (75%), CollectPRO (70%), Track System (65%), WalkFinance (65%), RH (55%). Em deploy: EventosPRO, CRM Trilia, Essência Marketing. Bloqueio: token Vercel expirado.`
      emotion = 'neutral'
      break

    default:
      text =
        'Não entendi completamente. Pergunte sobre faturamento, alertas, ranking, inadimplência, ligações, leads, conversas WhatsApp ou qualquer empresa do grupo — Objetivo, Trilho Soluções, TrackIt, Trilia, Essência Marketing, Digital LUX, Oficina ou Walk Contábil — ou pergunte sobre eventos, cobrança, trilia, rh, voip ou status dos sistemas.'
      break
  }

  return NextResponse.json({ text, action, emotion })
}
