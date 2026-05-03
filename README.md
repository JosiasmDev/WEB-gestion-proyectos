# SmartTimeManager · Project Board

## ¿Qué es esto?

Tablero web colaborativo para gestionar el desarrollo de **SmartTimeManager**, una app móvil de organización personal con IA. Permite asignar tareas, configurar plazos y ver el progreso del equipo en tiempo real.

## Equipo

| Nombre | Telegram | Rol |
|--------|----------|-----|
| Bamba | — | Dev |
| Ruben | @RubenCampal | Dev |
| Oscar | — | Dev |
| Josias | @Josias_nin | Dev |

## Stack Tecnológico del Proyecto

| Capa | Tecnología |
|------|-----------|
| Móvil | React Native |
| Base de datos | Firebase Firestore |
| Auth | Firebase Auth |
| Backend | Node.js + Cloud Functions |
| IA | Algoritmos ligeros (no ML pesado) |
| Notificaciones | Notifee |

## Cómo usar el tablero

1. **Abre** `index.html` en tu navegador
2. **Selecciona el proyecto** en el menú lateral
3. **Haz click en una tarea** para ver sus instrucciones detalladas
4. **Asígnate** la tarea, pon un plazo y guarda
5. Tus compañeros verán los cambios **en tiempo real** (si Firebase está configurado)

## Configurar Firebase (sincronización en tiempo real)

> Sin Firebase, los cambios solo se guardan en tu navegador y nadie más los ve.

1. Ve a [console.firebase.google.com](https://console.firebase.google.com)
2. Crea un proyecto (gratis)
3. Ve a **Realtime Database** → Crear base de datos → Modo de prueba
4. Ve a **Configuración del proyecto** → Tus apps → Añade una app web
5. Copia el objeto `firebaseConfig`
6. En el tablero, haz click en **⚙️ Ajustes** y pega la configuración

## Configurar Notificaciones de Telegram

1. Habla con [@BotFather](https://t.me/BotFather) en Telegram
2. Escribe `/newbot` y sigue los pasos → obtendrás un **Bot Token**
3. Añade el bot a vuestro grupo de equipo
4. Obtén el **Chat ID** del grupo (busca cómo con `getUpdates`)
5. En el tablero, ve a **⚙️ Ajustes** → sección Telegram

## Estructura de Carpetas del Proyecto (React Native)

```
OrganizadorApp/
├── src/
│   ├── components/        ← Componentes reutilizables (botones, inputs...)
│   │   └── UI/
│   ├── screens/           ← Pantallas completas de la app
│   │   ├── Auth/          ← Login, Registro
│   │   └── Main/          ← Home, Crear tarea, Perfil, Stats
│   ├── navigation/        ← Configuración de rutas
│   ├── services/          ← Firebase, API calls
│   │   ├── firebaseConfig.ts
│   │   ├── authService.ts
│   │   └── taskService.ts
│   ├── store/             ← Estado global (Zustand o Context)
│   ├── hooks/             ← Custom hooks reutilizables
│   ├── utils/             ← Funciones auxiliares
│   └── models/            ← Tipos TypeScript (ITask, IUser...)
├── docs/                  ← Documentación técnica
│   ├── schema.md          ← Estructura de Firestore
│   └── security-rules.txt ← Reglas de seguridad
└── README.md
```

## Convenciones del Equipo

- **Commits**: usar prefijos → `feat:`, `fix:`, `docs:`, `refactor:`
- **Ramas**: `main` (producción), `dev` (desarrollo), `feature/nombre-tarea`
- **Código**: TypeScript estricto. Sin `any`. Nombres en inglés.
- **Tareas**: Máximo 5 por persona por bloque
- **Comunicación**: Canal de Telegram para avisar cuando se completa una tarea

## Reglas de Firestore (Seguridad)

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /users/{userId}/{document=**} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
  }
}
```

## Comandos Útiles

```bash
# Instalar dependencias
npm install

# Ejecutar en Android
npx react-native run-android

# Ejecutar en iOS
npx react-native run-ios

# Ejecutar tests
npm test

# Linter
npx eslint src/ --fix
```

## Progreso del Proyecto

- **Bloque 1** — Fundamentos & CRUD (Tareas 1–20)
- **Bloque 2** — IA, Notificaciones & Lanzamiento (Tareas 21–40)

Cada miembro del equipo debe asumir **5 tareas por bloque** (10 en total).
