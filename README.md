# to-do-list-mobile 

Esta es una aplicación móvil para gestionar tareas desarrollada con Ionic y Angular, con integración de Firebase Remote Config y compilación nativa para Andriod mediante Capacitor. 

## Tecnologías utilizadas

- **Ionic 8** + **Angular 20**
- **Capacitor** (explicaré por qué esta elección)
- **Firebase** + **Remote Config**
- **Ionic Storage** (almacenamiento local)
- **TypeScript**, **SCSS**

## Funcionalidades

- CRUD completo para la gestión de tareas (crear, actualizar, eliminar). 
- CRUD completo para la gestión de categorías (crear, actualizar, eliminar). 
- Relación entre categoría y tarea. 
- Filtro de tareas por categoría.
- Feature flag vía Firebase Remote Config para activar/desactivar la gestión de categorías.

## Pasos de ejecución

### Requisitos previos
- Node.js 18+
- npm
- Ionic CLI: `npm install -g @ionic/cli`

### Instalación

```bash
git clone https://github.com/Meyer-Usuga/to-do-list-mobile.git
cd to-do-list-mobile
npm install
ionic serve
```

La app estará disponible en `http://localhost:8100`

## Compilación para Android

### Requisitos previos
- Contar con Android Studio instalado
- JDK 17+

### Pasos

```bash
# 1. Build de producción
npm run build

# 2. Agregar la plataforma Android
npx cap add android

# 3. Sincronizar el build con el proyecto
npx cap sync android

# 4. Abrir en Android Studio
npx cap open android
```

En Android Studio:
- Esperar a que Gradle sincronice
- **Build → Build Bundle(s) / APK(s) → Build APK(s)**
- El APK estará en: `android/app/build/outputs/apk/debug/app-debug.apk`

> **Nota:** Este proyecto ha sido realizado con Capacitor. Al utilizar una versión reciente de Ionic, se empleó Capacitor porque ofrece mejor integración con las funcionalidades nativas y viene configurado por defecto.

## Compilación para iOS

> La compilación para iOS requiere **macOS** y **Xcode**. No se incluye IPA en este entregable por limitaciones de entorno (Windows). Los pasos para compilar son:

```bash
npx cap add ios
npx cap sync ios
npx cap open ios
# Luego en Xcode: Product → Archive → Distribute App
```
## Firebase y Remote Config

### Feature Flag: `show_category_managment`

Se implementó un feature flag en **Firebase Remote Config** que controla la visibilidad de la funcionalidad de gestión y filtrado de categorías.

| Valor en Remote Config | Comportamiento en la app |
|------------------------|--------------------------|
| `true` | Se muestra el botón de categorías y el filtro |
| `false` | La funcionalidad de categorías queda oculta |

---

## 📂 Estructura del proyecto

```
src/
├── app/
│   ├── features/
│   │   ├── categories/      # Filtro, formulario y gestión de categorías
│   │   └── tasks/           # Item, lista y formulario de tareas
│   ├── pages/
│   │   └── home/            # Página principal
│   └── shared/              # Servicios, modelos y utilidades
├── environments/            # Configuración de Firebase por entorno
├── global.scss              # Estilos globales
└── theme/                   # Variables de Ionic
```

---

## Decisiones técnicas y desafíos

### Principales desafíos
- Utilizar componentes nativos de Ionic sin sobrecargar la UI con estilos personalizados, para priorizar la simplicidad. 
- Implementar Firebase Remote Config para gestionar funciones de la app con feature flags.
- Mantener las tareas y categorías persistentes usando Ionic Storage, incluso al cerrar la aplicación.
- Ordenar la aplicación de forma que tareas y categorías tengan su propia lógica y sus propios componentes para que sea más fácil mantenerlas.
- Decidir entre Cordova y Capacitor: se optó por Capacitor.

### Optimizaciones de rendimiento
- Utilizar Angular Signals para gestionar el estado de la aplicación de manera sencilla y reactiva.
- Uso de @for con track para optimizar el renderizado de listas.
- Lazy loading para cargar los formularios y los modales sólo cuando se necesiten.
- Separar la lógica de almacenamiento y las operaciones CRUD en servicios.

### Calidad del código
- Organización del proyecto por features, separando las tareas y categorías.
- Uso de standalone components.
- Separación entre servicios que contienen la lógica y los componentes de UI.
- Uso de ViewModels para adaptar los datos antes de presentarlos en la interfaz.
- Centralización de estilos comunes para mantener una apariencia coherente.
