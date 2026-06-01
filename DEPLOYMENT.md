# Despliegue Frontend - SkillHub

## Plataforma sugerida

Vercel con Node.js 20.

## Variables de entorno

Configura esta variable en Vercel y en los secretos de GitHub Actions:

```env
NEXT_PUBLIC_API_URL=https://tu-backend.onrender.com/api
```

## Vercel

1. Importa el repositorio `https://github.com/JhiannM/skillHub-front`.
2. Framework preset: Next.js.
3. Build command: `npm run build`.
4. Output: automatico de Vercel.
5. Agrega `NEXT_PUBLIC_API_URL` apuntando al backend desplegado.

## GitHub Actions

El workflow `.github/workflows/deploy.yml` valida lint/build y despliega con Vercel CLI cuando hay cambios en `main`.

Secretos requeridos en GitHub:

```env
NEXT_PUBLIC_API_URL=https://tu-backend.onrender.com/api
VERCEL_TOKEN=token_de_vercel
VERCEL_ORG_ID=id_de_tu_equipo_o_usuario
VERCEL_PROJECT_ID=id_del_proyecto
```
