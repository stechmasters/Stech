# 📦 Guía de migración a WordPress

> Archivo: **`/app/tech-masters-wordpress.html`** (32 KB, completamente autocontenido)

---

## ✅ Estado actual del archivo

- ✅ Página 100% en español (mismo diseño que la versión React)
- ✅ Sección Ultra Pay con QRs de Zelle, Venmo y Cash App
- ✅ Botones de contacto funcionando: Llamar, SMS, WhatsApp, Email
- ✅ Sección "Reseñas verificadas de Google" con placeholder Elfsight
- ✅ Botón "Déjanos una reseña en Google" → https://g.page/r/Cf38h7Od99BsEBM/review
- ✅ URLs reales de redes sociales (Facebook, Instagram, TikTok, YouTube)
- ✅ Email correcto: stechmasters@gmail.com
- ✅ Tailwind CSS por CDN (no requiere build)
- ✅ Botón flotante de WhatsApp
- ✅ Smooth scroll y animaciones JavaScript embebidas

---

## 🚀 Opción 1: WordPress con Hosting tradicional (FÁCIL - Recomendado)

### A. Usando "Custom HTML" block / Página estática

1. **Descarga el archivo:**
   - Pídelo en la conversación o cópialo desde `/app/tech-masters-wordpress.html`

2. **Sube al hosting via cPanel / FTP:**
   - Renómbralo a `index.html`
   - Súbelo a `public_html/` (raíz de tu dominio) o a una carpeta tipo `public_html/landing/`
   - Si lo subes a la raíz, debes desactivar WordPress o moverlo a `/wp/`

3. **Activación:**
   - Si subiste a raíz: visita tu dominio directamente → se mostrará la landing
   - Si subiste a `/landing/`: visita `tudominio.com/landing/`

### B. Usando plugin de WordPress (más control)

1. Instala el plugin **"Insert Headers and Footers"** o **"WPCode"**
2. Crea una nueva página en WordPress: `Pages → Add New`
3. Cambia el editor a **HTML Code Editor** (botón en la esquina superior derecha)
4. Pega TODO el contenido del archivo (desde `<!DOCTYPE html>` hasta `</html>`)
5. **Atención**: WordPress puede strip-ear el `<head>`. Si pasa eso, usa el siguiente método:

### C. Convirtiendo a tema/plantilla WordPress (avanzado)

1. Crea un archivo `page-landing.php` en tu tema activo
2. Pega el HTML del archivo
3. En WordPress crea una página y asigna la plantilla `Landing`

---

## 🚀 Opción 2: Servir como archivo estático junto a WordPress

Si solo quieres usar este HTML como **página de aterrizaje principal** y mantener WordPress aparte:

1. Sube el archivo como `landing.html` a la raíz del hosting
2. Configura un **redirect** desde tu dominio principal a `tudominio.com/landing.html`
3. WordPress queda en `tudominio.com/blog/` o `tudominio.com/wp/`

Para el redirect, edita el `.htaccess`:
```apache
RewriteEngine On
RewriteRule ^$ /landing.html [L]
```

---

## 🚀 Opción 3: GitHub Pages / Netlify / Vercel (GRATIS, súper rápido)

Si no necesitas WordPress en absoluto:

### Netlify (más fácil):
1. Crea cuenta en https://netlify.com
2. Arrastra el archivo `tech-masters-wordpress.html` al área de deploy (renómbralo a `index.html`)
3. ✅ Listo. Te dará una URL gratis: `tu-app.netlify.app`
4. Para usar tu dominio: `Domain settings → Add custom domain`

### Vercel:
1. https://vercel.com → New Project → Upload
2. Mismo flujo que Netlify

### GitHub Pages:
1. Crea repo público en GitHub
2. Sube `index.html` (renombrado)
3. Settings → Pages → Source: `main branch`

---

## ⚠️ Pendientes antes de hacer live

1. **Elfsight Widget ID** (para reseñas de Google reales):
   - Crea cuenta gratis en https://elfsight.com
   - Crea widget "Google Reviews" → conecta tu negocio
   - Reemplaza `elfsight-app-PLACEHOLDER` con el ID real en el archivo HTML
   - Si no lo configuras, el placeholder mostrará "Cargando reseñas de Google..."

2. **Verifica los QR de pago**: Las imágenes apuntan a URLs en `customer-assets.emergentagent.com`. Si vas a WordPress y esas URLs caen en el futuro:
   - Descarga las 3 imágenes localmente
   - Súbelas a tu WordPress Media Library
   - Reemplaza las URLs en el HTML

3. **SEO / Open Graph** (opcional):
   - Considera agregar etiquetas `<meta property="og:image">` para compartir en redes
   - Agregar `<link rel="canonical">` apuntando a tu dominio final

---

## 📎 Resumen de archivo
- Ubicación: `/app/tech-masters-wordpress.html`
- Tamaño: ~32 KB (super liviano)
- Dependencias externas: Tailwind CDN + Elfsight CDN (solo para reseñas)
- Sin backend requerido (es 100% estático)

Cualquier duda dime y te ayudo paso a paso 🚀
