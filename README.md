# Auth Project con Clerk

Este repositorio sirve como guía y referencia para la implementación de autenticación de usuarios, protección de rutas y gestión de roles (Admin) utilizando **Clerk** en una aplicación **Next.js 15+ (App Router)**.

## 🚀 Características Implementadas

- **Autenticación Completa**: Inicio de sesión (Sign In), Registro (Sign Up) y Gestión de cuenta mediante componentes de Clerk.
- **Protección de Rutas**:
  - **Middleware**: Lógica centralizada para interceptar peticiones y proteger rutas específicas (`/ruta-privada`, `/ruta-admin`).
  - **Renderizado Condicional (UI)**: Ocultar/Mostrar elementos (como enlaces del Navbar) según el estado de autenticación y rol del usuario.
- **Manejo de Roles (RBAC)**:
  - Definición de tipos personalizados (`globals.d.ts`) para extender la sesión de Clerk.
  - Verificación de rol `admin` para restringir el acceso a rutas administrativas.
- **Componentes UI**:
  - `Navbar`: Barra de navegación dinámica.
  - `UnloggedHero`: Vista para usuarios no autenticados.
  - `ButtonSignOut`: Botón de cierre de sesión.

## 🛠️ Instalación y Configuración

### 1. Clonar el repositorio e instalar dependencias

```bash
npm install
```

### 2. Variables de Entorno

Crear un archivo `.env.local` en la raíz del proyecto con las claves de Clerk:

```env
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_...
CLERK_SECRET_KEY=sk_test_...
```

### 3. Ejecutar el servidor de desarrollo

```bash
npm run dev
```

## 📂 Estructura Clave de Archivos

### Configuración Global
- **`app/layout.tsx`**: Envuelve la aplicación con `<ClerkProvider>` para habilitar la autenticación en todo el proyecto.
- **`proxy.ts` (Middleware)**: Contiene la configuración de `clerkMiddleware`. Define qué rutas son públicas, cuáles requieren auth y cuáles requieren rol de admin.
  > **Nota Importante**: Renombrar proxy.ts a middleware.ts y estás usando una version anterior a Nextjs 15. Si estás usando Nextjs 15, puedes usar el archivo proxy.ts que viene por defecto.
- **`types/globals.d.ts`**: Extiende la interfaz `CustomJwtSessionClaims` de Clerk para incluir `metadata.role`, permitiendo tipado seguro en TypeScript.

### Utils
- **`utils/roles.ts`**: Función helper `checkRole` para verificar roles desde el servidor.

### Rutas
- **`app/page.tsx`**: Página principal que verifica `isAuthenticated` para mostrar contenido personalizado o el componente `UnloggedHero`.
- **`app/ruta-privada/page.tsx`**: Ejemplo de ruta accesible solo para usuarios logueados.
- **`app/ruta-admin/page.tsx`**: Ejemplo de ruta protegida exclusivamente para usuarios con rol `admin`.

## 🔒 Cómo Proteger Rutas

### Opción A: Middleware (Recomendado)
En el archivo de middleware se definen "Route Matchers". Por ejemplo:

```typescript
const isAdminRoute = createRouteMatcher(['/ruta-admin(.*)'])

export default clerkMiddleware(async (auth, req) => {
  if (isAdminRoute(req) && (await auth()).sessionClaims?.metadata?.role !== 'admin') {
    // Redirigir si no es admin
    const url = new URL('/', req.url)
    return NextResponse.redirect(url)
  }
})
```

### Opción B: Verificación en Página (Server Components)
```typescript
import { auth } from "@clerk/nextjs/server";

export default async function Page() {
  const { userId } = await auth();
  if (!userId) return <div>Acceso denegado</div>;
  // ...
}
```
