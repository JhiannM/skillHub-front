# Arquitectura del Proyecto SkillHub

Este documento describe la estructura de directorios y la arquitectura de la aplicación Next.js para el proyecto SkillHub, basándose en la convención de `App Router`.

## Estructura de Directorios

El proyecto adopta un directorio `src/` para contener el código fuente principal de la aplicación, separando la lógica, los componentes y la configuración de los recursos estáticos.

```text
skillhub-nextjs/
├── src/
│   ├── app/               # Rutas, Layouts y Server Components
│   │   ├── (auth)/        # Grupo de rutas: login, registro
│   │   ├── (dashboard)/   # Rutas protegidas (Prestador/Admin)
│   │   ├── search/        # Página de búsqueda y filtros
│   │   ├── services/      # Detalle y gestión de servicios
│   │   ├── layout.tsx     # Layout raíz (Navbar/Footer global)
│   │   └── page.tsx       # Landing page (Home)
│   ├── components/        # UI Components (Client & Server)
│   │   ├── ui/            # Componentes atómicos (Botones, Inputs, Badges)
│   │   ├── shared/        # Navbar, Footer, Skeletons
│   │   └── modules/       # Componentes específicos por dominio
│   ├── lib/               # Utilidades de servidor e integraciones
│   │   ├── api.ts         # Cliente de fetch para el Backend Node.js
│   │   └── utils.ts       # Funciones auxiliares (Tailwind Merge, etc.)
│   ├── hooks/             # Client-side hooks personalizados
│   ├── types/             # Definiciones de TypeScript (Interfaces de SkillHub)
│   └── store/             # Gestión de estado (Zustand o Context API)
├── public/                # Solo Logos y Assets vectoriales (Sin fotos V1)
├── tailwind.config.ts     # Configuración del Design System
└── next.config.ts         # Configuración de Next.js
```

## Descripción de Módulos

### `src/app/`

Utiliza el App Router de Next.js para definir las rutas de la aplicación:

- **`(auth)/`**: Grupo de rutas lógicas sin impacto en la estructura de la URL para centralizar páginas de autenticación como inicio de sesión y registro.
- **`(dashboard)/`**: Grupo de rutas para vistas y lógicas protegidas destinadas a los usuarios autenticados (Prestadores de servicios o Administradores).
- **`search/`**: Página que contiene la funcionalidad de búsqueda principal y el filtrado de habilidades o servicios.
- **`services/`**: Sección de la aplicación dedicada a mostrar en detalle y gestionar los servicios ofrecidos en la plataforma SkillHub.
- **`layout.tsx`**: Contiene la estructura global o _Shell_ de la aplicación (como la barra de navegación principal y el pie de página común a todo el sitio).
- **`page.tsx`**: Página de inicio pública o Landing page de la plataforma.

### `src/components/`

Organización de componentes de interfaz de usuario con un enfoque de diseño atómico y modular:

- **`ui/`**: Componentes base, agnósticos y reutilizables (botones, campos de entrada de texto, insignias, modales, etc.), típicamente creados con utilidades CSS (ej. Tailwind) o bibliotecas como Radix UI / shadcn.
- **`shared/`**: Componentes compuestos reutilizables a lo largo de múltiples páginas de la aplicación (ej. menús de navegación compartidos, barras laterales, tarjetas de servicio generales, skeletons de carga).
- **`modules/`**: Componentes más complejos acoplados fuertemente a un dominio específico o lógica de negocio (ej. un formulario de reserva de servicio, panel de estadísticas de usuario).

### `src/lib/`

Utilidades, helpers y configuraciones que manejan la lógica subyacente que no son componentes visuales:

- **`api.ts`**: Cliente preconfigurado para realizar peticiones HTTP (fetch o axios) contra el backend en Node.js, manejando cabeceras, interceptores y tokens de autenticación de forma centralizada.
- **`utils.ts`**: Funciones de utilidad pura y auxiliares, como formateadores de fechas, y por ejemplo herramientas para fusionar clases de Tailwind CSS de manera segura (`clsx`, `twMerge`).

### `src/hooks/`

Directorio destinado a los custom hooks de React. Generalmente usados en componentes del lado del cliente (`"use client"`) para encapsular lógica de estado de UI, orquestar peticiones, o manejar APIs del navegador.

### `src/types/`

Definición centralizada de interfaces, enumeradores y tipos de TypeScript para asegurar la consistencia y el tipado estático en los modelos de datos a través de toda la aplicación (modelos de usuario, servicios, reseñas, etc.).

### `src/store/`

Gestión del estado global persistente de la aplicación. Suele implementarse mediante la Context API nativa de React, o librerías optimizadas para el estado global del cliente como Zustand, Jotai o Redux, para manejar datos como la sesión activa del usuario, configuraciones visuales o procesos de múltiples pasos.

### Archivos y Directorios de Raíz

- **`public/`**: Almacenamiento de recursos estáticos que el servidor web entrega directamente, como el archivo favicon, imágenes e iconos. Para la V1, se prioriza el uso de assets vectoriales y logos ligeros.
- **`tailwind.config.ts`**: Archivo de configuración central de Tailwind CSS donde se define el sistema de diseño del proyecto (colores de marca, tipografías personalizadas, breakpoints).
- **`next.config.ts`**: Archivo de configuración fundamental para definir el comportamiento de Next.js, redirecciones, dominios de imágenes externas y configuraciones avanzadas de Webpack.
