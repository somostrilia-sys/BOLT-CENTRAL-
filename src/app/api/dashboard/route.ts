import { NextResponse } from 'next/server'
import { getConsolidadoGrupo, getAlertasAtivos } from '@/lib/api/supabase'

export const dynamic = 'force-dynamic'

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  const mes = searchParams.get('mes') || undefined

  const [consolidado, alertas] = await Promise.all([
    getConsolidadoGrupo(mes),
    getAlertasAtivos(),
  ])

  return NextResponse.json({
    consolidado,
    alertas,
    timestamp: new Date().toISOString(),
  })
}
