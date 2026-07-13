# Éxito Real — Diario (MVP)

App web (PWA) de journaling y hábitos, conectada a Supabase. Funciona en el navegador
y se puede "instalar" en el celular sin pasar por App Store / Play Store — ideal para
validar con tu audiencia actual antes de invertir en una app nativa.

## Qué incluye este MVP

- Login sin contraseña (enlace mágico por email)
- Escribir y guardar la reflexión del día
- Racha calculada a partir de tus entradas reales (no simulada)
- Progreso: racha actual, racha más larga, total de entradas
- Recursos: catálogo editable desde Supabase, con link de pago a Gumroad/Hotmart
- Diseño oscuro tipo Notion con acentos por color y efecto vidrio, ya integrado

## 1. Crear el proyecto en Supabase

1. Ve a [supabase.com](https://supabase.com) → crea un proyecto nuevo (plan gratuito alcanza para empezar).
2. En **SQL Editor**, pega y ejecuta el contenido de `supabase/schema.sql`. Esto crea las tablas
   `entries` y `resources`, con seguridad por fila (cada usuario solo ve sus propias reflexiones).
3. En **Authentication → Providers**, confirma que **Email** esté habilitado (viene activo por defecto).
4. En **Authentication → URL Configuration**, agrega la URL donde correrá tu app
   (para desarrollo local: `http://localhost:5173`; luego agrega tu dominio real cuando despliegues).
5. En **Project Settings → API**, copia `Project URL` y `anon public key`.

## 2. Configurar el proyecto localmente

```bash
npm install
cp .env.example .env
```

Abre `.env` y pega tus valores de Supabase:

```
VITE_SUPABASE_URL=https://tuproyecto.supabase.co
VITE_SUPABASE_ANON_KEY=tu-anon-key-publica
VITE_PLUS_CHECKOUT_URL=https://gumroad.com/l/tu-membresia
```

## 3. Correr en desarrollo

```bash
npm run dev
```

Abre la URL que te muestra la terminal (normalmente `http://localhost:5173`).

## 4. Editar tu catálogo de recursos

En Supabase → **Table Editor → resources**, agrega/edita filas directamente ahí.
No necesitas tocar código ni redesplegar para actualizar tus productos:

- `title`: nombre del recurso
- `type`: ej. "Plantilla · Notion", "PDF", "Audio · 12 min"
- `is_free`: `true` para los recursos gratuitos (lead magnets)
- `checkout_url`: tu link de Gumroad o Hotmart para los recursos pagos
- `sort_order`: orden en que aparecen (número más bajo = primero)

## 5. Desplegar (para que tu audiencia lo use)

La forma más simple es **Vercel**:

```bash
npm run build
```

1. Sube este proyecto a un repositorio de GitHub.
2. En [vercel.com](https://vercel.com), importa el repo.
3. Agrega las mismas variables de entorno del `.env` en la configuración del proyecto en Vercel.
4. Despliega. Vercel te da una URL pública (puedes conectar tu propio dominio después).
5. No olvides volver a Supabase → Authentication → URL Configuration y agregar la URL de Vercel.

## 6. Qué medir antes de pasar a app nativa

- % de tus seguidores que se registran (compáralo con clics a la landing, si hiciste Fase 0)
- % que vuelve al día 3 y al día 7 (retención — la métrica que más importa)
- Cuántos usuarios hacen clic en "Ver planes" / los recursos pagos

## Siguiente fase (si esto valida)

- Empacar con **Expo (React Native)** reutilizando esta misma lógica de datos (los hooks
  `useAuth`, `useEntries`, `useResources` se trasladan casi sin cambios)
- **RevenueCat + Stripe** para suscripciones dentro de la app, en vez de redirigir a Gumroad/Hotmart
- Notificaciones push para recordar la reflexión diaria
