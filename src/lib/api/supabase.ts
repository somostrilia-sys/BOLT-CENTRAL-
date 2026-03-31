import { createClient } from '@supabase/supabase-js'

// ─── LuxSales (wa_conversations, call_logs, whatsapp_meta_templates) ───────────
const LUXSALES_URL = 'https://ecaduzwautlpzpvjognr.supabase.co'
const LUXSALES_KEY =
  process.env.SUPABASE_LUXSALES_SERVICE_KEY ||
  process.env.SUPABASE_SERVICE_KEY ||
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVjYWR1endhdXRscHpwdmpvZ25yIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3MzAwNDUxNywiZXhwIjoyMDg4NTgwNTE3fQ.WlgrZNfRYCsgllWVEjCxcer4OMJzw5NEZoUlA-cG1Rc'

export const supabaseLuxSales = createClient(LUXSALES_URL, LUXSALES_KEY)

// ─── BoltCentral (leads_master, collaborators) ────────────────────────────────
const BOLTCENTRAL_URL = 'https://cfzzpzbgsrqdkuaroupx.supabase.co'
const BOLTCENTRAL_KEY =
  process.env.SUPABASE_BOLTCENTRAL_SERVICE_KEY ||
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
  'placeholder-key-not-configured'

export const supabaseBoltCentral = createClient(BOLTCENTRAL_URL, BOLTCENTRAL_KEY)

// ─── GIA (cotacoes, associados, eventos) ──────────────────────────────────────
const GIA_URL = 'https://yrjiegtqfngdliwclpzo.supabase.co'
const GIA_KEY =
  process.env.SUPABASE_GIA_SERVICE_KEY ||
  process.env.SUPABASE_GIA_ANON_KEY ||
  'placeholder-key-not-configured'

export const supabaseGia = createClient(GIA_URL, GIA_KEY)

// Legacy export — backward compat
export const supabase = supabaseLuxSales

// IDs das empresas (kept for reference)
export const COMPANY_IDS = {
  walkHolding: 'd33b6a84-8f72-4441-b2eb-dd151a31ac12',
  trilia: '131d9cba-b8c6-4f2d-9c4c-5e3aef2a1234',
  digitalLux: 'f96c0059-1234-5678-abcd-ef0123456789',
  objetivo: '70967469-1234-5678-abcd-ef0123456789',
}

// ─── Queries: Dashboard Principal ─────────────────────────────────────────────

export async function getConsolidadoGrupo(mes?: string) {
  const mesAtual = mes || new Date().toISOString().slice(0, 7)
  const inicio = `${mesAtual}-01`
  const fim = `${mesAtual}-31`
  const hoje = new Date().toISOString().slice(0, 10)

  try {
    const [
      { count: totalLigacoes },
      { count: ligacoesSucesso },
      { count: conversasAtivas },
      { count: totalLeads },
      { count: colaboradores },
      { count: templatesAtivos },
      negResult,
      { count: ligacoesHoje },
    ] = await Promise.all([
      supabaseLuxSales
        .from('call_logs')
        .select('id', { count: 'exact', head: true })
        .gte('created_at', inicio)
        .lte('created_at', fim),
      supabaseLuxSales
        .from('call_logs')
        .select('id', { count: 'exact', head: true })
        .eq('goal_achieved', true)
        .gte('created_at', inicio)
        .lte('created_at', fim),
      supabaseLuxSales
        .from('wa_conversations')
        .select('id', { count: 'exact', head: true })
        .eq('status', 'active'),
      supabaseBoltCentral
        .from('leads_master')
        .select('id', { count: 'exact', head: true }),
      supabaseBoltCentral
        .from('collaborators')
        .select('id', { count: 'exact', head: true })
        .eq('active', true),
      supabaseLuxSales
        .from('whatsapp_meta_templates')
        .select('id', { count: 'exact', head: true })
        .eq('status', 'APPROVED'),
      supabaseLuxSales
        .from('negociacoes')
        .select('id', { count: 'exact', head: true })
        .eq('stage', 'concluido')
        .gte('created_at', inicio)
        .lte('created_at', fim),
      supabaseLuxSales
        .from('call_logs')
        .select('id', { count: 'exact', head: true })
        .gte('created_at', `${hoje}T00:00:00`)
        .lte('created_at', `${hoje}T23:59:59`),
    ])

    const vendasMes = negResult.count

    return {
      totalLigacoes: totalLigacoes || 0,
      ligacoesSucesso: ligacoesSucesso || 0,
      taxaConversaoLigacoes: totalLigacoes
        ? Math.round(((ligacoesSucesso || 0) / totalLigacoes) * 100)
        : 0,
      conversasAtivas: conversasAtivas || 0,
      totalLeads: totalLeads || 0,
      colaboradores: colaboradores || 0,
      templatesAtivos: templatesAtivos || 0,
      vendasMes: vendasMes || 0,
      ligacoesHoje: ligacoesHoje || 0,
    }
  } catch (e) {
    console.error('[supabase] getConsolidadoGrupo error:', e)
    return null
  }
}

export async function getAlertasAtivos() {
  const alertas: Array<{
    id: string
    severity: 'critical' | 'warning'
    title: string
    empresa: string
  }> = []

  try {
    const em2h = new Date(Date.now() + 2 * 60 * 60 * 1000).toISOString()
    const [{ data: expirando }, { data: templates }] = await Promise.all([
      supabaseLuxSales
        .from('wa_conversations')
        .select('id,phone,lead_name')
        .eq('status', 'active')
        .lt('window_expires_at', em2h)
        .not('window_expires_at', 'is', null)
        .limit(5),
      supabaseLuxSales
        .from('whatsapp_meta_templates')
        .select('id,name')
        .eq('status', 'REJECTED')
        .limit(3),
    ])

    if (expirando?.length) {
      alertas.push({
        id: 'wa-exp',
        severity: 'warning',
        title: `${expirando.length} conversas WA expirando em < 2h`,
        empresa: 'LuxSales',
      })
    }
    if (templates?.length) {
      alertas.push({
        id: 'tpl-rej',
        severity: 'critical',
        title: `${templates.length} templates Meta reprovados`,
        empresa: 'LuxSales',
      })
    }
  } catch (e) {
    console.error('[supabase] getAlertasAtivos error:', e)
  }

  return alertas
}

// ─── Queries: LuxSales Dashboard ──────────────────────────────────────────────

export async function getLuxSalesDashboard() {
  const hoje = new Date().toISOString().slice(0, 10)

  try {
    const [
      { count: conversasAtivas },
      { count: conversasHoje },
      { count: ligacoesHoje },
      { count: ligacoesHojeSucesso },
      { count: templatesAprovados },
      { count: templatesPendentes },
      { count: templatesReprovados },
    ] = await Promise.all([
      supabaseLuxSales
        .from('wa_conversations')
        .select('id', { count: 'exact', head: true })
        .eq('status', 'active'),
      supabaseLuxSales
        .from('wa_conversations')
        .select('id', { count: 'exact', head: true })
        .gte('created_at', `${hoje}T00:00:00`)
        .lte('created_at', `${hoje}T23:59:59`),
      supabaseLuxSales
        .from('call_logs')
        .select('id', { count: 'exact', head: true })
        .gte('created_at', `${hoje}T00:00:00`)
        .lte('created_at', `${hoje}T23:59:59`),
      supabaseLuxSales
        .from('call_logs')
        .select('id', { count: 'exact', head: true })
        .eq('goal_achieved', true)
        .gte('created_at', `${hoje}T00:00:00`)
        .lte('created_at', `${hoje}T23:59:59`),
      supabaseLuxSales
        .from('whatsapp_meta_templates')
        .select('id', { count: 'exact', head: true })
        .eq('status', 'APPROVED'),
      supabaseLuxSales
        .from('whatsapp_meta_templates')
        .select('id', { count: 'exact', head: true })
        .eq('status', 'PENDING'),
      supabaseLuxSales
        .from('whatsapp_meta_templates')
        .select('id', { count: 'exact', head: true })
        .eq('status', 'REJECTED'),
    ])

    // Buscar conversas dos últimos 30 dias para gráfico
    const trintaDiasAtras = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString()
    const { data: convHistorico } = await supabaseLuxSales
      .from('wa_conversations')
      .select('created_at')
      .gte('created_at', trintaDiasAtras)
      .order('created_at', { ascending: true })
      .limit(5000)

    // Agregar por dia
    const byDay: Record<string, number> = {}
    convHistorico?.forEach((row) => {
      const day = row.created_at.slice(0, 10)
      byDay[day] = (byDay[day] || 0) + 1
    })
    const conversasPorDia = Object.entries(byDay)
      .sort(([a], [b]) => a.localeCompare(b))
      .map(([date, count]) => ({ date: date.slice(5).replace('-', '/'), conversas: count }))

    return {
      conversasAtivas: conversasAtivas || 0,
      conversasHoje: conversasHoje || 0,
      ligacoesHoje: ligacoesHoje || 0,
      ligacoesHojeSucesso: ligacoesHojeSucesso || 0,
      taxaConversaoHoje: ligacoesHoje
        ? Math.round(((ligacoesHojeSucesso || 0) / ligacoesHoje) * 100)
        : 0,
      templatesAprovados: templatesAprovados || 0,
      templatesPendentes: templatesPendentes || 0,
      templatesReprovados: templatesReprovados || 0,
      conversasPorDia,
    }
  } catch (e) {
    console.error('[supabase] getLuxSalesDashboard error:', e)
    return null
  }
}

// ─── Queries: GIA Dashboard ───────────────────────────────────────────────────

export async function getGiaDashboard() {
  const hoje = new Date().toISOString().slice(0, 10)
  const mesAtual = new Date().toISOString().slice(0, 7)
  const inicioMes = `${mesAtual}-01`

  try {
    // Tentar edge function primeiro
    let associadosAtivos = 0
    try {
      const resp = await fetch(
        `${GIA_URL}/functions/v1/gia-financeiro-resumo`,
        {
          headers: {
            Authorization: `Bearer ${GIA_KEY}`,
            'Content-Type': 'application/json',
          },
          signal: AbortSignal.timeout(5000),
        }
      )
      if (resp.ok) {
        const json = await resp.json()
        associadosAtivos = json.associados_ativos || json.total_associados || 0
      }
    } catch {
      // fallback: query direta
      const { count } = await supabaseGia
        .from('associados')
        .select('id', { count: 'exact', head: true })
        .eq('status', 'ativo')
      associadosAtivos = count || 0
    }

    const [
      { count: cotacoesHoje },
      { count: cotacoesMes },
      { count: eventosAbertos },
      { count: eventosResolvidos },
    ] = await Promise.all([
      supabaseGia
        .from('cotacoes')
        .select('id', { count: 'exact', head: true })
        .gte('created_at', `${hoje}T00:00:00`)
        .lte('created_at', `${hoje}T23:59:59`),
      supabaseGia
        .from('cotacoes')
        .select('id', { count: 'exact', head: true })
        .gte('created_at', inicioMes),
      supabaseGia
        .from('eventos')
        .select('id', { count: 'exact', head: true })
        .eq('status', 'aberto'),
      supabaseGia
        .from('eventos')
        .select('id', { count: 'exact', head: true })
        .eq('status', 'resolvido'),
    ])

    return {
      associadosAtivos,
      cotacoesHoje: cotacoesHoje || 0,
      cotacoesMes: cotacoesMes || 0,
      eventosAbertos: eventosAbertos || 0,
      eventosResolvidos: eventosResolvidos || 0,
    }
  } catch (e) {
    console.error('[supabase] getGiaDashboard error:', e)
    return null
  }
}
