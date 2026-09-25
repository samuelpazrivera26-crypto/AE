# ARIDA ERIUS — "Nacidos en el Ruido"

Plataforma de moda streetwear conceptual construida en **Next.js 14 (App Router) +
TypeScript + Tailwind CSS + Framer Motion + React Three Fiber**, con dos vistas
conectadas que comparten un mismo catálogo en tiempo real:

- **`/` — Portal cinematográfico público**: intro con campo de estrellas 3D,
  tipografía monumental, galería de prendas flotantes en gravedad cero (sin
  cuadrícula clásica), visor de detalle tipo holográfico, carrito y checkout
  vía WhatsApp Concierge.
- **`/admin` — Backoffice del creador**: CRUD de inventario (nombre, imagen,
  descripción, tallas, stock, precio, estado de lanzamiento), con
  sincronización instantánea hacia la vitrina pública.

## Cómo funciona la sincronización en tiempo real

No hay backend externo: **ambas vistas son la misma app Next.js** y comparten
datos a través de `localStorage` (ver `src/lib/store.ts`), exactamente como
pedía el brief original ("base de datos ligera tipo LocalStorage para
sincronización entre admin y tienda"). Cuando guardas o cambias el estado de
una prenda en `/admin`:

1. Se escribe en `localStorage`.
2. Se emite un evento nativo `storage` (sincroniza otras pestañas/ventanas).
3. Se emite un mensaje por `BroadcastChannel` (sincroniza la misma pestaña,
   por ejemplo si tienes `/` y `/admin` abiertos en dos paneles del mismo
   navegador).

La vitrina pública se suscribe a ambos canales (`src/lib/useProducts.ts`) y
se re-renderiza automáticamente — sin recargar la página.

> Si en el futuro quieres un backend real multi-dispositivo (Supabase,
> Postgres, etc.), solo hay que reescribir las funciones de
> `src/lib/store.ts` (`getProducts`, `saveProduct`, `deleteProduct`,
> `subscribe`); el resto de la app no cambia.

## Estructura del proyecto

```
ariaderius-nextjs/
├── public/assets/            # Imágenes de catálogo y branding (PNG flotantes, logo, favicon)
├── src/
│   ├── app/
│   │   ├── layout.tsx        # Fuentes (Syne + Plus Jakarta Sans), grano analógico global
│   │   ├── globals.css       # Paleta de color, overlay de ruido, utilidades
│   │   ├── page.tsx          # Portal público (Hero + Galería + Carrito)
│   │   └── admin/page.tsx    # Backoffice (formulario + tabla de inventario)
│   ├── components/
│   │   ├── site/             # Header, Hero, Starfield (R3F), ProductGallery,
│   │   │                       ProductCard, ProductViewer, CartDrawer
│   │   └── admin/             # ProductForm, ProductTable
│   └── lib/
│       ├── types.ts          # Product, Currency, CartLine
│       ├── seed.ts           # Catálogo inicial (migrado del sitio original)
│       ├── store.ts          # "Base de datos" en localStorage + pub/sub
│       ├── useProducts.ts    # Hook de React sobre el store
│       ├── currency.ts       # Conversión EUR / USD / COP
│       └── whatsapp.ts       # Construcción del mensaje de checkout
├── package.json
├── tailwind.config.ts
└── tsconfig.json
```

## Cómo ejecutar el proyecto en local

Requisitos: **Node.js 18.18 o superior**.

```bash
# 1. Instalar dependencias
npm install

# 2. Levantar el servidor de desarrollo
npm run dev

# 3. Abrir en el navegador
# Tienda pública:      http://localhost:3000
# Panel de admin:      http://localhost:3000/admin
```

Prueba la sincronización abriendo ambas rutas en dos pestañas del mismo
navegador: cambia el estado o el stock de una prenda en `/admin` y verás el
cambio reflejarse al instante en `/`.

## Notas y siguientes pasos

- El número de WhatsApp del Concierge es un placeholder en
  `src/lib/whatsapp.ts` (`CONCIERGE_NUMBER`) — reemplázalo por el número real
  antes de publicar.
- Las imágenes de catálogo migradas están en `public/assets/`. Para subir una
  prenda nueva desde `/admin`, coloca el archivo en esa carpeta y referencia
  la ruta (ej. `/assets/nueva_prenda.png`) en el campo "Ruta o URL de la
  imagen" del formulario — no hay subida binaria de archivos en esta versión
  ligera, ya que no hay servidor de almacenamiento configurado.
- El campo de estrellas del Hero usa React Three Fiber de forma deliberadamente
  ligera (sin postprocesado) para mantener el sitio rápido; el resto del efecto
  cinematográfico lo aportan la tipografía, el grano analógico y el paralaje
  de Framer Motion en cada prenda.
