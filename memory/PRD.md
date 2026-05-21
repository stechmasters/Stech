# Tech Masters Solutions — Landing Page

## Original Problem Statement
Landing page conversion-optimizada y responsiva para "Tech Masters Solutions" (electricistas / soporte tecnológico en Connecticut). Página 100% en español, con sección de pagos Ultra Pro (QRs de Zelle/Venmo/Cash App), panel admin autenticado, integración de reseñas de Google, contactos funcionales (WhatsApp/Phone/Email), redes sociales reales y un export HTML standalone para WordPress.

## Implemented (May 2026)
- Página responsiva en español con hero, servicios, beneficios, Ultra Pay y CTA
- Sección Ultra Pay con QRs de Zelle, Venmo y Cash App
- Botones de contacto funcionales (Phone, SMS, WhatsApp, Email)
- URLs reales de redes sociales (Facebook, Instagram, TikTok, YouTube)
- Panel admin protegido en `/admin` (link removido del footer público)
- Standalone HTML `tech-masters-wordpress.html` para migración a WordPress
- **(Feb 2026)** Eliminada sección de reseñas locales (form + listado interno)
- **(Feb 2026)** Nueva sección "Reseñas verificadas de Google" con:
  - Badge con logo de Google y branding propio
  - Placeholder del widget Elfsight (`elfsight-app-PLACEHOLDER`) listo para recibir Widget ID
  - Botón CTA "Déjanos una reseña en Google" → https://g.page/r/Cf38h7Od99BsEBM/review
  - Script de Elfsight (`platform.js`) cargado dinámicamente
- Sincronizado mismo cambio en `tech-masters-wordpress.html`

## Pending User Actions
- **Crear widget en Elfsight** (https://elfsight.com → Google Reviews → free plan):
  1. Sign up gratis
  2. Crear widget "Google Reviews"
  3. Conectar perfil de Google (Place ID o URL)
  4. Copiar el ID del widget (formato `xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx`)
  5. Enviarme el ID y reemplazo `elfsight-app-PLACEHOLDER` por `elfsight-app-{ID}`

## Backlog / Future
- P2: Refactor `Landing.jsx` (~600 líneas) en componentes (Hero, UltraPay, Reviews, Footer)
- P2: Remover endpoints `/api/reviews` del backend (ya no se usan en UI pública)
- P1: Decidir deployment final (Emergent vs WordPress)

## Architecture
- Frontend: React + Tailwind (`/app/frontend/src/pages/Landing.jsx`)
- Backend: FastAPI + MongoDB (`/app/backend/server.py`)
- Auth: JWT cookie-based, admin seeded
- Standalone: `/app/tech-masters-wordpress.html`

## Key Files
- `/app/frontend/src/pages/Landing.jsx` — UI principal
- `/app/backend/server.py` — API
- `/app/tech-masters-wordpress.html` — Export WordPress

## Test Credentials
Ver `/app/memory/test_credentials.md`
