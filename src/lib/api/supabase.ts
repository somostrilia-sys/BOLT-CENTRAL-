import { createClient } from '@supabase/supabase-js'

// Supabase principal do grupo WALK
const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://ecaduzwautlpzpvjognr.supabase.co'
// Server-side: usa service key para bypass RLS; client-side: anon key
const SUPABASE_KEY =
  process.env.SUPABASE_SERVICE_KEY ||
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
  ''

export const supabase = createClient(SUPABASE_URL, SUPABASE_KEY)

// IDs das empresas
export const COMPANY_IDS = {
  walkHolding: 'd33b6a84-8f72-4441-b2eb-dd151a31ac12',
  trilia: '131d9cba-b8c6-4f2d-9c4c-5e3aef2a1234',
  digitalLux: 'f96c0059-1234-5678-abcd-ef0123456789',
  objetivo: '70967469-1234-5678-abcd-ef0123456789',
}

export async function getConsolidadoGrupo(mes?: string) {
  const mesAtual = mes || new Date().toISOString().slice(0, 7)
  const inicio = `${mesAtual}-01`
  const fim = `${mesAtual}-31`

  try {
    // Buscar métricas de ligações LuxSales
    const { count: totalLigacoes } = await supabase
      .from('call_logs')
      .select('id', { count: 'exact', head: true })
      .gte('created_at', inicio)
      .lte('created_at', fim)

    const { count: ligacoesSucesso } = await supabase
      .from('call_logs')
      .select('id', { count: 'exact', head: true })
      .eq('goal_achieved', true)
      .gte('created_at', inicio)
      .lte('created_at', fim)

    // Buscar conversas WhatsApp ativas
    const { count: conversasAtivas } = await supabase
      .from('wa_conversations')
      .select('id', { count: 'exact', head: true })
      .eq('status', 'active')

    // Buscar total de leads
    const { count: totalLeads } = await supabase
      .from('leads_master')
      .select('id', { count: 'exact', head: true })

    // Buscar colaboradores ativos
    const { count: colaboradores } = await supabase
      .from('collaborators')
      .select('id', { count: 'exact', head: true })
      .eq('active', true)

    // Buscar templates aprovados
    const { count: templatesAtivos } = await supabase
      .from('whatsapp_meta_templates')
      .select('id', { count: 'exact', head: true })
      .eq('status', 'APPROVED')

    // Buscar negociações fechadas
    const negResult = await supabase
      .from('negociacoes')
      .select('id', { count: 'exact', head: true })
      .eq('stage', 'concluido')
      .gte('created_at', inicio)
      .lte('created_at', fim)

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
    // Checar conversas com janela Meta expirando em < 2h
    const em2h = new Date(Date.now() + 2 * 60 * 60 * 1000).toISOString()
    const { data: expirando } = await supabase
      .from('wa_conversations')
      .select('id,phone,lead_name')
      .eq('status', 'active')
      .lt('window_expires_at', em2h)
      .not('window_expires_at', 'is', null)
      .limit(5)

    if (expirando?.length) {
      alertas.push({
        id: 'wa-exp',
        severity: 'warning',
        title: `${expirando.length} conversas WA expirando em < 2h`,
        empresa: 'LuxSales',
      })
    }

    // Checar templates reprovados
    const { data: templates } = await supabase
      .from('whatsapp_meta_templates')
      .select('id,name')
      .eq('status', 'REJECTED')
      .limit(3)

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
