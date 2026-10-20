# Aether Protocol: convenções do projeto

Vale para qualquer editor ou IA. Cole este arquivo no início de uma conversa com a IA.

## Contexto
SaaS de performance (treino + nutrição). Motor: foto do corpo, análise de biotipo, projeção em 3 a 6 meses.
Stack: Next.js (App Router), TypeScript estrito, Tailwind, lucide-react. Interface em pt-BR; código em inglês.

## Camadas (dependências sempre para dentro)
- `domain/`: tipos e regras puras. Sem React, sem I/O.
- `application/`: casos de uso e contratos (ex.: `BodyScanner`). Troque o mock pela API real aqui.
- `infrastructure/` (futuro): Supabase, Stripe, IA.
- `app/`, `components/`: só UI.

## UI
- Dark mode, glassmorphism (`bg-white/5 backdrop-blur-xl border-white/10`), neon ciano só em CTAs e métricas.
- Mobile-first, foco visível, `prefers-reduced-motion` respeitado, estados de loading/erro/vazio.

## IA e imagens
- Comprimir no cliente antes do upload (`lib/image/compress.ts`).
- Estados explícitos e cancelamento. Chamadas reais à IA só no servidor; validar resposta com Zod.

## Segurança e saúde
- Fotos são dados sensíveis (LGPD): storage privado, consentimento, exclusão.
- Projeção é ilustrativa; plano não substitui profissional; confirmar 18+ no onboarding.

## Monetização (futuro)
- `canAccess(user, feature)` único; `<Paywall>`; pagamento atrás de uma interface `PaymentProvider`; checar no servidor.
