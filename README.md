# WebDavid.es

Sitio estático con **Astro** + **Tailwind CSS v4**.

## Desarrollo

```bash
npm install
npm run dev
```

## Producción

```bash
npm run build
```

Sube el contenido de la carpeta `dist/` a tu hosting (GitHub Pages, Netlify, etc.).

## Estructura

- `src/pages/` — Páginas (index, auditoria, legales)
- `src/layouts/BaseLayout.astro` — Layout sin Tailwind CDN
- `src/assets/images/` — Imágenes optimizadas a WebP con `astro:assets`
- `public/` — robots.txt, sitemap.xml, favicon, verificación Google
