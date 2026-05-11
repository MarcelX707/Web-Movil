# Plataforma Municipal - Municipalidad de Santo Domingo

**Ingeniería Web y Móvil — ICI 4247 | Entrega Parcial 1**

## Descripción

Plataforma web y móvil para la gestión de trámites municipales de la Municipalidad de Santo Domingo. Desarrollada con Ionic + React (frontend) y Node.js/Express (backend), permite a ciudadanos y funcionarios gestionar documentos, seguir el estado de trámites y generar reportes.

---

## Integrantes del Grupo

Benjamin Leiva,
Marcel Gutierrez,
Martin Basulto

---

## Estructura del Proyecto

```
src/
├── pages/
│   ├── auth/
│   │   ├── LoginPage.tsx          # Login con Gmail, Clave Única y email/password
│   │   └── RegisterPage.tsx       # Registro con validación de RUT y campos completos
│   ├── dashboard/
│   │   ├── DashboardPage.tsx      # Dashboard principal del usuario
│   │   └── AdminDashboardPage.tsx # Panel exclusivo para administradores
│   ├── profile/
│   │   └── ProfilePage.tsx        # Gestión de perfil de usuario
│   ├── search/
│   │   └── SearchPage.tsx         # Búsqueda y filtrado de trámites
│   ├── reports/
│   │   └── ReportsPage.tsx        # Generación y exportación de reportes
│   ├── roadmap/
│   │   └── RoadmapPage.tsx        # Hoja de ruta dinámica de trámites
│   └── documents/
│       └── DocumentsPage.tsx      # Repositorio documental
├── components/
│   └── layout/
│       └── AppLayout.tsx          # Layout con menú lateral (web) y adaptativo (móvil)
├── routes/
│   ├── AppRoutes.tsx              # Definición central de todas las rutas
│   ├── PrivateRoute.tsx           # HOC para rutas protegidas con control de roles
│   └── PublicRoute.tsx            # HOC para rutas públicas (redirige si hay sesión)
├── services/
│   └── auth.service.ts            # Servicio de autenticación JWT + OAuth
├── hooks/
│   └── useAuth.ts                 # Hook personalizado de estado de autenticación
├── types/
│   └── index.ts                   # Tipos TypeScript globales
└── theme/
    ├── variables.css              # Variables CSS del tema municipal
    └── global.css                 # Estilos globales de la aplicación
```

---

## EP 1.5 — Proyecto Ionic + React

### Requisitos

- Node.js v18+
- npm v9+
- Ionic CLI: `npm install -g @ionic/cli`

### Instalación

```bash
# 1. Clonar el repositorio
git clone https://github.com/[usuario]/municipalidad-santo-domingo.git
cd municipalidad-santo-domingo

# 2. Instalar dependencias
npm install

# 3. Configurar variables de entorno
cp .env.example .env
# Editar .env con la URL de tu backend

# 4. Ejecutar en desarrollo
ionic serve
# o
npm start
```

### Variables de entorno

```env
REACT_APP_API_URL=http://localhost:3001/api
```

---

## Arquitectura de Rutas (EP 1.4 → EP 1.5)

### Rutas Públicas (sin autenticación)

| Ruta | Componente | Descripción |
|------|-----------|-------------|
| `/login` | `LoginPage` | Login con email, Gmail o Clave Única. Si hay sesión activa, redirige a `/dashboard` |
| `/register` | `RegisterPage` | Registro de nuevo usuario. Si hay sesión activa, redirige a `/dashboard` |

### Rutas Protegidas (usuario autenticado)

| Ruta | Componente | Descripción |
|------|-----------|-------------|
| `/dashboard` | `DashboardPage` | Panel principal con accesos a módulos |
| `/profile` | `ProfilePage` | Gestión de información personal |
| `/search` | `SearchPage` | Búsqueda y filtrado de trámites |
| `/reports` | `ReportsPage` | Generación y exportación de reportes |
| `/roadmap` | `RoadmapPage` | Visualización de hoja de ruta dinámica |
| `/documents` | `DocumentsPage` | Repositorio y gestión de documentos |

### Rutas Exclusivas (rol Administrador)

| Ruta | Componente | Descripción |
|------|-----------|-------------|
| `/admin/dashboard` | `AdminDashboardPage` | Panel de administración del sistema |

### Flujo de Redirección

```
Usuario no autenticado → accede a /dashboard → redirige a /login
Usuario autenticado → accede a /login → redirige a /dashboard
Usuario rol "user" → accede a /admin/dashboard → redirige a /dashboard
```

---

## Componentes Ionic Utilizados (EP 1.6)

- `IonPage`, `IonHeader`, `IonContent`, `IonFooter`
- `IonToolbar`, `IonTitle`, `IonButtons`, `IonMenuButton`
- `IonMenu`, `IonSplitPane` — menú lateral web
- `IonList`, `IonItem`, `IonLabel`, `IonInput`, `IonSelect`
- `IonCard`, `IonCardHeader`, `IonCardContent`
- `IonButton`, `IonIcon`, `IonFab`, `IonFabButton`
- `IonBadge`, `IonChip`, `IonCheckbox`, `IonSearchbar`
- `IonLoading`, `IonSkeletonText`
- `IonGrid`, `IonRow`, `IonCol`
- `IonRouterOutlet`, `IonReactRouter`
- React Router: `Route`, `Redirect`, `useHistory`, `Link`

---

## Roles de Usuario

| Rol | Acceso |
|-----|--------|
| `user` | Dashboard, Perfil, Búsqueda, Reportes (solo lectura), Hoja de Ruta, Documentos |
| `admin` | Todo lo anterior + Panel de Administración, gestión de usuarios, edición de Hoja de Ruta |

---

## Prototipo Figma

[Ver mockups en Figma](https://www.figma.com/design/GfTLy3QQAldIBUA4MP4xnK/Web-Movil--Mockups--prototipo-)

---

## Tecnologías

- **Frontend:** Ionic 7, React 18, TypeScript, React Router 5
- **HTTP Client:** Axios con interceptores JWT
- **Autenticación:** JWT + Google OAuth + Clave Única
- **Backend (EP 2):** Node.js + Express / Flask
- **Base de datos (EP 2):** PostgreSQL


