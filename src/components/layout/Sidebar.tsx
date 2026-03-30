'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion } from 'framer-motion'
import {
  LayoutDashboard, Shield, Truck, Radio, GraduationCap,
  Megaphone, Cpu, Wrench, Calculator, Settings, ChevronLeft, Zap,
} from 'lucide-react'
import { EMPRESAS } from '@/lib/constants/empresas'

const ICONS: Record<string, any> = {
  Shield, Truck, Radio, GraduationCap, Megaphone, Cpu, Wrench, Calculator,
}

export default function Sidebar() {
  const [collapsed, setCollapsed] = useState(false)
  const pathname = usePathname()

  return (
    <motion.aside
      animate={{ width: collapsed ? 64 : 260 }}
      transition={{ duration: 0.3 }}
      className="h-screen bg-[#09090b] border-r border-[#27272a] flex flex-col overflow-hidden shrink-0"
    >
      {/* BOLT link */}
      <Link
        href="/"
        className="flex items-center gap-2 px-4 h-14 bg-cyan-950/40 hover:bg-cyan-950/60 transition-colors border-b border-[#27272a]"
      >
        <Zap size={20} className="text-bolt-glow shrink-0" />
        {!collapsed && (
          <span className="text-bolt-glow font-bold tracking-wider text-sm">BOLT</span>
        )}
      </Link>

      {/* Overview */}
      <nav className="flex-1 py-2 space-y-0.5 overflow-y-auto">
        <SidebarItem
          href="/dashboard/overview"
          icon={<LayoutDashboard size={18} />}
          label="Visão Geral"
          color="#a1a1aa"
          active={pathname === '/dashboard/overview'}
          collapsed={collapsed}
        />

        <div className={`px-4 pt-4 pb-1 ${collapsed ? 'hidden' : ''}`}>
          <span className="text-[10px] text-white/20 uppercase tracking-[2px]">Empresas</span>
        </div>

        {EMPRESAS.map((e) => {
          const Icon = ICONS[e.icone]
          return (
            <SidebarItem
              key={e.id}
              href={`/dashboard/${e.id}`}
              icon={Icon ? <Icon size={18} /> : null}
              label={e.nome}
              color={e.cor}
              active={pathname === `/dashboard/${e.id}`}
              collapsed={collapsed}
            />
          )
        })}

        <div className={`px-4 pt-4 pb-1 ${collapsed ? 'hidden' : ''}`}>
          <span className="text-[10px] text-white/20 uppercase tracking-[2px]">Sistema</span>
        </div>
        <SidebarItem
          href="/dashboard/overview"
          icon={<Settings size={18} />}
          label="Configurações"
          color="#a1a1aa"
          active={false}
          collapsed={collapsed}
        />
      </nav>

      {/* Collapse toggle */}
      <button
        onClick={() => setCollapsed(!collapsed)}
        className="flex items-center justify-center h-10 border-t border-[#27272a] text-white/30 hover:text-white/60 transition-colors"
      >
        <motion.div animate={{ rotate: collapsed ? 180 : 0 }}>
          <ChevronLeft size={16} />
        </motion.div>
      </button>
    </motion.aside>
  )
}

function SidebarItem({
  href, icon, label, color, active, collapsed,
}: {
  href: string; icon: React.ReactNode; label: string; color: string; active: boolean; collapsed: boolean
}) {
  return (
    <Link
      href={href}
      className={`flex items-center gap-3 mx-2 px-3 py-2 rounded-lg text-sm transition-colors ${
        active
          ? 'bg-white/[0.06] text-white'
          : 'text-white/50 hover:text-white/80 hover:bg-white/[0.03]'
      }`}
      style={active ? { borderLeft: `2px solid ${color}` } : {}}
    >
      <span style={{ color: active ? color : undefined }} className="shrink-0">
        {icon}
      </span>
      {!collapsed && <span className="truncate">{label}</span>}
    </Link>
  )
}
