'use client'

import { usePathname } from 'next/navigation'
import { Zap, User } from 'lucide-react'
import Link from 'next/link'
import { EMPRESAS } from '@/lib/constants/empresas'

const PERIODS = ['Hoje', '7d', '30d', '90d', 'Ano']

export default function Header() {
  const pathname = usePathname()

  const crumbs = pathname.split('/').filter(Boolean)
  const current = crumbs[crumbs.length - 1]
  const empresa = EMPRESAS.find(e => e.id === current)

  return (
    <header className="sticky top-0 z-20 h-14 bg-[#09090b]/80 backdrop-blur border-b border-[#27272a] flex items-center justify-between px-6">
      <div className="flex items-center gap-2 text-sm">
        <Link href="/dashboard/overview" className="text-white/40 hover:text-white/60">
          Dashboard
        </Link>
        <span className="text-white/20">/</span>
        <span className="text-white" style={{ color: empresa?.cor }}>
          {empresa?.nome || (current === 'overview' ? 'Visão Geral' : current)}
        </span>
      </div>

      <div className="flex items-center gap-4">
        <div className="flex gap-1 bg-white/[0.04] rounded-lg p-0.5">
          {PERIODS.map(p => (
            <button
              key={p}
              className="px-3 py-1 text-xs rounded-md text-white/50 hover:text-white hover:bg-white/[0.08] transition-colors"
            >
              {p}
            </button>
          ))}
        </div>

        <Link
          href="/"
          className="w-8 h-8 rounded-lg bg-bolt-primary/20 border border-bolt-primary/30 flex items-center justify-center hover:bg-bolt-primary/30 transition-colors"
        >
          <Zap size={14} className="text-bolt-glow" />
        </Link>

        <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center">
          <User size={14} className="text-white/50" />
        </div>
      </div>
    </header>
  )
}
