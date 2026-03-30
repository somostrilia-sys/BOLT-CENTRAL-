# Walk Holding Panel - Resumo do Projeto

## Owner
**Maikon Coelho / Trilia** (Org Supabase: somostrilia-sys)

## Deploy
- **URL Producao:** https://walk-holding-panel.vercel.app
- **Vercel Org:** holdingwalk
- **Projeto Local:** /Users/alexanderdonato/Downloads/walk-holding-panel

## Stack
- Next.js 14 + TypeScript
- Tailwind CSS (tema dark cyberpunk)
- Recharts (graficos)
- Vercel (deploy)
- Supabase (backend futuro - projeto walk-central ID: cfzzpzbgsrqdkuaroupx)

## Empresas no Painel (9 dashboards)
1. **Trilho Solucoes** - Protecao veicular (8.450 veiculos, chamados, TMA, reboque)
2. **TrackIt** - Rastreadores GPS (4.200 devices, importacao China, chips M2M)
3. **Trilia** - Consultoria/SDR (leads, calls, contratos, NPS)
4. **Essencia Marketing** - Agencia digital (clientes, ROAS, CPL, conteudos)
5. **Digital Lux** - Tecnologia/Dev (projetos, uptime, deploys, backlog)
6. **Oficina** - Vistorias e reparos (vistorias, pecas, tempo medio)
7. **Walk Contabil** - Contabilidade (certidoes CND semaforo, obrigacoes fiscais)
8. **Objetivo** - Gestao de metas/OKRs
9. **Overview** - Visao consolidada de todas empresas

## Bot BOLT
- Assistente IA integrado (flutuante, tema cyberpunk neon verde)
- Provider: OpenClaw (voice AI)
- API route: /api/bolt/chat

## Supabase Walk Central
- **Project ID:** cfzzpzbgsrqdkuaroupx
- **URL:** https://cfzzpzbgsrqdkuaroupx.supabase.co
- **Tabelas:** connected_systems, system_metrics, managed_agents, agent_activity_log, voice_conversations, daily_summaries, system_alerts, sync_log, bot_config
- **Status:** Schema executado, conexao com Lovable pendente

## Sistema Legado
- **SGA Hinova** - PHP + jQuery + Bootstrap 3 (protecao veicular)
- Endpoint chave: carrega/carregaExtratoTempoReal.php

## Pendencias Futuras
- [ ] Conectar Supabase com dados reais
- [ ] Configurar dominio customizado na Vercel
- [ ] Integrar API OpenClaw (BOLT voice)
- [ ] Sync SGA Hinova via Edge Functions
- [ ] Multi-tenant para franquias
- [ ] Migrar dados historicos SGA para CRMs satelites
